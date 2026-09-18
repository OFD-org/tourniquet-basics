import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CustomList } from "../components/ui-kit/CustomList";
import { pageChrome } from "../../theme/tokens";

export const Wounds: FC = () => {
  const { t } = useTranslation();

  return (
    <Box className='page-enter' sx={pageChrome.stack}>
      <Typography variant='overline' sx={pageChrome.title}>
        {t("wounds.title")}
      </Typography>

      <Box
        sx={{
          flex: 1,
          ...pageChrome.surface,
        }}
      >
        <Typography>
          {t("wounds.term")}{" "}
          <Typography variant='body2' sx={{ display: "inline" }}>
            {t("wounds.definition")}
          </Typography>
        </Typography>

        <Typography variant='body1' sx={{ mt: 1.5 }}>
          {t("wounds.searchTitle")}
        </Typography>
        <Typography variant='body2'>{t("wounds.visualInspection")}</Typography>

        <Typography variant='body1' sx={{ mt: 1.5 }}>
          {t("wounds.necessityTitle")}
        </Typography>
        <Typography variant='body2'>{t("wounds.necessityCheck")}</Typography>

        <Typography variant='body2' sx={{ mt: 1.5 }}>
          {t("wounds.evaluationTitle")}
        </Typography>
        <CustomList
          items={[
            <Typography variant='body2'>{t("wounds.evaluation.0")}</Typography>,
            <Typography variant='body2'>{t("wounds.evaluation.1")}</Typography>,
            <Typography variant='body2'>{t("wounds.evaluation.2")}</Typography>,
            <Typography variant='body2'>{t("wounds.evaluation.3")}</Typography>,
            <Typography variant='body2'>{t("wounds.evaluation.4")}</Typography>,
            <Typography variant='body2'>{t("wounds.evaluation.5")}</Typography>,
            <Typography variant='body2'>{t("wounds.evaluation.6")}</Typography>,
          ]}
        />

        <Typography variant='subtitle2' sx={{ maxWidth: "850px" }}>
          {t("wounds.removalInstruction")}
        </Typography>

        <Typography variant='body2' sx={{ mt: 1.5, maxWidth: "1250px" }}>
          {t("wounds.generalNote")}
        </Typography>
      </Box>
    </Box>
  );
};
