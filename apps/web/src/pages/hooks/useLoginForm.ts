import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../hooks/useDebounce";
import { authApi } from "../../api/authApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useLoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedEmail = useDebounce(email);
  const debouncedPassword = useDebounce(password);

  const emailFieldError =
    debouncedEmail && !EMAIL_REGEX.test(debouncedEmail)
      ? t("auth.errors.invalidEmail")
      : "";

  const passwordFieldError =
    debouncedPassword && debouncedPassword.length < 6
      ? t("auth.errors.passwordMin")
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
        setError(t("auth.errors.loginTokenMissing"));
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      const msg = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setError(msg ?? t("auth.errors.invalidCredentials"));
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    setError,
    emailFieldError,
    passwordFieldError,
    handleSubmit,
  };
};
