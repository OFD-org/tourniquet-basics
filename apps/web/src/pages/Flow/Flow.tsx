import { FC, useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../icons/ArrowRight";
import { useAuth } from "../../hooks/useAuth";
import { usePoll } from "../../hooks/usePoll";
import { Link as RouterLink, useSearchParams, useNavigate } from "react-router-dom";

export const Flow: FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
      currentQuestion,
      step,
      totalSteps,
      isCompleted,
      error,
      startOrResume,
      submitAnswer,
  } = usePoll();

  // If there's a ?resume=true param, it means user just came back from login
  const shouldResume = searchParams.get("resume") === "true";
  
  const [isIntro, setIsIntro] = useState(!shouldResume);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  useEffect(() => {
      // Auto-start poll if returning from login
      if (shouldResume && isAuthenticated) {
          startOrResume();
          // Remove the query param from URL
          navigate("/flow", { replace: true });
      }
  }, [shouldResume, isAuthenticated, startOrResume, navigate]);

  const handleStartPoll = () => {
      if (!isAuthenticated) {
          setShowLoginPrompt(true);
          return;
      }
      setShowLoginPrompt(false);
      setIsIntro(false);
      startOrResume();
  };

  const handleAnswerChange = (value: string, type: string) => {
      if (type === 'single' || type === 'text') {
          setSelectedAnswers([value]);
      } else {
          setSelectedAnswers(prev => 
              prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
          );
      }
  };

  const handleNextSubmit = () => {
      const payload = currentQuestion?.type === 'multiple' 
          ? selectedAnswers 
          : selectedAnswers[0] || "";
          
      submitAnswer(payload);
      setSelectedAnswers([]);
  };

  if (isIntro) {
      return (
          <Box>
            <Typography variant='h5' mb={3}>
              {t("wounds.evaluationTitle")}
            </Typography>
            {Array.from({ length: 5 }).map((_, index) => (
              <Box key={index} display='flex' alignItems='center' mb={2}>
                <Typography variant='body1'>{t(`wounds.evaluation.${index}`)}</Typography>
                {index === 4 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 2 }}>
                    <Button onClick={handleStartPoll} sx={{ p: '12px 24px', background: 'rgba(255,255,255,0.1)' }}>
                        Почати тест
                    </Button>

                    {showLoginPrompt && (
                        <Box sx={{ 
                            p: 2, 
                            border: '1px solid rgba(244, 67, 54, 0.5)', 
                            borderRadius: '8px', 
                            background: 'rgba(244, 67, 54, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Typography variant="body2" color="#ffb4ab">
                                Для проходження тесту необхідно увійти.
                            </Typography>
                            <Button 
                                component={RouterLink} 
                                to="/login?redirect=/flow?resume=true" 
                                variant="outlined" 
                                size="small"
                                sx={{ borderColor: '#ffb4ab', color: '#ffb4ab' }}
                            >
                                Увійти
                            </Button>
                        </Box>
                    )}
                  </Box>
                ) : (
                  <ArrowRight />
                )}
              </Box>
            ))}
          </Box>
      );
  }

  if (isCompleted) {
      return (
          <Box sx={{ p: 4, textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <Typography variant="h4" mb={2}>Тест завершено</Typography>
              <Typography variant="body1">Дякуємо за ваші відповіді!</Typography>
              <Button component={RouterLink} to="/" sx={{ mt: 4, background: 'rgba(255,255,255,0.1)', p: 2 }}>
                  Повернутися на головну
              </Button>
          </Box>
      );
  }

  // Poll flow UI
  return (
      <Box sx={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', p: 4 }}>
          {error && (
              <Box sx={{ mb: 4, p: 2, background: 'rgba(244, 67, 54, 0.1)', border: '1px solid rgba(244, 67, 54, 0.5)', borderRadius: '8px' }}>
                  <Typography color="#ffb4ab">{error}</Typography>
                  <Button onClick={() => window.location.reload()} sx={{ mt: 2, color: '#ffb4ab' }}>Спробувати ще раз</Button>
              </Box>
          )}

          {!currentQuestion && !error ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
          ) : currentQuestion && (
              <>
                  <Typography variant="overline" color="rgba(255,255,255,0.6)" mb={1} display="block">
                      Питання {step} з {totalSteps}
                  </Typography>
                  
                  <Typography variant='h5' mb={2}>
                      {currentQuestion.title}
                  </Typography>
                  
                  {currentQuestion.description && (
                      <Typography variant="body1" mb={4} color="rgba(255,255,255,0.8)">
                          {currentQuestion.description}
                      </Typography>
                  )}

                  {currentQuestion.mediaUrl && (
                      <Box mb={4} sx={{ textAlign: 'center' }}>
                          <img src={currentQuestion.mediaUrl} alt="Ілюстрація" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
                      </Box>
                  )}

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                      {currentQuestion.options?.map(opt => {
                          const isSelected = selectedAnswers.includes(opt.value);
                          return (
                              <Button 
                                  key={opt.value}
                                  variant="outlined"
                                  onClick={() => handleAnswerChange(opt.value, currentQuestion.type)}
                                  sx={{ 
                                      justifyContent: 'flex-start', 
                                      textAlign: 'left', 
                                      p: '16px 24px',
                                      borderColor: isSelected ? 'rgba(189, 198, 133, 1)' : 'rgba(255,255,255,0.2)',
                                      background: isSelected ? 'rgba(189, 198, 133, 0.1)' : 'transparent',
                                      color: isSelected ? 'rgba(189, 198, 133, 1)' : 'inherit',
                                      '&:hover': {
                                          borderColor: 'rgba(189, 198, 133, 0.8)',
                                          background: 'rgba(189, 198, 133, 0.05)'
                                      }
                                  }}
                              >
                                  {opt.label}
                              </Button>
                          );
                      })}

                      {currentQuestion.type === 'text' && (
                          <TextField
                              multiline
                              minRows={4}
                              fullWidth
                              placeholder="Ваша відповідь..."
                              value={selectedAnswers[0] || ""}
                              onChange={(e) => handleAnswerChange(e.target.value, 'text')}
                              sx={{
                                  '& .MuiOutlinedInput-root': {
                                      color: 'white',
                                      background: 'rgba(255,255,255,0.05)',
                                      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                      '&:hover fieldset': { borderColor: 'rgba(189, 198, 133, 0.5)' },
                                      '&.Mui-focused fieldset': { borderColor: 'rgba(189, 198, 133, 1)' }
                                  }
                              }}
                          />
                      )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                      <Button 
                          onClick={handleNextSubmit}
                          disabled={selectedAnswers.length === 0}
                          sx={{ 
                              p: '12px 32px', 
                              background: selectedAnswers.length > 0 ? 'rgba(189, 198, 133, 1)' : 'rgba(255,255,255,0.1)',
                              color: selectedAnswers.length > 0 ? '#111' : 'rgba(255,255,255,0.3)',
                              fontWeight: 600,
                              '&:hover': { background: 'rgba(189, 198, 133, 0.9)' }
                          }}
                      >
                          Далі
                      </Button>
                  </Box>
              </>
          )}
      </Box>
  );
};
