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
          "--ease-out": tokens.motion.easeOut,
          "--ease-snap": tokens.motion.ease,
          "--duration": tokens.motion.duration,
        },
        body: {
          backgroundColor: tokens.color.page,
          color: tokens.color.ink,
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
          },
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
          transition: `transform ${tokens.motion.durationFast} ${tokens.motion.ease}, background-color ${tokens.motion.duration} ${tokens.motion.ease}, opacity ${tokens.motion.durationFast} ${tokens.motion.ease}`,
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            display: "flex",
            gap: "10px",
            borderRadius: tokens.radius.md,
            padding: "14px 22px",
            [baseTheme.breakpoints.up("md")]: {
              padding: "16px 29px",
            },
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
            padding: "14px 22px",
            [baseTheme.breakpoints.up("md")]: {
              padding: "16px 29px",
            },
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
            padding: "14px 22px",
            [baseTheme.breakpoints.up("md")]: {
              padding: "16px 29px",
            },
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
            padding: "14px 22px",
            [baseTheme.breakpoints.up("md")]: {
              padding: "16px 29px",
            },
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
          transition: `border-color ${tokens.motion.duration} ${tokens.motion.ease}`,
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
          minHeight: 56,
          padding: "10px 16px",
          "&.Mui-expanded": {
            minHeight: 56,
          },
        },
        content: {
          margin: "8px 0",
          "&.Mui-expanded": {
            margin: "8px 0",
          },
        },
        expandIconWrapper: {
          transition: `transform ${tokens.motion.duration} ${tokens.motion.ease}`,
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 16px 16px",
          color: tokens.color.inkMuted,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: `opacity ${tokens.motion.durationFast} ${tokens.motion.ease}, transform ${tokens.motion.durationFast} ${tokens.motion.ease}`,
        },
      },
    },
  },
});
