import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomList } from "../components/ui-kit/CustomList";
import { StepNavActions } from "../components/ui-kit/StepNavActions";
import { pageChrome } from "../../theme/tokens";

export const Conversion = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);

  return (
    <Box className='page-enter' sx={pageChrome.stack}>
      <Typography variant='overline' sx={pageChrome.title}>
        {t("conversion.title")}
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
            <Typography variant='body2'>{t("conversion.intro")}</Typography>

            <Typography variant='body1' sx={{ mt: 2 }}>
              {t("conversion.risks.0.title")}
            </Typography>
            <Typography variant='body2' sx={{ mt: 0.5 }}>
              {t("conversion.risks.0.text")}
            </Typography>

            <Typography variant='body1' sx={{ mt: 2 }}>
              {t("conversion.risks.1.title")}
            </Typography>
            <CustomList
              items={[
                <Typography variant='body2'>{t("conversion.risks.1.items.0")}</Typography>,
                <Typography variant='body2'>{t("conversion.risks.1.items.1")}</Typography>,
              ]}
            />

            <Typography variant='body1' sx={{ mt: 1 }}>
              {t("conversion.risks.2.title")}
            </Typography>
            <CustomList
              items={[
                <Typography variant='body2'>{t("conversion.risks.2.items.0")}</Typography>,
                <Typography variant='body2'>{t("conversion.risks.2.items.1")}</Typography>,
              ]}
            />

            <Typography variant='body1' sx={{ mt: 1 }}>
              {t("conversion.risks.3.title")}
            </Typography>
            <Typography variant='body2' sx={{ mt: 0.5 }}>
              {t("conversion.risks.3.text")}
            </Typography>

            <StepNavActions onNext={() => setStep(1)} />
          </>
        )}

        {step === 1 && (
          <>
            <Typography variant='body1'>{t("conversion.algorithm.title")}</Typography>
            <CustomList
              type='number'
              items={[
                <Typography variant='body2'>{t("conversion.algorithm.steps.0")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.1")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.2")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.3")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.4")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.5")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.6")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.7")}</Typography>,
                <Typography variant='body2'>{t("conversion.algorithm.steps.8")}</Typography>,
              ]}
            />
            <Typography sx={{ mt: 1 }}>{t("conversion.algorithm.note")}</Typography>

            <StepNavActions onBack={() => setStep(0)} />
          </>
        )}
      </Box>
    </Box>
  );
};
