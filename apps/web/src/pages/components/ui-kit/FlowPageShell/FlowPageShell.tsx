import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactNode } from "react";
import { pageChrome, tokens } from "../../../../theme/tokens";

type FlowPageShellProps = {
  title: string;
  progressLabel?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Dim content while a request is in flight (avoids blank flash). */
  busy?: boolean;
};

export const FlowPageShell = ({
  title,
  progressLabel,
  children,
  footer,
  busy = false,
}: FlowPageShellProps) => (
  <Box
    className='page-enter'
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: { xs: "14px", md: tokens.space.pageGap },
      width: "100%",
    }}
  >
    <Typography variant='overline' sx={pageChrome.title}>
      {title}
    </Typography>

    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...pageChrome.surface,
        color: tokens.color.ink,
        width: "100%",
        minHeight: { xs: "42vh", md: "50vh" },
      }}
    >
      {progressLabel && (
        <Typography
          variant='caption'
          sx={{ color: tokens.color.inkMuted, display: "block" }}
        >
          {progressLabel}
        </Typography>
      )}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          opacity: busy ? 0.45 : 1,
          transition: `opacity ${tokens.motion.durationFast} ${tokens.motion.ease}`,
          pointerEvents: busy ? "none" : "auto",
        }}
      >
        {children}
      </Box>

      {footer}

      {busy && (
        <Box
          aria-busy
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: tokens.radius.md,
            bgcolor: "rgba(255,255,255,0.45)",
            zIndex: 2,
            animation: "fadeIn 160ms var(--ease-out, ease)",
          }}
        >
          <CircularProgress size={32} sx={{ color: tokens.color.ink }} />
        </Box>
      )}
    </Box>
  </Box>
);
