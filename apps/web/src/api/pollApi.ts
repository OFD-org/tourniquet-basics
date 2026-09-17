import { axiosInstance } from "./axios";
import { SubmitAnswerDto, AnswerResponse, QuestionPayload } from "./poll.types";

export const pollApi = {
    start: () => axiosInstance.get<QuestionPayload & { token: string }>("/poll/start"),
    resume: () => axiosInstance.get<QuestionPayload & { token: string }>("/poll/resume"),
    answer: (dto: SubmitAnswerDto) => axiosInstance.post<AnswerResponse>("/poll/answer", dto),
};
