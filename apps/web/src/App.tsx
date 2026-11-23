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
import { Conversion } from "./pages/Conversion";
import { Sources } from "./pages/Sources";
// Authentication disabled for the public tutorial: pages/Login.
// Authentication disabled for the public tutorial: pages/Signup.
// Authentication disabled for the public tutorial: pages/AuthCallback.
import { NotFound } from "./pages/NotFound";
// Authentication disabled for the public tutorial: components/GuestRoute.
import { GlobalLoader } from "./components/Loader/GlobalLoader";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalLoader />
      <Suspense fallback={<Box sx={{ p: 3 }}>Loading...</Box>}>

        <BrowserRouter>
          <Routes>
            {/* Account routes are disabled; all learning pages are public. */}
            <Route
              path="/*"
              element={
                <Box
                  sx={{
                    maxWidth: "1440px",
                    margin: "0 auto",
                    width: "100%",
                    px: { xs: "16px", sm: "24px", md: "40px" },
                    py: { xs: "16px", sm: "24px", md: "40px" },
                  }}
                >
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Layout />}>
                      <Route path="/flow" element={<Flow />} />
                      <Route path="/syndrome" element={<Syndrome />} />
                      <Route path="/wound" element={<Wounds />} />
                      <Route path="/shift" element={<TourniquetShift />} />
                      <Route path="/conversion" element={<Conversion />} />
                      <Route path="/sources" element={<Sources />} />
                    </Route>
                    {/* Unknown public route */}
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
