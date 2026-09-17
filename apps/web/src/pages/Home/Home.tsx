import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../icons/ArrowRight";
import { FeatureCard } from "../components/FeatureCard/FeatureCard";
import { features } from "../../constants/constants";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/flow");
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 80px)" }}>
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
        <Button variant='primary' onClick={handleStart} sx={{ mt: "62px" }}>
          <Typography
            variant='button'
            sx={{ color: ({ palette }) => palette.secondary.main, alignSelf: "end" }}
          >
            {t("start")}
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
        sx={{ display: "flex", justifyContent: "end", mt: "20px", p: "31px 24px" }}
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
