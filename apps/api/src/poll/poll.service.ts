import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { randomBytes } from "crypto";
import { PollSession } from "./entities/poll-session.entity";
import { PollAnswer } from "./entities/poll-answer.entity";
import { POLL_QUESTIONS } from "./data/poll-questions.data";
import { SubmitAnswerDto } from "./dto/submit-answer.dto";
import {
    AnswerResponse,
    PollResultPayload,
    QuestionPayload,
} from "./types/poll.types";

@Injectable()
export class PollService {
    constructor(
        @InjectRepository(PollSession)
        private readonly sessionRepo: Repository<PollSession>,
        @InjectRepository(PollAnswer)
        private readonly answerRepo: Repository<PollAnswer>
    ) {}

    // ─── Start Poll ───────────────────────────────────────────────────────────

    async startPoll(
        userId: number
    ): Promise<QuestionPayload & { token: string }> {
        // First check if the user already has an incomplete session, if so, resume it
        const existingSession = await this.sessionRepo.findOne({
            where: { userId, completed: false },
        });

        if (existingSession) {
            return this.resumePoll(userId) as Promise<
                QuestionPayload & { token: string }
            >;
        }

        const token = randomBytes(16).toString("hex");

        const session = this.sessionRepo.create({
            token,
            userId,
            currentStep: 0,
            completed: false,
            completedAt: null,
        });
        await this.sessionRepo.save(session);

        const firstQuestion = POLL_QUESTIONS[0];

        return {
            token,
            question: firstQuestion,
            step: 1,
            totalSteps: POLL_QUESTIONS.length,
        };
    }

    // ─── Resume Poll ──────────────────────────────────────────────────────────

    async resumePoll(
        userId: number
    ): Promise<QuestionPayload & { token: string }> {
        const session = await this.sessionRepo.findOne({
            where: { userId, completed: false },
        });

        if (!session) {
            throw new NotFoundException(
                "No active poll session found for this user."
            );
        }

        const currentQuestion = POLL_QUESTIONS[session.currentStep];

        if (!currentQuestion) {
            throw new BadRequestException(
                "No more questions available for this session."
            );
        }

        return {
            token: session.token,
            question: currentQuestion,
            step: session.currentStep + 1,
            totalSteps: POLL_QUESTIONS.length,
        };
    }

    // ─── Submit Answer ────────────────────────────────────────────────────────

    async submitAnswer(
        dto: SubmitAnswerDto,
        userId: number
    ): Promise<AnswerResponse> {
        const session = await this.findSessionByToken(dto.token);

        if (session.userId !== userId) {
            throw new BadRequestException(
                "Session token does not belong to the current user."
            );
        }

        if (session.completed) {
            throw new BadRequestException(
                "This poll session is already completed."
            );
        }

        const expectedQuestion = POLL_QUESTIONS[session.currentStep];

        if (!expectedQuestion) {
            throw new BadRequestException(
                "No more questions available for this session."
            );
        }

        // Validate the submitted questionId matches what we expect.
        // This prevents the client from jumping steps.
        if (expectedQuestion.id !== dto.questionId) {
            throw new BadRequestException(
                `Expected answer for question "${expectedQuestion.id}" (step ${session.currentStep + 1}), ` +
                    `but received answer for "${dto.questionId}". ` +
                    `Submit answers in order.`
            );
        }

        // Validate that a multiple-choice question gets an array response
        if (
            expectedQuestion.type === "multiple" &&
            !Array.isArray(dto.answer)
        ) {
            throw new BadRequestException(
                `Question "${dto.questionId}" is multiple-choice. Send "answer" as an array.`
            );
        }

        // Save the answer
        const pollAnswer = this.answerRepo.create({
            session,
            questionId: expectedQuestion.id,
            questionOrder: expectedQuestion.order,
            answer: dto.answer,
        });
        await this.answerRepo.save(pollAnswer);

        // Advance the session step
        session.currentStep += 1;

        const nextQuestion = POLL_QUESTIONS[session.currentStep];

        if (!nextQuestion) {
            // All questions answered → mark as complete
            session.completed = true;
            session.completedAt = new Date();
            await this.sessionRepo.save(session);

            return {
                completed: true,
                sessionId: session.id,
                message:
                    "Thank you for completing the tourniquet training assessment!",
            };
        }

        await this.sessionRepo.save(session);

        return {
            question: nextQuestion,
            step: session.currentStep + 1, // next step is 1-based
            totalSteps: POLL_QUESTIONS.length,
        };
    }

    // ─── Get Results (Admin / Preview) ────────────────────────────────────────

    async getResults(sessionId: string): Promise<PollResultPayload> {
        const session = await this.sessionRepo.findOne({
            where: { id: sessionId },
            relations: ["answers"],
        });

        if (!session) {
            throw new NotFoundException(`Session "${sessionId}" not found.`);
        }

        // Build a lookup map for question metadata
        const questionMap = new Map(POLL_QUESTIONS.map((q) => [q.id, q]));

        const answers = session.answers
            .sort((a, b) => a.questionOrder - b.questionOrder)
            .map((a) => {
                const question = questionMap.get(a.questionId);
                return {
                    questionId: a.questionId,
                    order: a.questionOrder,
                    title: question?.title ?? "Unknown question",
                    type: question?.type ?? "unknown",
                    answer: a.answer,
                    answeredAt: a.answeredAt,
                };
            });

        return {
            sessionId: session.id,
            completed: session.completed,
            startedAt: session.startedAt,
            completedAt: session.completedAt,
            answers,
        };
    }

    // ─── Helpers ──────────────────────────────────────────────────────────────

    private async findSessionByToken(token: string): Promise<PollSession> {
        const session = await this.sessionRepo.findOne({ where: { token } });
        if (!session) {
            throw new NotFoundException(
                `Poll session not found for the provided token.`
            );
        }
        return session;
    }
}
