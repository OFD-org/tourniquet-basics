import { AppBar, Toolbar, Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../icons/ArrowRight";
import { useFlowNavBridge } from "../../layout/Layout";
import { tokens } from "../../theme/tokens";

const navLinkSx = {
  color: "common.black",
  bgcolor: "info.main",
  p: { xs: "10px 14px", sm: "12px 18px", md: "14px 24px" },
  borderRadius: tokens.radius.md,
  whiteSpace: "nowrap" as const,
  transition: `transform ${tokens.motion.durationFast} ${tokens.motion.ease}, opacity ${tokens.motion.durationFast} ${tokens.motion.ease}`,
  "&:active": { transform: "scale(0.98)" },
};

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { onBack, canGoBack } = useFlowNavBridge();

  const handleBack = () => {
    if (location.pathname.startsWith("/flow")) {
      if (canGoBack && onBack) {
        onBack();
      }
      return;
    }
    window.location.assign("/");
  };

  const links = [
    { to: "/", label: t("home") },
    { to: "/syndrome", label: t("syndromeHeader") },
    { to: "/wound", label: t("woundHeader") },
    { to: "/shift", label: t("shiftHeader") },
    { to: "/conversion", label: t("conversionHeader") },
  ];

  return (
    <Box sx={{ mb: { xs: "14px", md: "20px" } }}>
      <AppBar position='static' elevation={0} sx={{ bgcolor: "transparent" }}>
        <Toolbar
          disableGutters
          sx={{
            p: 0,
            minHeight: "unset !important",
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: "8px", sm: "10px" },
            alignItems: "stretch",
          }}
        >
          <MuiLink
            underline='none'
            onClick={handleBack}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: ({ palette }) => palette.common.white,
              background: ({ palette }) => palette.secondary.main,
              borderRadius: tokens.radius.md,
              p: { xs: "10px 16px", md: "12px 28px 12px 20px" },
              cursor: "pointer",
              opacity: location.pathname.startsWith("/flow") && !canGoBack ? 0.55 : 1,
              transition: `opacity ${tokens.motion.durationFast} ${tokens.motion.ease}, transform ${tokens.motion.durationFast} ${tokens.motion.ease}`,
              "&:active": { transform: "scale(0.98)" },
            }}
          >
            <ArrowRight direction='down' color='rgba(255, 255, 255, 1)' />
            <Typography variant='caption' sx={{ alignSelf: "end" }}>
              {t("back")}
            </Typography>
          </MuiLink>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: "8px", sm: "10px" },
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            {links.map((item) => (
              <MuiLink
                key={item.to}
                component={Link}
                to={item.to}
                underline='none'
                sx={navLinkSx}
              >
                <Typography variant='caption'>{item.label}</Typography>
              </MuiLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
