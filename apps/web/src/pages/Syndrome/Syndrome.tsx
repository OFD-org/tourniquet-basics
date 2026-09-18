import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CustomList } from "../components/ui-kit/CustomList";
import { pageChrome } from "../../theme/tokens";

export const Syndrome: FC = () => {
  const { t } = useTranslation();

  return (
    <Box className='page-enter' sx={pageChrome.stack}>
      <Typography variant='overline' sx={pageChrome.title}>
        {t("syndrome.title")}
      </Typography>

      <Box
        sx={{
          flex: 1,
          ...pageChrome.surface,
        }}
      >
        <Typography>
          {t("syndrome.title")}{" "}
          <Typography variant='body2' sx={{ display: "inline" }}>
            {t("syndrome.description")}
          </Typography>
        </Typography>

        <Typography variant='body1' sx={{ mt: 1 }}>
          {t("syndrome.manifestationsTitle")}
        </Typography>

        <CustomList
          items={[
            <Typography variant='body2'>{t("syndrome.manifestations.0")}</Typography>,
            <Typography variant='body2'>{t("syndrome.manifestations.1")}</Typography>,
            <Typography variant='body2'>{t("syndrome.manifestations.2")}</Typography>,
            <Typography variant='body2'>{t("syndrome.manifestations.3")}</Typography>,
          ]}
        />

        <Typography variant='body1' sx={{ mt: 1 }}>
          {t("syndrome.consequencesTitle")}
        </Typography>
        <Typography variant='body2'>{t("syndrome.consequencesDescr")}</Typography>
        <CustomList
          items={[
            <Typography variant='body2'>{t("syndrome.consequences.0")}</Typography>,
            <Typography variant='body2'>{t("syndrome.consequences.1")}</Typography>,
            <Typography variant='body2'>{t("syndrome.consequences.2")}</Typography>,
            <Typography variant='body2'>{t("syndrome.consequences.3")}</Typography>,
            <Typography variant='body2'>{t("syndrome.consequences.4")}</Typography>,
            <Typography variant='body2'>{t("syndrome.consequences.5")}</Typography>,
            <Typography variant='body2'>{t("syndrome.consequences.6")}</Typography>,
          ]}
        />
        <Typography sx={{ mt: 1 }}>{t("syndrome.consequenceNote")}</Typography>
      </Box>
    </Box>
  );
};
