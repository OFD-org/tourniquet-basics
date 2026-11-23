import { useState, useCallback, useRef } from "react";
import { FlowAnswer } from "../api/poll.types";
import { getFlowNode, POLL_FLOW_START_ID, resolveNextNodeId } from "../data/tutorial-flow";

/** Public tutorial: no JWT, account, API requests or saved personal answers.
 * Legacy authenticated requests remain in api/pollApi.ts, disconnected here.
 * Progress lasts until this page is left or reloaded.
 */
export const usePoll = () => {
  const [history, setHistory] = useState<string[]>([POLL_FLOW_START_ID]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bootstrapped = useRef(false);
  const currentNode = getFlowNode(history[history.length - 1]);

  const startOrResume = useCallback(async () => {
    bootstrapped.current = true;
  }, []);

  const submitAnswer = useCallback(async (answer: FlowAnswer) => {
    if (isCompleted) return;
    if (currentNode.completesSession && answer === "ack") {
      setIsCompleted(true);
      return;
    }
    const next = resolveNextNodeId(currentNode.id, answer);
    if (next) setHistory((previous) => [...previous, next]);
  }, [currentNode, isCompleted]);

  const goBack = useCallback(async () => {
    setIsCompleted(false);
    setHistory((previous) => previous.length > 1 ? previous.slice(0, -1) : previous);
  }, []);

  return {
    currentNode,
    step: history.length,
    // Branches differ in length; show the current step without a false total.
    totalSteps: 0,
    isCompleted,
    error,
    loading: false,
    canGoBack: history.length > 1,
    bootstrapped,
    startOrResume,
    submitAnswer,
    goBack,
    setError,
  };
};
