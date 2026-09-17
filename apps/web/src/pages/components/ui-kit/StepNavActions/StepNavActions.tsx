import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";
import { StepNavButton } from "../StepNavButton";

export type StepNavActionsProps = {
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: ReactNode;
  backLabel?: ReactNode;
  showNext?: boolean;
  showBack?: boolean;
} & BoxProps;

export const StepNavActions = ({
  onNext,
  onBack,
  nextLabel,
  backLabel,
  showNext = Boolean(onNext),
  showBack = Boolean(onBack),
  sx,
  ...props
}: StepNavActionsProps) => {
  if (!showNext && !showBack) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "12px",
        mt: 0,
        pt: 0,
        width: "100%",
        ...sx,
      }}
      {...props}
    >
      {showBack && (
        <StepNavButton direction='back' onClick={onBack}>
          {backLabel}
        </StepNavButton>
      )}
      {showNext && (
        <StepNavButton direction='next' onClick={onNext}>
          {nextLabel}
        </StepNavButton>
      )}
    </Box>
  );
};
