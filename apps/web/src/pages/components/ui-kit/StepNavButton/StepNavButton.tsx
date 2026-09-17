import { Button, ButtonProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../../../icons/ArrowRight";

export type StepNavDirection = "next" | "back";

export type StepNavButtonProps = {
  direction?: StepNavDirection;
} & Omit<ButtonProps, "variant" | "startIcon" | "endIcon">;

export const StepNavButton = ({
  direction = "next",
  children,
  sx,
  ...props
}: StepNavButtonProps) => {
  const { t } = useTranslation();
  const isNext = direction === "next";
  const label = children ?? (isNext ? t("next") : t("previous"));

  const arrow = (
    <ArrowRight
      size='s'
      color='rgba(255, 255, 255, 1)'
      direction={isNext ? undefined : "down"}
    />
  );

  return (
    <Button
      variant='secondary'
      startIcon={isNext ? undefined : arrow}
      endIcon={isNext ? arrow : undefined}
      sx={{
        textTransform: "none",
        ...sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};
