import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { pollApi } from "../api/pollApi";
import { FlowAnswer, FlowNode, SubmitAnswerDto } from "../api/poll.types";

export const usePoll = () => {
  const { t, i18n } = useTranslation();
  const [currentNode, setCurrentNode] = useState<FlowNode | null>(null);
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const bootstrapped = useRef(false);

  const applyPayload = (data: {
    token?: string;
    node: FlowNode;
    step: number;
    totalSteps: number;
    canGoBack?: boolean;
  }) => {
    if (data.token) {
      localStorage.setItem("poll_token", data.token);
    }
    setCurrentNode(data.node);
    setStep(data.step);
    setTotalSteps(data.totalSteps);
    setIsCompleted(false);
    setCanGoBack(
      typeof data.canGoBack === "boolean" ? data.canGoBack : data.step > 1
    );
  };

  const startOrResume = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      try {
        const res = await pollApi.resume();
        applyPayload(res.data);
        return;
      } catch (err: unknown) {
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status !== 404 && status !== 401) {
          throw err;
        }
      }

      const res = await pollApi.start();
      applyPayload(res.data);
    } catch (err: unknown) {
      console.error("Failed to start/resume poll:", err);
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || t("flowUi.errors.loadFailed");
      setError(message);
    } finally {
      setLoading(false);
      bootstrapped.current = true;
    }
  }, [t]);

  const submitAnswer = useCallback(
    async (answer: FlowAnswer) => {
      if (!currentNode || loading) return;
      const token = localStorage.getItem("poll_token");
      if (!token) {
        setError(t("flowUi.errors.noSessionToken"));
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const dto: SubmitAnswerDto = {
          token,
          questionId: currentNode.id,
          answer,
        };
        const res = await pollApi.answer(dto);

        if ("completed" in res.data && res.data.completed) {
          setIsCompleted(true);
          setSessionId(res.data.sessionId);
          const lang = (i18n.resolvedLanguage || i18n.language || "uk").split("-")[0];
          setCompletionMessage(
            lang === "en" ? t("flowUi.completedDefault") : res.data.message
          );
          setCurrentNode(null);
          setCanGoBack(false);
          localStorage.removeItem("poll_token");
        } else if ("node" in res.data) {
          applyPayload(res.data);
        }
      } catch (err: unknown) {
        console.error("Failed to submit answer:", err);
        const message =
          (err as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || t("flowUi.errors.saveFailed");
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [currentNode, loading, t, i18n.language, i18n.resolvedLanguage]
  );

  const goBack = useCallback(async () => {
    if (loading || !canGoBack) return;
    try {
      setLoading(true);
      setError(null);
      const res = await pollApi.back();
      applyPayload(res.data);
    } catch (err: unknown) {
      console.error("Failed to go back:", err);
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || t("flowUi.errors.backFailed");
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [loading, canGoBack, t]);

  return {
    currentNode,
    step,
    totalSteps,
    isCompleted,
    completionMessage,
    sessionId,
    error,
    loading,
    canGoBack,
    bootstrapped,
    startOrResume,
    submitAnswer,
    goBack,
    setError,
  };
};
