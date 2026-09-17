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
import { SubmitAnswerDto } from "./dto/submit-answer.dto";
import {
    AnswerResponse,
    FlowNodePayload,
    PollResultPayload,
} from "./types/poll.types";
import {
    FlowAnswer,
    POLL_FLOW_NODES,
    POLL_FLOW_START_ID,
    getFlowNode,
    resolveNextNodeId,
} from "./data/poll-flow.definition";

const INTERACTIVE_TOTAL = Object.values(POLL_FLOW_NODES).filter(
    (n) => n.kind === "yes_no" || n.kind === "success"
).length;

@Injectable()
export class PollService {
    constructor(
        @InjectRepository(PollSession)
        private readonly sessionRepo: Repository<PollSession>,
        @InjectRepository(PollAnswer)
        private readonly answerRepo: Repository<PollAnswer>
    ) {}

    async startPoll(
        userId: number
    ): Promise<FlowNodePayload & { token: string }> {
        const existingSession = await this.sessionRepo.findOne({
            where: { userId, completed: false },
        });

        if (existingSession) {
            return this.resumePoll(userId);
        }

        const token = randomBytes(16).toString("hex");
        const session = this.sessionRepo.create({
            token,
            userId,
            currentStep: 0,
            currentNodeId: POLL_FLOW_START_ID,
            completed: false,
            completedAt: null,
        });
        await this.sessionRepo.save(session);

        return {
            token,
            ...this.toPayload(session),
        };
    }

    async resumePoll(
        userId: number
    ): Promise<FlowNodePayload & { token: string }> {
        const session = await this.sessionRepo.findOne({
            where: { userId, completed: false },
        });

        if (!session) {
            throw new NotFoundException(
                "Активну сесію опитування для цього користувача не знайдено."
            );
        }

        if (!session.currentNodeId) {
            session.currentNodeId = POLL_FLOW_START_ID;
            await this.sessionRepo.save(session);
        }

        return {
            token: session.token,
            ...this.toPayload(session),
        };
    }

    async submitAnswer(
        dto: SubmitAnswerDto,
        userId: number
    ): Promise<AnswerResponse> {
        const session = await this.findSessionByToken(dto.token);

        if (session.userId !== userId) {
            throw new BadRequestException(
                "Токен сесії не належить поточному користувачу."
            );
        }

        if (session.completed) {
            throw new BadRequestException("Цю сесію вже завершено.");
        }

        const currentId = session.currentNodeId || POLL_FLOW_START_ID;
        const node = getFlowNode(currentId);

        if (node.id !== dto.questionId) {
            throw new BadRequestException(
                `Очікувалась відповідь для вузла "${node.id}", отримано "${dto.questionId}".`
            );
        }

        const answer = dto.answer as FlowAnswer;
        this.assertAnswerAllowed(node.kind, answer);

        const pollAnswer = this.answerRepo.create({
            session,
            questionId: node.id,
            questionOrder: session.currentStep + 1,
            answer,
        });
        await this.answerRepo.save(pollAnswer);

        session.currentStep += 1;

        if (node.completesSession || node.kind === "success") {
            session.completed = true;
            session.completedAt = new Date();
            await this.sessionRepo.save(session);
            return {
                completed: true,
                sessionId: session.id,
                message:
                    "Алгоритм завершено. Дякуємо! Слідкуйте за станом постраждалого.",
            };
        }

        const nextId = resolveNextNodeId(node.id, answer);
        if (!nextId) {
            session.completed = true;
            session.completedAt = new Date();
            await this.sessionRepo.save(session);
            return {
                completed: true,
                sessionId: session.id,
                message: "Алгоритм завершено.",
            };
        }

        session.currentNodeId = nextId;
        await this.sessionRepo.save(session);

        const nextNode = getFlowNode(nextId);
        if (nextNode.completesSession && nextNode.kind === "success") {
            // Serve success screen; completion happens on ack
            return this.toPayload(session);
        }

        return this.toPayload(session);
    }

    /**
     * Undo the latest saved answer (one step) and reopen that node.
     * Caller may repeat until the algorithm start (intro) — never deletes the session.
     */
    async undoLastDecision(
        userId: number
    ): Promise<FlowNodePayload & { token: string }> {
        const session = await this.sessionRepo.findOne({
            where: { userId, completed: false },
        });

        if (!session) {
            throw new NotFoundException(
                "Активну сесію алгоритму не знайдено."
            );
        }

        const answers = await this.answerRepo.find({
            where: { session: { id: session.id } },
            order: { questionOrder: "DESC" },
        });

        if (answers.length === 0) {
            throw new BadRequestException(
                "Ви вже на початку алгоритму. Для виходу натисніть «На головну»."
            );
        }

        const last = answers[0];
        await this.answerRepo.remove(last);

        const remaining = answers.length - 1;
        session.currentNodeId = last.questionId;
        session.currentStep = remaining;
        session.completed = false;
        session.completedAt = null;
        await this.sessionRepo.save(session);

        return {
            token: session.token,
            ...this.toPayload(session, remaining),
        };
    }

    /** Lightweight status for Home CTA (Почати / Продовжити). */
    async getStatus(userId: number): Promise<{
        active: boolean;
        inProgress: boolean;
        currentNodeId: string | null;
        answersCount: number;
    }> {
        const session = await this.sessionRepo.findOne({
            where: { userId, completed: false },
        });

        if (!session) {
            return {
                active: false,
                inProgress: false,
                currentNodeId: null,
                answersCount: 0,
            };
        }

        const answersCount = await this.answerRepo.count({
            where: { session: { id: session.id } },
        });

        return {
            active: true,
            // Any open session counts as in-progress (incl. sitting on intro)
            inProgress: true,
            currentNodeId: session.currentNodeId || POLL_FLOW_START_ID,
            answersCount,
        };
    }

    async getResults(sessionId: string): Promise<PollResultPayload> {
        const session = await this.sessionRepo.findOne({
            where: { id: sessionId },
            relations: ["answers"],
        });

        if (!session) {
            throw new NotFoundException(`Сесію "${sessionId}" не знайдено.`);
        }

        const answers = (session.answers || [])
            .sort((a, b) => a.questionOrder - b.questionOrder)
            .map((a) => {
                const node = POLL_FLOW_NODES[a.questionId];
                return {
                    questionId: a.questionId,
                    order: a.questionOrder,
                    title: node?.title || node?.label || a.questionId,
                    type: node?.kind ?? "unknown",
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

    private toPayload(
        session: PollSession,
        answersCount?: number
    ): FlowNodePayload {
        const node = getFlowNode(session.currentNodeId || POLL_FLOW_START_ID);
        const count = answersCount ?? session.currentStep ?? 0;
        return {
            node,
            step: session.currentStep + 1,
            totalSteps: Math.max(INTERACTIVE_TOTAL, session.currentStep + 1),
            // Repeatable one-step undo until algorithm start (intro, 0 answers)
            canGoBack: count > 0,
        };
    }

    private assertAnswerAllowed(
        kind: string,
        answer: FlowAnswer
    ): void {
        if (kind === "yes_no") {
            if (answer !== "yes" && answer !== "no") {
                throw new BadRequestException(
                    'Для цього питання потрібна відповідь "yes" або "no".'
                );
            }
            return;
        }
        if (answer !== "ack") {
            throw new BadRequestException(
                'Для цього кроку надішліть відповідь "ack" (підтвердження / Далі).'
            );
        }
    }

    private async findSessionByToken(token: string): Promise<PollSession> {
        const session = await this.sessionRepo.findOne({ where: { token } });
        if (!session) {
            throw new NotFoundException(
                "Сесію опитування за наданим токеном не знайдено."
            );
        }
        return session;
    }
}
