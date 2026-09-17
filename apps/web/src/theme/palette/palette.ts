import { PaletteOptions } from "@mui/material/styles";
import { tokens } from "../tokens";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    info: true;
    warning: true;
  }
}

export const palette: PaletteOptions = {
  background: {
    default: tokens.color.page,
    paper: tokens.color.surface,
  },
  primary: {
    main: tokens.color.accent,
    dark: tokens.color.accentDark,
    contrastText: tokens.color.ink,
  },
  secondary: {
    main: tokens.color.action,
    dark: tokens.color.actionHover,
    contrastText: tokens.color.inkInverse,
  },
  info: {
    main: tokens.color.pageMuted,
    dark: tokens.color.accent,
    contrastText: tokens.color.ink,
  },
  warning: {
    main: tokens.color.surfaceMuted,
    dark: "#DBDBDB",
    contrastText: tokens.color.ink,
  },
  text: {
    primary: tokens.color.ink,
    secondary: tokens.color.inkMuted,
  },
  error: {
    main: tokens.color.danger,
  },
  common: {
    white: tokens.color.surface,
    black: tokens.color.ink,
  },
  divider: tokens.color.border,
};
