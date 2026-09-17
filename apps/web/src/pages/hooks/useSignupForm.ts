import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { authApi } from "../../api/authApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useSignupForm = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Debounce field values — validation hints appear after user stops typing
    const debouncedEmail = useDebounce(email);
    const debouncedPassword = useDebounce(password);
    const debouncedConfirm = useDebounce(confirmPassword);

    const emailFieldError =
        debouncedEmail && !EMAIL_REGEX.test(debouncedEmail)
            ? "Введіть дійсну адресу електронної пошти"
            : "";

    const passwordFieldError =
        debouncedPassword && debouncedPassword.length < 6
            ? "Пароль має містити щонайменше 6 символів"
            : "";

    const confirmFieldError =
        debouncedConfirm && debouncedConfirm !== debouncedPassword
            ? "Паролі не співпадають"
            : "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailFieldError || passwordFieldError || confirmFieldError) return;
        if (password !== confirmPassword) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await authApi.signup({ email, password });
            navigate("/login");
        } catch (err: any) {
            console.error("Signup error:", err);
            const msg = err?.response?.data?.message;
            setError(msg ?? "Помилка створення облікового запису. Спробуйте ще раз.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        error, setError,
        emailFieldError,
        passwordFieldError,
        confirmFieldError,
        handleSubmit,
    };
};
