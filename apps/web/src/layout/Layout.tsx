import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <Box
      sx={{
        maxWidth: "1440px",
        margin: "0 auto",
        padding: 0,
      }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
    </Box>
  );
};
