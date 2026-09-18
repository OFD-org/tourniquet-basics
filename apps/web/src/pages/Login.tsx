import React from "react";
import { Box, TextField, Typography, Link, Alert, Snackbar } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useLoginForm } from "./hooks/useLoginForm";
import { AuthSubmitButton } from "./components/ui-kit/AuthSubmitButton";
import { GoogleAuthButton } from "./components/ui-kit/GoogleAuthButton";

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

export const Login = () => {
  const {
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
  } = useLoginForm();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: ({ palette }) => palette.primary.main,
        padding: { xs: "24px 16px", sm: "40px 20px" },
      }}
    >
      <Box
        className='page-enter'
        sx={{
          width: "100%",
          maxWidth: "480px",
          background: ({ palette }) => palette.secondary.main,
          borderRadius: "12px",
          padding: { xs: "32px 20px", sm: "48px 36px", md: "60px 48px" },
        }}
      >
        <Typography
          variant='h2'
          sx={{ color: ({ palette }) => palette.common.white, mb: 4, textAlign: "center" }}
        >
          Вхід
        </Typography>

        <Snackbar
          open={!!error}
          autoHideDuration={5000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity='error'
            onClose={() => setError(null)}
            sx={{ width: "100%", fontWeight: 500 }}
          >
            {error}
          </Alert>
        </Snackbar>

        <Box component='form' onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!emailFieldError}
            helperText={emailFieldError}
            sx={{ mb: 3, ...fieldSx }}
          />

          <TextField
            fullWidth
            label='Пароль'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={!!passwordFieldError}
            helperText={passwordFieldError}
            sx={{ mb: 4, ...fieldSx }}
          />

          <AuthSubmitButton
            loading={loading}
            disabled={!!emailFieldError || !!passwordFieldError}
          >
            Увійти
          </AuthSubmitButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
            <Typography
              variant='body2'
              sx={{ color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}
            >
              або
            </Typography>
            <Box sx={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.15)" }} />
          </Box>

          <GoogleAuthButton label='Увійти через Google' />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant='body2' sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Немає облікового запису?{" "}
              <Link
                component={RouterLink}
                to='/signup'
                sx={{
                  color: ({ palette }) => palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Зареєструватися
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
