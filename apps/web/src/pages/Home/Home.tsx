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
import { tokens } from "../../theme/tokens";

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
    <Box
      className='page-enter'
      sx={{
        minHeight: { xs: "auto", md: "calc(100vh - 80px)" },
        display: "flex",
        flexDirection: "column",
        gap: { xs: "14px", md: "20px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            component='img'
            src='/brand/logo.png'
            alt='Турнікет'
            sx={{
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              borderRadius: "10px",
            }}
          />
          <Typography variant='h5' sx={{ color: ({ palette }) => palette.secondary.main }}>
            Турнікет
          </Typography>
        </Box>
        <AuthNavButtons redirectAfterLogin='/flow?resume=true' />
      </Box>

      <Box
        sx={{
          p: { xs: "48px 20px", sm: "80px 32px", md: "120px 40px", lg: "160px 40px" },
          background: ({ palette }) => palette.secondary.main,
          borderRadius: tokens.radius.md,
          transition: `transform ${tokens.motion.durationSlow} ${tokens.motion.easeOut}`,
        }}
      >
        <Typography
          variant='h1'
          sx={{ color: ({ palette }) => palette.common.white, maxWidth: "820px" }}
        >
          {t("algorithm")}
        </Typography>
        <Button
          variant='primary'
          onClick={handleStart}
          sx={{ mt: { xs: "28px", md: "48px", lg: "62px" }, textTransform: "none" }}
        >
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
          display: { xs: "flex", sm: "grid" },
          gridTemplateColumns: {
            sm: "1fr 1fr",
            lg: "repeat(4, 1fr)",
          },
          gap: { xs: "12px", md: "20px" },
          minHeight: { lg: "268px" },
          overflowX: { xs: "auto", sm: "visible" },
          scrollSnapType: { xs: "x mandatory", sm: "none" },
          WebkitOverflowScrolling: "touch",
          mx: { xs: -0.5, sm: 0 },
          px: { xs: 0.5, sm: 0 },
          pb: { xs: 1, sm: 0 },
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(30,30,30,0.25)",
            borderRadius: 8,
          },
        }}
      >
        {features.map((feature) => (
          <Box
            key={feature.titleKey}
            sx={{
              flex: { xs: "0 0 auto", sm: "unset" },
              width: { xs: "min(78vw, 280px)", sm: "auto" },
              scrollSnapAlign: { xs: "start", sm: "unset" },
              minHeight: { sm: "100%" },
            }}
          >
            <FeatureCard titleKey={feature.titleKey} link={feature.link} />
          </Box>
        ))}
      </Box>

      <Button
        variant='info'
        fullWidth
        onClick={() => navigate("/sources")}
        sx={{
          display: "flex",
          justifyContent: "end",
          p: { xs: "20px 18px", md: "28px 24px" },
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
