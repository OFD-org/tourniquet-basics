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
          Навчальний алгоритм базується на відкритих настановах CoTCCC / TCCC та
          матеріалах, поширюваних для підготовки в Україні. Це не заміна офіційного
          курсу чи клінічного протоколу вашої служби.
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, color: tokens.color.inkMuted, lineHeight: 1.5 }}>
          Перевіряйте дату редакції документа перед використанням у полі. За
          розбіжностей пріоритет мають чинні настанови вашого командування / МОЗ /
          CoTCCC.
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
              {source.note && (
                <Typography variant='body2' sx={{ color: tokens.color.inkMuted, mt: 0.5, lineHeight: 1.4 }}>
                  {source.note}
                </Typography>
              )}
            </ListItem>
          ))}
        </List>

        <Typography variant='h5' sx={{ mt: 4, mb: 1 }}>
          Фотоілюстрації в алгоритмі
        </Typography>
        <Typography variant='body2' sx={{ mb: 2, color: tokens.color.inkMuted, lineHeight: 1.5 }}>
          Зображення — публічні навчальні / службові фото (U.S. government works на
          Wikimedia Commons). Вони показують техніку накладання турнікета в тренуванні;
          реальні бойові поранення можуть виглядати інакше й важче.
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
