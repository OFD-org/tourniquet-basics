import { useState, useCallback } from "react";
import { pollApi } from "../api/pollApi";
import { PollQuestion, SubmitAnswerDto } from "../api/poll.types";

export const usePoll = () => {
    const [currentQuestion, setCurrentQuestion] = useState<PollQuestion | null>(null);
    const [step, setStep] = useState<number>(0);
    const [totalSteps, setTotalSteps] = useState<number>(0);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startOrResume = useCallback(async () => {
        try {
            setError(null);
            // Try to resume first
            try {
                const res = await pollApi.resume();
                setCurrentQuestion(res.data.question);
                setStep(res.data.step);
                setTotalSteps(res.data.totalSteps);
                localStorage.setItem("poll_token", res.data.token);
                return;
            } catch (err: any) {
                // If 404, no session exists -> start new
                if (err.response?.status !== 404 && err.response?.status !== 401) {
                    throw err;
                }
            }

            // Start new session
            const res = await pollApi.start();
            setCurrentQuestion(res.data.question);
            setStep(res.data.step);
            setTotalSteps(res.data.totalSteps);
            localStorage.setItem("poll_token", res.data.token);
        } catch (err: any) {
            console.error("Failed to start/resume poll:", err);
            setError(err.response?.data?.message || "Не вдалося завантажити опитування");
        }
    }, []);

    const submitAnswer = useCallback(async (answer: string | string[]) => {
        if (!currentQuestion) return;
        const token = localStorage.getItem("poll_token");
        if (!token) {
            setError("Помилка: відсутній токен сесії. Оновіть сторінку.");
            return;
        }

        try {
            setError(null);
            const dto: SubmitAnswerDto = {
                token,
                questionId: currentQuestion.id,
                answer,
            };
            const res = await pollApi.answer(dto);
            
            if ("completed" in res.data && res.data.completed) {
                setIsCompleted(true);
                setSessionId(res.data.sessionId);
                setCurrentQuestion(null);
            } else if ("question" in res.data) {
                setCurrentQuestion(res.data.question);
                setStep(res.data.step);
                setTotalSteps(res.data.totalSteps);
            }
        } catch (err: any) {
            console.error("Failed to submit answer:", err);
            setError(err.response?.data?.message || "Не вдалося зберегти відповідь");
        }
    }, [currentQuestion]);

    return {
        currentQuestion,
        step,
        totalSteps,
        isCompleted,
        sessionId,
        error,
        startOrResume,
        submitAnswer,
    };
};
