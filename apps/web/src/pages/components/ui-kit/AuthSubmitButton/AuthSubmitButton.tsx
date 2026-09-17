import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ReactNode } from "react";

export type AuthSubmitButtonProps = {
  loading?: boolean;
  children: ReactNode;
} & Omit<ButtonProps, "variant" | "children">;

/** Primary CTA on auth screens (olive / theme primary). */
export const AuthSubmitButton = ({
  loading = false,
  disabled,
  children,
  sx,
  ...props
}: AuthSubmitButtonProps) => (
  <Button
    type='submit'
    variant='primary'
    fullWidth
    disabled={disabled || loading}
    sx={{
      mb: 3,
      padding: "16px",
      fontSize: "16px",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
      textTransform: "none",
      ...sx,
    }}
    {...props}
  >
    {loading ? <CircularProgress size={20} sx={{ color: "inherit" }} /> : children}
  </Button>
);
