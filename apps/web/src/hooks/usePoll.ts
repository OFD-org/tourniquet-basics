import { useState, useCallback, useRef } from "react";
import { pollApi } from "../api/pollApi";
import { FlowAnswer, FlowNode, SubmitAnswerDto } from "../api/poll.types";

export const usePoll = () => {
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
    // Prefer server flag: allows 7→6→…→1→start (intro), then stops
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
          ?.message || "Не вдалося завантажити алгоритм";
      setError(message);
    } finally {
      setLoading(false);
      bootstrapped.current = true;
    }
  }, []);

  const submitAnswer = useCallback(
    async (answer: FlowAnswer) => {
      if (!currentNode || loading) return;
      const token = localStorage.getItem("poll_token");
      if (!token) {
        setError("Помилка: відсутній токен сесії. Оновіть сторінку.");
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
          setCompletionMessage(res.data.message);
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
            ?.message || "Не вдалося зберегти відповідь";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [currentNode, loading]
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
          ?.message || "Не вдалося повернутися до попереднього кроку";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [loading, canGoBack]);

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
