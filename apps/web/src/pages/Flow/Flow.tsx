import { FC, useEffect, useRef } from "react";
import { Box, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { Link as RouterLink, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePoll } from "../../hooks/usePoll";
import { FlowPageShell } from "../components/ui-kit/FlowPageShell";
import { FlowAccordion } from "../components/ui-kit/FlowAccordion";
import { YesNoChoice } from "../components/ui-kit/YesNoChoice";
import { StepNavActions } from "../components/ui-kit/StepNavActions";
import { tokens } from "../../theme/tokens";
import { useFlowNavBridge } from "../../layout/Layout";

const FLOW_TITLE = "Алгоритм для конверсії та переміщення турнікету";

export const Flow: FC = () => {
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
    completionMessage,
    error,
    loading,
    canGoBack,
    startOrResume,
    submitAnswer,
    goBack,
    setError,
  } = usePoll();

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

  if (isCompleted) {
    return (
      <FlowPageShell title={FLOW_TITLE}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Алгоритм завершено
        </Typography>
        <Typography variant='body2' sx={{ mb: 3, lineHeight: 1.5 }}>
          {completionMessage ||
            "Відповіді збережено. Слідкуйте за пульсом, диханням і свідомістю постраждалого."}
        </Typography>
        <Button variant='secondary' component={RouterLink} to='/'>
          На головну
        </Button>
      </FlowPageShell>
    );
  }

  const shellTitle = FLOW_TITLE;
  const progressLabel = currentNode
    ? `Крок ${step}${totalSteps ? ` з ~${totalSteps}` : ""} · ${currentNode.label}`
    : undefined;

  const renderBody = () => {
    if (!currentNode) {
      return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress sx={{ color: tokens.color.ink }} />
        </Box>
      );
    }

    switch (currentNode.kind) {
      case "intro_accordion":
      case "instruction_list":
        return (
          <>
            {currentNode.title && currentNode.kind === "instruction_list" && (
              <Typography variant='body1'>{currentNode.title}</Typography>
            )}
            <FlowAccordion
              key={currentNode.id}
              items={(currentNode.items || []).map((item, i) => ({
                ...item,
                defaultExpanded: item.defaultExpanded ?? i === 0,
              }))}
            />
            <Box sx={{ mt: "auto", pt: 2 }}>
              <StepNavActions onNext={() => submitAnswer("ack")} nextLabel='Далі' />
            </Box>
          </>
        );

      case "yes_no":
        return (
          <>
            <Typography variant='h3' sx={{ lineHeight: 1.3 }}>
              {currentNode.title}
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
            {currentNode.title && (
              <Typography variant='h3'>{currentNode.title}</Typography>
            )}
            <Typography variant='body2' sx={{ lineHeight: 1.55 }}>
              {currentNode.body}
            </Typography>
            {currentNode.mediaUrl && (
              <Box
                component='img'
                src={currentNode.mediaUrl}
                alt={currentNode.title || currentNode.label}
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
              <StepNavActions onNext={() => submitAnswer("ack")} nextLabel='Далі' />
            </Box>
          </>
        );

      case "success":
        return (
          <>
            <Typography variant='h3' sx={{ color: tokens.color.ink }}>
              {currentNode.title}
            </Typography>
            <Typography variant='body2' sx={{ lineHeight: 1.55 }}>
              {currentNode.body}
            </Typography>
            <Box sx={{ mt: "auto", pt: 2 }}>
              <StepNavActions
                onNext={() => submitAnswer("ack")}
                nextLabel='Завершити'
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
      title={shellTitle}
      progressLabel={progressLabel}
      busy={loading && Boolean(currentNode)}
      footer={null}
    >
      {error && !currentNode && (
        <Alert
          severity='error'
          action={
            <Button color='inherit' size='small' onClick={() => startOrResume()}>
              Ще раз
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
