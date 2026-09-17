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
    pageGap: "20px",
  },
} as const;
