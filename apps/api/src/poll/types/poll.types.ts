import { PollQuestion } from "../data/poll-questions.data";
import { FlowNode } from "../data/poll-flow.definition";

/** @deprecated Prefer FlowNodePayload for the decision-tree API. */
export interface QuestionPayload {
    question: PollQuestion;
    step: number;
    totalSteps: number;
}

/** Current decision-tree node served to the client. */
export interface FlowNodePayload {
    node: FlowNode;
    /** 1-based progress (answers completed + 1) */
    step: number;
    /** Approximate depth for UI (count of interactive nodes) */
    totalSteps: number;
    /** True when at least one answer can be undone (step-by-step back to start). */
    canGoBack: boolean;
}

export interface CompletionPayload {
    completed: true;
    sessionId: string;
    message: string;
}

export type AnswerResponse =
    | (FlowNodePayload & { token?: string })
    | CompletionPayload;

export interface AnswerWithQuestion {
    questionId: string;
    order: number;
    title: string;
    type: string;
    answer: string | string[];
    answeredAt: Date;
}

export interface PollResultPayload {
    sessionId: string;
    completed: boolean;
    startedAt: Date;
    completedAt: Date | null;
    answers: AnswerWithQuestion[];
}
