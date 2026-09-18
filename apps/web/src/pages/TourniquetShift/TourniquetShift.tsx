import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CustomList } from "../components/ui-kit/CustomList";
import { StepNavActions } from "../components/ui-kit/StepNavActions";
import { pageChrome } from "../../theme/tokens";

export const TourniquetShift = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  return (
    <Box className='page-enter' sx={pageChrome.stack}>
      <Typography variant='overline' sx={pageChrome.title}>
        {t("tourniquetShift.title.highlight1")} {t("tourniquetShift.title.rest")}{" "}
        {t("tourniquetShift.title.highlight2")}
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          ...pageChrome.surface,
        }}
      >
        {step === 0 && (
          <>
            <Typography variant='body2'>{t("tourniquetShift.intro.description")}</Typography>

            <Typography variant='body1' sx={{ mt: 1 }}>
              {t("tourniquetShift.intro.indications.title")}
            </Typography>
            <CustomList
              items={[
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.indications.list.0")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.indications.list.1")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.indications.list.2")}
                </Typography>,
              ]}
            />

            <Typography variant='body1' sx={{ mt: 1 }}>
              {t("tourniquetShift.intro.contraindications.title")}
            </Typography>
            <CustomList
              items={[
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.contraindications.list.0")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.contraindications.list.1")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.contraindications.list.2")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.contraindications.list.3")}
                </Typography>,
              ]}
            />

            <Typography variant='body1' sx={{ mt: 1 }}>
              {t("tourniquetShift.intro.keyPoints.title")}
            </Typography>
            <CustomList
              type='number'
              items={[
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.keyPoints.list.0")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.keyPoints.list.1")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.keyPoints.list.2")}
                </Typography>,
                <Typography variant='body2'>
                  {t("tourniquetShift.intro.keyPoints.list.3")}
                </Typography>,
              ]}
            />

            <StepNavActions onNext={() => setStep(1)} />
          </>
        )}

        {step === 1 && (
          <>
            <Typography variant='body1'>{t("tourniquetShift.algorithm.title")}</Typography>
            <CustomList
              type='number'
              items={[
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.0")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.1")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.2")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.3")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.4")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.5")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.6")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.7")}</Typography>,
                <Typography variant='body2'>{t("tourniquetShift.algorithm.steps.8")}</Typography>,
              ]}
            />

            <Typography sx={{ mt: 1 }}>{t("tourniquetShift.algorithm.note")}</Typography>

            <StepNavActions onBack={() => setStep(0)} />
          </>
        )}
      </Box>
    </Box>
  );
};
