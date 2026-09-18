import { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowRight } from "../../../icons/ArrowRight";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type FeatureCardProps = {
  titleKey: string;
  link: string;
};

export const FeatureCard: FC<FeatureCardProps> = ({ titleKey, link }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: { xs: 160, md: 220 },
        p: { xs: "18px", md: "24px" },
        background: ({ palette }) => palette.common.white,
        borderRadius: "12px",
        transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography variant="h2">{t(titleKey)}</Typography>
      <Button
        variant="warning"
        component={Link}
        to={link}
        sx={{ mt: "auto", width: "fit-content", textTransform: "none" }}
      >
        <Typography
          variant="button"
          sx={{
            color: ({ palette }) => palette.secondary.main,
            alignSelf: "end",
          }}
        >
          {t("check")}
        </Typography>
        <ArrowRight />
      </Button>
    </Box>
  );
};
