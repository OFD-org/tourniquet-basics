/**
 * Shared design tokens — use these via theme.palette / CSS variables.
 * Surfaces: olive page · white cards · charcoal actions · near-black text.
 */
export const tokens = {
  color: {
    page: "#BDC685",
    pageMuted: "#DEE3C2",
    surface: "#FFFFFF",
    surfaceMuted: "#F7F7F7",
    ink: "#1E1E1E",
    inkMuted: "#4A4A4A",
    inkInverse: "#FFFFFF",
    action: "#1E1E1E",
    actionHover: "#303030",
    accent: "#BDC685",
    accentDark: "#A5B256",
    border: "rgba(30, 30, 30, 0.12)",
    danger: "#C62828",
    dangerBg: "rgba(198, 40, 40, 0.08)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
  },
  space: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    xxl: "32px",
    pageGap: "20px",
  },
  /** Emil Kowalski–style motion: snappy ease-out, short durations */
  motion: {
    ease: "cubic-bezier(0.32, 0.72, 0, 1)",
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    duration: "220ms",
    durationFast: "160ms",
    durationSlow: "320ms",
  },
} as const;

/** Shared responsive page chrome (title bar + surface). */
export const pageChrome = {
  title: {
    p: { xs: "16px 18px", sm: "20px 28px", md: "24px 40px" },
    borderRadius: tokens.radius.md,
    background: tokens.color.action,
    color: tokens.color.inkInverse,
    lineHeight: 1.25,
  },
  surface: {
    p: { xs: "18px", sm: "22px", md: "28px" },
    borderRadius: tokens.radius.md,
    background: tokens.color.surface,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "14px", md: tokens.space.pageGap },
    minHeight: { xs: "auto", md: "calc(100vh - 148px)" },
  },
} as const;
