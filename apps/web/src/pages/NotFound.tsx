import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          textAlign: "center",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 16, right: 16 }}>
          <LanguageSwitcher variant='dark' />
        </Box>

        <Typography
          sx={{
            fontSize: "96px",
            fontWeight: 800,
            lineHeight: 1,
            color: ({ palette }) => palette.primary.main,
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography
          variant='h4'
          sx={{
            color: ({ palette }) => palette.common.white,
            mb: 1,
            fontWeight: 700,
          }}
        >
          {t("notFound.title")}
        </Typography>

        <Typography
          variant='body1'
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            mb: 4,
          }}
        >
          {t("notFound.body")}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant='primary'
            fullWidth
            onClick={() => navigate(-1)}
            sx={{
              padding: "16px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {t("notFound.goBack")}
          </Button>

          <Button
            fullWidth
            onClick={() => navigate("/")}
            sx={{
              padding: "14px",
              fontSize: "15px",
              fontWeight: 600,
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.4)",
              },
            }}
          >
            {t("notFound.home")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
