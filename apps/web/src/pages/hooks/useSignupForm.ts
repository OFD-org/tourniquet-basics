import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../hooks/useDebounce";
import { authApi } from "../../api/authApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useSignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedEmail = useDebounce(email);
  const debouncedPassword = useDebounce(password);
  const debouncedConfirm = useDebounce(confirmPassword);

  const emailFieldError =
    debouncedEmail && !EMAIL_REGEX.test(debouncedEmail)
      ? t("auth.errors.invalidEmail")
      : "";

  const passwordFieldError =
    debouncedPassword && debouncedPassword.length < 6
      ? t("auth.errors.passwordMin")
      : "";

  const confirmFieldError =
    debouncedConfirm && debouncedConfirm !== debouncedPassword
      ? t("auth.errors.passwordMismatch")
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
      const response = await authApi.login({ email, password });
      const token = response.data.access_token || response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err: unknown) {
      console.error("Signup error:", err);
      const msg = (err as { response?: { data?: { message?: string } } })?.response
        ?.data?.message;
      setError(msg ?? t("auth.errors.signupFailed"));
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    setError,
    emailFieldError,
    passwordFieldError,
    confirmFieldError,
    handleSubmit,
  };
};
