export type FlowAnswer = "yes" | "no" | "ack";

export type FlowNodeKind =
  | "intro_accordion"
  | "yes_no"
  | "instruction"
  | "instruction_list"
  | "outcome"
  | "success";

export type FlowAccordionItem = {
  id: string;
  title: string;
  body?: string;
  mediaUrl?: string;
  defaultExpanded?: boolean;
};

export type FlowNode = {
  id: string;
  kind: FlowNodeKind;
  label: string;
  title?: string;
  body?: string;
  mediaUrl?: string;
  items?: FlowAccordionItem[];
  yesLabel?: string;
  noLabel?: string;
  completesSession?: boolean;
};

export type FlowNodePayload = {
  token?: string;
  node: FlowNode;
  step: number;
  totalSteps: number;
  canGoBack?: boolean;
};

export type CompletionPayload = {
  completed: true;
  sessionId: string;
  message: string;
};

export type AnswerResponse = FlowNodePayload | CompletionPayload;

export type SubmitAnswerDto = {
  token: string;
  questionId: string;
  answer: FlowAnswer;
};
