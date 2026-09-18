import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme/tokens";

const LANGS = [
  { code: "uk", label: "UA" },
  { code: "en", label: "EN" },
] as const;

type LanguageSwitcherProps = {
  /** Dark charcoal panel (login/signup) vs light page chrome */
  variant?: "light" | "dark";
};

export const LanguageSwitcher = ({ variant = "light" }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const active = (i18n.resolvedLanguage || i18n.language || "uk").startsWith("en")
    ? "en"
    : "uk";

  const setLang = (code: string) => {
    void i18n.changeLanguage(code);
    localStorage.setItem("lng", code);
    document.documentElement.lang = code;
  };

  const isDark = variant === "dark";

  return (
    <Box
      role='group'
      aria-label='Language'
      sx={{
        display: "inline-flex",
        gap: "4px",
        p: "3px",
        borderRadius: tokens.radius.sm,
        bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(30,30,30,0.08)",
        flex: "0 0 auto",
      }}
    >
      {LANGS.map((lang) => {
        const selected = active === lang.code;
        return (
          <Button
            key={lang.code}
            type='button'
            onClick={() => setLang(lang.code)}
            aria-pressed={selected}
            sx={{
              minWidth: 40,
              px: 1.25,
              py: 0.5,
              borderRadius: "8px",
              textTransform: "none",
              bgcolor: selected
                ? isDark
                  ? tokens.color.page
                  : tokens.color.action
                : "transparent",
              color: selected
                ? isDark
                  ? tokens.color.ink
                  : tokens.color.inkInverse
                : isDark
                  ? "rgba(255,255,255,0.65)"
                  : tokens.color.inkMuted,
              "&:hover": {
                bgcolor: selected
                  ? isDark
                    ? tokens.color.page
                    : tokens.color.actionHover
                  : isDark
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(30,30,30,0.12)",
              },
            }}
          >
            <Typography variant='caption' sx={{ fontWeight: 700, letterSpacing: "0.04em" }}>
              {lang.label}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};
