import { Box, Typography, Link as MuiLink, List, ListItem } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { SOURCES, IMAGE_CREDITS } from "../../constants/sources";
import { pageChrome, tokens } from "../../theme/tokens";

export const Sources: FC = () => {
  const { t } = useTranslation();

  return (
    <Box className='page-enter' sx={pageChrome.stack}>
      <Typography variant='overline' sx={pageChrome.title}>
        {t("source")}
      </Typography>

      <Box sx={pageChrome.surface}>
        <Typography variant='body1' sx={{ mb: 1, lineHeight: 1.4 }}>
          {t("sourcesPage.intro")}
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, color: tokens.color.inkMuted, lineHeight: 1.5 }}>
          {t("sourcesPage.disclaimer")}
        </Typography>

        <List sx={{ listStyleType: "decimal", pl: 3, py: 0 }}>
          {SOURCES.map((source) => (
            <ListItem
              key={source.id}
              sx={{ display: "list-item", flexDirection: "column", alignItems: "flex-start", py: 1.5 }}
            >
              <MuiLink
                href={source.url}
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  color: tokens.color.ink,
                  fontWeight: 700,
                  textDecoration: "underline",
                  lineHeight: 1.4,
                }}
              >
                {source.title}
              </MuiLink>
              <Typography variant='caption' sx={{ color: tokens.color.inkMuted, mt: 0.5, display: "block" }}>
                {source.org}
              </Typography>
              <Typography variant='body2' sx={{ color: tokens.color.inkMuted, mt: 0.5, lineHeight: 1.4 }}>
                {t(`sourcesPage.notes.${source.id}`)}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Typography variant='h5' sx={{ mt: 4, mb: 1 }}>
          {t("sourcesPage.photosTitle")}
        </Typography>
        <Typography variant='body2' sx={{ mb: 2, color: tokens.color.inkMuted, lineHeight: 1.5 }}>
          {t("sourcesPage.photosIntro")}
        </Typography>
        <List sx={{ listStyleType: "disc", pl: 3 }}>
          {IMAGE_CREDITS.map((item) => (
            <ListItem key={item.file} sx={{ display: "list-item", py: 0.5 }}>
              <Typography variant='body2' sx={{ lineHeight: 1.4 }}>
                <strong>{item.file}</strong> — {item.credit}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
