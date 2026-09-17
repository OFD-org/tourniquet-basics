import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../icons/ArrowRight";
import { FeatureCard } from "../components/FeatureCard/FeatureCard";
import { features } from "../../constants/constants";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthNavButtons } from "../components/ui-kit/AuthNavButtons";
import { useAuth } from "../../hooks/useAuth";
import { pollApi } from "../../api/pollApi";

export const Home: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setInProgress(false);
      return;
    }
    pollApi
      .status()
      .then((res) => setInProgress(Boolean(res.data.inProgress)))
      .catch(() => setInProgress(false));
  }, [isAuthenticated]);

  const handleStart = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent("/flow?resume=true")}`);
      return;
    }
    navigate(inProgress ? "/flow?resume=true" : "/flow");
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 80px)" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component='img'
            src='/brand/logo.png'
            alt='Турнікет'
            sx={{ width: 48, height: 48, borderRadius: "10px" }}
          />
          <Typography variant='h5' sx={{ color: ({ palette }) => palette.secondary.main }}>
            Турнікет
          </Typography>
        </Box>
        <AuthNavButtons redirectAfterLogin='/flow?resume=true' />
      </Box>

      <Box
        sx={{
          p: "160px 40px",
          background: ({ palette }) => palette.secondary.main,
          borderRadius: "12px",
        }}
      >
        <Typography
          variant='h1'
          sx={{ color: ({ palette }) => palette.common.white, maxWidth: "820px" }}
        >
          {t("algorithm")}
        </Typography>
        <Button variant='primary' onClick={handleStart} sx={{ mt: "62px", textTransform: "none" }}>
          <Typography
            variant='button'
            sx={{ color: ({ palette }) => palette.secondary.main, alignSelf: "end" }}
          >
            {inProgress ? t("continue") : t("start")}
          </Typography>
          <ArrowRight />
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          mt: "20px",
          minHeight: "268px",
        }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.titleKey} titleKey={feature.titleKey} link={feature.link} />
        ))}
      </Box>

      <Button
        variant='info'
        fullWidth
        onClick={() => navigate("/sources")}
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: "20px",
          p: "31px 24px",
          textTransform: "none",
        }}
      >
        <Typography
          variant='button'
          sx={{ color: ({ palette }) => palette.secondary.main, alignSelf: "end" }}
        >
          {t("source")}
        </Typography>
        <ArrowRight />
      </Button>
    </Box>
  );
};
