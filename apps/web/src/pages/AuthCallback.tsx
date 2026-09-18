import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Loader } from "../components/Loader/Loader";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    } else {
      setError(t("auth.errors.googleToken"));
    }
  }, [navigate, t]);

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: ({ palette }) => palette.primary.main,
          gap: 2,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <LanguageSwitcher />
        </Box>
        <Typography
          variant='h5'
          sx={{ color: ({ palette }) => palette.common.white, textAlign: "center", px: 3 }}
        >
          {error}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: ({ palette }) => palette.secondary.main,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/login", { replace: true })}
        >
          {t("auth.backToLogin")}
        </Typography>
      </Box>
    );
  }

  return <Loader fullScreen />;
};
