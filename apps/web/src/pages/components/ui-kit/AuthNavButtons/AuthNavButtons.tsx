import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../../hooks/useAuth";

type AuthNavButtonsProps = {
  /** Where to return after login (e.g. /flow?resume=true). */
  redirectAfterLogin?: string;
};

export const AuthNavButtons = ({ redirectAfterLogin = "/" }: AuthNavButtonsProps) => {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();

  const loginTo = `/login?redirect=${encodeURIComponent(redirectAfterLogin)}`;

  if (isAuthenticated) {
    return (
      <Button variant='secondary' onClick={logout} sx={{ textTransform: "none" }}>
        {t("logout")}
      </Button>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button
        variant='secondary'
        component={RouterLink}
        to={loginTo}
        sx={{ textTransform: "none" }}
      >
        {t("login")}
      </Button>
      <Button
        variant='primary'
        component={RouterLink}
        to='/signup'
        sx={{ textTransform: "none" }}
      >
        {t("signup")}
      </Button>
    </Box>
  );
};
