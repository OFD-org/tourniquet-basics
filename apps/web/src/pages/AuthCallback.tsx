import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Loader } from "../components/Loader/Loader";

export const AuthCallback = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/", { replace: true });
        } else {
            setError("Не вдалося отримати токен від Google. Спробуйте ще раз.");
        }
    }, [navigate]);

    if (error) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: ({ palette }) => palette.primary.main,
                    gap: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: ({ palette }) => palette.common.white, textAlign: "center", px: 3 }}
                >
                    {error}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: ({ palette }) => palette.primary.main,
                        cursor: "pointer",
                        textDecoration: "underline",
                    }}
                    onClick={() => navigate("/login", { replace: true })}
                >
                    Повернутися до входу
                </Typography>
            </Box>
        );
    }

    return <Loader fullScreen />;
};
