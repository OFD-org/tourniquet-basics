import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { authApi } from "../../api/authApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Debounce field values — validation hint appears after user stops typing
    const debouncedEmail = useDebounce(email);
    const debouncedPassword = useDebounce(password);

    const emailFieldError =
        debouncedEmail && !EMAIL_REGEX.test(debouncedEmail)
            ? "Введіть дійсну адресу електронної пошти"
            : "";

    const passwordFieldError =
        debouncedPassword && debouncedPassword.length < 6
            ? "Пароль має містити щонайменше 6 символів"
            : "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailFieldError || passwordFieldError) return;

        setLoading(true);
        setError(null);

        try {
            const response = await authApi.login({ email, password });
            const token = response.data.access_token || response.data.token;

            if (token) {
                localStorage.setItem("token", token);
                navigate(redirectUrl);
            } else {
                setError("Помилка входу: токен не отримано");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            const msg = err?.response?.data?.message;
            setError(msg ?? "Невірний email або пароль");
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        loading,
        error, setError,
        emailFieldError,
        passwordFieldError,
        handleSubmit,
    };
};
