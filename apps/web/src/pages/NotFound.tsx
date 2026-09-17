import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: ({ palette }) => palette.primary.main,
                padding: "40px 20px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "480px",
                    background: ({ palette }) => palette.secondary.main,
                    borderRadius: "12px",
                    padding: { xs: "40px 24px", sm: "60px 48px" },
                    textAlign: "center",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "96px",
                        fontWeight: 800,
                        lineHeight: 1,
                        color: ({ palette }) => palette.primary.main,
                        mb: 2,
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        color: ({ palette }) => palette.common.white,
                        mb: 1,
                        fontWeight: 700,
                    }}
                >
                    Сторінку не знайдено
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: "rgba(255, 255, 255, 0.6)",
                        mb: 4,
                    }}
                >
                    Схоже, ця адреса не існує або була переміщена.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => navigate(-1)}
                        sx={{
                            padding: "16px",
                            fontSize: "16px",
                            fontWeight: 600,
                        }}
                    >
                        ← Назад
                    </Button>

                    <Button
                        fullWidth
                        onClick={() => navigate("/")}
                        sx={{
                            padding: "14px",
                            fontSize: "15px",
                            fontWeight: 600,
                            backgroundColor: "transparent",
                            color: "rgba(255,255,255,0.7)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.4)",
                            },
                        }}
                    >
                        На головну
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
