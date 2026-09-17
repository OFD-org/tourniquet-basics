import { AppBar, Toolbar, Typography, Link as MuiLink, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../icons/ArrowRight";
import { useFlowNavBridge } from "../../layout/Layout";

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { onBack, canGoBack } = useFlowNavBridge();

  const handleBack = () => {
    // On algorithm route: only undo in-session steps — never leave to home / "not started"
    if (location.pathname.startsWith("/flow")) {
      if (canGoBack && onBack) {
        onBack();
      }
      return;
    }
    window.location.assign("/");
  };

  return (
    <Box
      sx={{
        mb: "20px",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "12px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <AppBar position='static' elevation={0}>
        <Toolbar
          disableGutters
          sx={{ p: 0, minHeight: "48px !important", minWidth: "max-content" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: "12px",
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
                borderRadius: "12px",
                p: "12px 53px 12px 24px",
                cursor: "pointer",
                opacity: location.pathname.startsWith("/flow") && !canGoBack ? 0.55 : 1,
              }}
            >
              <ArrowRight direction='down' color='rgba(255, 255, 255, 1)' />
              <Typography variant='caption' sx={{ alignSelf: "end" }}>
                {t("back")}
              </Typography>
            </MuiLink>
            <MuiLink
              component={Link}
              to='/'
              underline='none'
              sx={{
                color: ({ palette }) => palette.common.black,
                background: ({ palette }) => palette.info.main,
                p: "14px 24px",
                borderRadius: "12px",
              }}
            >
              <Typography variant='caption'>{t("home")}</Typography>
            </MuiLink>
            <MuiLink
              component={Link}
              to='/syndrome'
              underline='none'
              sx={{
                color: ({ palette }) => palette.common.black,
                background: ({ palette }) => palette.info.main,
                p: "14px 24px",
                borderRadius: "12px",
              }}
            >
              <Typography variant='caption'>{t("syndromeHeader")}</Typography>
            </MuiLink>
            <MuiLink
              component={Link}
              to='/wound'
              underline='none'
              sx={{
                color: ({ palette }) => palette.common.black,
                background: ({ palette }) => palette.info.main,
                p: "14px 24px",
                borderRadius: "12px",
              }}
            >
              <Typography variant='caption'>{t("woundHeader")}</Typography>
            </MuiLink>
            <MuiLink
              component={Link}
              to='/shift'
              underline='none'
              sx={{
                color: ({ palette }) => palette.common.black,
                background: ({ palette }) => palette.info.main,
                p: "14px 24px",
                borderRadius: "12px",
              }}
            >
              <Typography variant='caption'>{t("shiftHeader")}</Typography>
            </MuiLink>
            <MuiLink
              component={Link}
              to='/conversion'
              underline='none'
              sx={{
                color: ({ palette }) => palette.common.black,
                background: ({ palette }) => palette.info.main,
                p: "14px 24px",
                borderRadius: "12px",
              }}
            >
              <Typography variant='caption'>{t("conversionHeader")}</Typography>
            </MuiLink>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
