import { AppBar, Toolbar, Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../icons/ArrowRight";
import { useFlowNavBridge } from "../../layout/Layout";
import { tokens } from "../../theme/tokens";
import { LanguageSwitcher } from "../LanguageSwitcher";

const navLinkBaseSx = {
  flex: "0 0 auto",
  p: { xs: "10px 14px", sm: "12px 18px", md: "14px 24px" },
  borderRadius: tokens.radius.md,
  whiteSpace: "nowrap" as const,
  scrollSnapAlign: "start",
  transition: `transform ${tokens.motion.durationFast} ${tokens.motion.ease}, background-color ${tokens.motion.durationFast} ${tokens.motion.ease}, color ${tokens.motion.durationFast} ${tokens.motion.ease}, opacity ${tokens.motion.durationFast} ${tokens.motion.ease}`,
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

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <Box sx={{ mb: { xs: "14px", md: "20px" } }}>
      <AppBar position='static' elevation={0} sx={{ bgcolor: "transparent" }}>
        <Toolbar
          disableGutters
          sx={{
            p: 0,
            minHeight: "unset !important",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: { xs: "10px", md: "12px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              width: "100%",
            }}
          >
            <MuiLink
              underline='none'
              onClick={handleBack}
              sx={{
                display: "inline-flex",
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
            <LanguageSwitcher />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: { xs: "8px", sm: "10px" },
              width: "100%",
              minWidth: 0,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              pb: { xs: 0.5, md: 0 },
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(30,30,30,0.25)",
                borderRadius: 8,
              },
            }}
          >
            {links.map((item) => {
              const active = isActive(item.to);
              return (
                <MuiLink
                  key={item.to}
                  component={Link}
                  to={item.to}
                  underline='none'
                  aria-current={active ? "page" : undefined}
                  sx={{
                    ...navLinkBaseSx,
                    color: active ? "common.white" : "common.black",
                    bgcolor: active ? "secondary.main" : "info.main",
                  }}
                >
                  <Typography variant='caption'>{item.label}</Typography>
                </MuiLink>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
