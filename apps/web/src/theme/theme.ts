import { createTheme } from "@mui/material/styles";
import { breakpoints } from "./breakpoints";
import { palette } from "./palette";
import { typography } from "./typography";
import { tokens } from "./tokens";

const baseTheme = createTheme({
  palette,
  breakpoints,
  typography,
  shape: {
    borderRadius: 12,
  },
});

export const theme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--color-page": tokens.color.page,
          "--color-page-muted": tokens.color.pageMuted,
          "--color-surface": tokens.color.surface,
          "--color-ink": tokens.color.ink,
          "--color-ink-muted": tokens.color.inkMuted,
          "--color-action": tokens.color.action,
          "--color-accent": tokens.color.accent,
          "--radius-md": tokens.radius.md,
        },
        body: {
          backgroundColor: tokens.color.page,
          color: tokens.color.ink,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            display: "flex",
            gap: "10px",
            borderRadius: tokens.radius.md,
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: baseTheme.palette.primary.dark,
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(30,30,30,0.12)",
              color: "rgba(30,30,30,0.38)",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            display: "flex",
            gap: "10px",
            borderRadius: tokens.radius.md,
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.secondary.main,
            color: baseTheme.palette.secondary.contrastText,
            "&:hover": {
              backgroundColor: baseTheme.palette.secondary.dark,
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(30,30,30,0.35)",
              color: "rgba(255,255,255,0.5)",
            },
          },
        },
        {
          props: { variant: "info" },
          style: {
            display: "flex",
            gap: "10px",
            borderRadius: tokens.radius.md,
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.info.main,
            color: baseTheme.palette.info.contrastText,
            "&:hover": {
              backgroundColor: baseTheme.palette.info.dark,
            },
          },
        },
        {
          props: { variant: "warning" },
          style: {
            display: "flex",
            gap: "10px",
            borderRadius: tokens.radius.md,
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.warning.main,
            color: baseTheme.palette.warning.contrastText,
            "&:hover": {
              backgroundColor: baseTheme.palette.warning.dark,
            },
          },
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.color.surface,
          borderRadius: `${tokens.radius.md} !important`,
          boxShadow: "none",
          border: `1px solid ${tokens.color.border}`,
          "&:before": { display: "none" },
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 64,
          padding: "12px 20px",
          "&.Mui-expanded": {
            minHeight: 64,
          },
        },
        content: {
          margin: "8px 0",
          "&.Mui-expanded": {
            margin: "8px 0",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 20px 20px",
          color: tokens.color.inkMuted,
        },
      },
    },
  },
});
