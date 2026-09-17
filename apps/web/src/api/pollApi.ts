import { axiosInstance } from "./axios";
import { SubmitAnswerDto, AnswerResponse, FlowNodePayload } from "./poll.types";

export type PollStatus = {
  active: boolean;
  inProgress: boolean;
  currentNodeId: string | null;
  answersCount: number;
};

export const pollApi = {
  start: () =>
    axiosInstance.get<FlowNodePayload & { token: string }>("/poll/start"),
  resume: () =>
    axiosInstance.get<FlowNodePayload & { token: string }>("/poll/resume"),
  answer: (dto: SubmitAnswerDto) =>
    axiosInstance.post<AnswerResponse>("/poll/answer", dto),
  back: () =>
    axiosInstance.post<FlowNodePayload & { token: string }>("/poll/back"),
  status: () => axiosInstance.get<PollStatus>("/poll/status"),
};
