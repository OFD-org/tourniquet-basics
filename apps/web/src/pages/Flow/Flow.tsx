import { FC, useEffect, useMemo, useRef } from "react";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { Link as RouterLink, useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { usePoll } from "../../hooks/usePoll";
import { FlowPageShell } from "../components/ui-kit/FlowPageShell";
import { FlowAccordion } from "../components/ui-kit/FlowAccordion";
import { YesNoChoice } from "../components/ui-kit/YesNoChoice";
import { StepNavActions } from "../components/ui-kit/StepNavActions";
import { tokens } from "../../theme/tokens";
import { useFlowNavBridge } from "../../layout/Layout";
import { localizeFlowNode } from "../../i18n/localizeFlowNode";

export const Flow: FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shouldResume = searchParams.get("resume") === "true";
  const { register } = useFlowNavBridge();
  const startedRef = useRef(false);

  const {
    currentNode,
    step,
    totalSteps,
    isCompleted,
    error,
    loading,
    canGoBack,
    startOrResume,
    submitAnswer,
    goBack,
    setError,
  } = usePoll();

  const localizedNode = useMemo(
    () => localizeFlowNode(currentNode),
    // Re-localize when language changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNode, i18n.language]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent("/flow?resume=true")}`, {
        replace: true,
      });
      return;
    }
    if (startedRef.current) return;
    startedRef.current = true;
    startOrResume().then(() => {
      if (shouldResume) {
        navigate("/flow", { replace: true });
      }
    });
  }, [isAuthenticated, startOrResume, navigate, shouldResume]);

  useEffect(() => {
    register({
      onBack: canGoBack ? goBack : undefined,
      canGoBack,
    });
  }, [register, canGoBack, goBack]);

  useEffect(() => {
    return () => register({});
  }, [register]);

  if (!isAuthenticated) {
    return null;
  }

  const flowTitle = t("algorithm");

  if (isCompleted) {
    return (
      <FlowPageShell title={flowTitle}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          {t("flowUi.completedTitle")}
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, lineHeight: 1.5 }}>
          {t("flowUi.completedDefault")}
        </Typography>
        <Button variant='secondary' component={RouterLink} to='/'>
          {t("home")}
        </Button>
      </FlowPageShell>
    );
  }

  const progressLabel = localizedNode
    ? totalSteps
      ? `${t("flowUi.stepOf", { step, total: totalSteps })} · ${localizedNode.label}`
      : `${t("flowUi.step", { step })} · ${localizedNode.label}`
    : undefined;

  const renderBody = () => {
    if (!localizedNode) {
      return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress sx={{ color: tokens.color.ink }} />
        </Box>
      );
    }

    switch (localizedNode.kind) {
      case "intro_accordion":
      case "instruction_list":
        return (
          <>
            {localizedNode.title && localizedNode.kind === "instruction_list" && (
              <Typography variant='body1'>{localizedNode.title}</Typography>
            )}
            <FlowAccordion
              key={localizedNode.id}
              items={(localizedNode.items || []).map((item, i) => ({
                ...item,
                defaultExpanded: item.defaultExpanded ?? i === 0,
              }))}
            />
            <Box sx={{ mt: "auto", pt: 2 }}>
              <StepNavActions onNext={() => submitAnswer("ack")} nextLabel={t("next")} />
            </Box>
          </>
        );

      case "yes_no":
        return (
          <>
            <Typography variant='h3' sx={{ lineHeight: 1.3 }}>
              {localizedNode.title}
            </Typography>
            <YesNoChoice
              disabled={loading}
              onChange={(value) => submitAnswer(value)}
            />
            {error && (
              <Alert severity='error' onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
          </>
        );

      case "instruction":
      case "outcome":
        return (
          <>
            {localizedNode.title && (
              <Typography variant='h3'>{localizedNode.title}</Typography>
            )}
            <Typography variant='body2' sx={{ lineHeight: 1.55 }}>
              {localizedNode.body}
            </Typography>
            {localizedNode.mediaUrl && (
              <Box
                component='img'
                src={localizedNode.mediaUrl}
                alt={localizedNode.title || localizedNode.label}
                loading='lazy'
                sx={{
                  width: "100%",
                  maxHeight: 360,
                  objectFit: "cover",
                  borderRadius: tokens.radius.sm,
                  border: `1px solid ${tokens.color.border}`,
                }}
              />
            )}
            <Box sx={{ mt: "auto", pt: 2 }}>
              <StepNavActions onNext={() => submitAnswer("ack")} nextLabel={t("next")} />
            </Box>
          </>
        );

      case "success":
        return (
          <>
            <Typography variant='h3' sx={{ color: tokens.color.ink }}>
              {localizedNode.title}
            </Typography>
            <Typography variant='body2' sx={{ lineHeight: 1.55 }}>
              {localizedNode.body}
            </Typography>
            <Box sx={{ mt: "auto", pt: 2 }}>
              <StepNavActions
                onNext={() => submitAnswer("ack")}
                nextLabel={t("finish")}
              />
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <FlowPageShell
      title={flowTitle}
      progressLabel={progressLabel}
      busy={loading && Boolean(localizedNode)}
      footer={null}
    >
      {error && !localizedNode && (
        <Alert
          severity='error'
          action={
            <Button color='inherit' size='small' onClick={() => startOrResume()}>
              {t("retry")}
            </Button>
          }
        >
          {error}
        </Alert>
      )}
      {renderBody()}
    </FlowPageShell>
  );
};
