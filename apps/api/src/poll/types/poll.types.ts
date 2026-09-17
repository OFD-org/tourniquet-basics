import { PollQuestion } from "../data/poll-questions.data";

/** Returned when a question is served to the client. */
export interface QuestionPayload {
    question: PollQuestion;
    /** 1-based step counter for progress display (e.g. "Step 3 of 10") */
    step: number;
    totalSteps: number;
}

/** Returned when all questions have been answered. */
export interface CompletionPayload {
    completed: true;
    sessionId: string;
    message: string;
}

/** Union of what POST /poll/answer can return. */
export type AnswerResponse = QuestionPayload | CompletionPayload;

/** Shape of one answered question in the results view. */
export interface AnswerWithQuestion {
    questionId: string;
    order: number;
    title: string;
    type: string;
    answer: string | string[];
    answeredAt: Date;
}

/** Full session result payload returned by GET /poll/results/:sessionId */
export interface PollResultPayload {
    sessionId: string;
    completed: boolean;
    startedAt: Date;
    completedAt: Date | null;
    answers: AnswerWithQuestion[];
}
