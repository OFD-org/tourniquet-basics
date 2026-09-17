export type QuestionType = 'single' | 'multiple' | 'text';

export interface PollOption {
    id: string;
    label: string;
    value: string;
}

export interface PollQuestion {
    id: string;
    order: number;
    type: QuestionType;
    title: string;
    description?: string;
    mediaUrl?: string;
    options?: PollOption[];
}

export interface QuestionPayload {
    token?: string; // Only returned on start
    question: PollQuestion;
    step: number;
    totalSteps: number;
}

export interface CompletionPayload {
    completed: true;
    sessionId: string;
    message: string;
}

export type AnswerResponse = QuestionPayload | CompletionPayload;

export interface SubmitAnswerDto {
    token: string;
    questionId: string;
    answer: string | string[];
}
