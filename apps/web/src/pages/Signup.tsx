import React from "react";
import { Box, Button, TextField, Typography, Link, Alert, CircularProgress, Snackbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSignupForm } from "./hooks/useSignupForm";

const fieldSx = {
    "& .MuiOutlinedInput-root": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px",
        "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
        "&:hover fieldset": { borderColor: "rgba(189, 198, 133, 1)" },
        "&.Mui-focused fieldset": { borderColor: "rgba(189, 198, 133, 1)" },
        "&.Mui-error fieldset": { borderColor: "#f44336" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
    "& .MuiInputLabel-root.Mui-error": { color: "#f44336" },
    "& .MuiInputBase-input": { color: "#fff" },
    "& .MuiFormHelperText-root": { color: "#f44336" },
};

export const Signup = () => {
    const {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading,
        error, setError,
        emailFieldError,
        passwordFieldError,
        confirmFieldError,
        handleSubmit,
    } = useSignupForm();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: ({ palette }) => palette.primary.main,
                padding: "40px 20px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "480px",
                    background: ({ palette }) => palette.secondary.main,
                    borderRadius: "12px",
                    padding: { xs: "40px 24px", sm: "60px 48px" },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ color: ({ palette }) => palette.common.white, mb: 4, textAlign: "center" }}
                >
                    Реєстрація
                </Typography>

                {/* ── Error toast ── */}
                <Snackbar
                    open={!!error}
                    autoHideDuration={5000}
                    onClose={() => setError(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert severity="error" onClose={() => setError(null)} sx={{ width: "100%", fontWeight: 500 }}>
                        {error}
                    </Alert>
                </Snackbar>

                <Box component="form" onSubmit={handleSubmit}>
                    {/* Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={!!emailFieldError}
                        helperText={emailFieldError}
                        sx={{ mb: 3, ...fieldSx }}
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={!!passwordFieldError}
                        helperText={passwordFieldError}
                        sx={{ mb: 3, ...fieldSx }}
                    />

                    {/* Confirm password */}
                    <TextField
                        fullWidth
                        label="Підтвердіть пароль"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        error={!!confirmFieldError}
                        helperText={confirmFieldError}
                        sx={{ mb: 4, ...fieldSx }}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading || !!emailFieldError || !!passwordFieldError || !!confirmFieldError}
                        sx={{ mb: 3, padding: "16px", fontSize: "16px", fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        {loading ? <CircularProgress size={20} sx={{ color: "inherit" }} /> : "Зареєструватися"}
                    </Button>

                    {/* OR divider */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>або</Typography>
                        <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
                    </Box>

                    {/* Google OAuth */}
                    <Button
                        type="button"
                        fullWidth
                        onClick={() => { window.location.href = "http://localhost:8090/auth/google"; }}
                        sx={{
                            mb: 3, padding: "14px", fontSize: "15px", fontWeight: 600,
                            backgroundColor: "#ffffff", color: "#3c4043", borderRadius: "8px",
                            textTransform: "none", display: "flex", alignItems: "center", gap: 1.5,
                            border: "1px solid rgba(0,0,0,0.12)",
                            "&:hover": { backgroundColor: "#f7f8f8", boxShadow: "0 2px 8px rgba(0,0,0,0.25)" },
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        Зареєструватися через Google
                    </Button>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                            Вже є обліковий запис?{" "}
                            <Link component={RouterLink} to="/login" sx={{ color: ({ palette }) => palette.primary.main, textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
                                Увійти
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
