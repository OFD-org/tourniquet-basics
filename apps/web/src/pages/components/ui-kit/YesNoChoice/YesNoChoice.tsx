import { Box, Button, Typography } from "@mui/material";
import { ArrowRight } from "../../../../icons/ArrowRight";
import { tokens } from "../../../../theme/tokens";

export type YesNoValue = "yes" | "no";

type YesNoChoiceProps = {
  value?: YesNoValue | null;
  onChange: (value: YesNoValue) => void;
  yesLabel?: string;
  noLabel?: string;
  disabled?: boolean;
};

/** Compact Так / Ні — selecting submits immediately (no extra Далі). */
export const YesNoChoice = ({
  value,
  onChange,
  yesLabel = "Так",
  noLabel = "Ні",
  disabled = false,
}: YesNoChoiceProps) => {
  const options: { value: YesNoValue; label: string }[] = [
    { value: "yes", label: yesLabel },
    { value: "no", label: noLabel },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr" },
        gap: "12px",
        maxWidth: 560,
        width: "100%",
      }}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <Button
            key={opt.value}
            type='button'
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            variant={selected ? "secondary" : "warning"}
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 52, md: 56 },
              px: { xs: 2, md: 3 },
              border: selected
                ? `2px solid ${tokens.color.ink}`
                : `1px solid ${tokens.color.border}`,
            }}
          >
            <Typography
              variant='button'
              sx={{
                color: selected ? tokens.color.inkInverse : tokens.color.ink,
                textTransform: "uppercase",
              }}
            >
              {opt.label}
            </Typography>
            <ArrowRight
              color={selected ? tokens.color.inkInverse : tokens.color.ink}
            />
          </Button>
        );
      })}
    </Box>
  );
};
