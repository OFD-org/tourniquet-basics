import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Suspense } from "react";
import "./global.css";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { theme } from "./theme";
import { Syndrome } from "./pages/Syndrome";
import { Wounds } from "./pages/Wounds";
import { Flow } from "./pages/Flow";
import { TourniquetShift } from "./pages/TourniquetShift";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthCallback } from "./pages/AuthCallback";
import { NotFound } from "./pages/NotFound";
import { GuestRoute } from "./components/GuestRoute";
import { GlobalLoader } from "./components/Loader/GlobalLoader";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalLoader />
      <Suspense fallback='Loading...'>

        <BrowserRouter>
          <Routes>
            {/* Guest-only routes: redirect to / if already logged in */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Google OAuth callback – no auth guard needed */}
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* All remaining routes are publicly accessible, auth handled per-component */}
            <Route
              path="/*"
              element={
                <Box
                  sx={{
                    maxWidth: "1440px",
                    margin: "0 auto",
                    padding: "40px",
                  }}
                >
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Layout />}>
                      <Route path="/flow" element={<Flow />} />
                      <Route path="/syndrome" element={<Syndrome />} />
                      <Route path="/wound" element={<Wounds />} />
                      <Route path="/shift" element={<TourniquetShift />} />
                    </Route>
                    {/* 404 inside protected area */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Box>
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
