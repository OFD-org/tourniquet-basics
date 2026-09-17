import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Box } from "@mui/material";

type FlowBackState = {
  onBack?: () => void;
  canGoBack?: boolean;
};

type FlowNavBridge = FlowBackState & {
  register: (value: FlowBackState) => void;
};

const FlowNavBridgeContext = createContext<FlowNavBridge>({
  register: () => undefined,
});

export const useFlowNavBridge = () => useContext(FlowNavBridgeContext);

export const Layout = () => {
  const [flowBack, setFlowBack] = useState<FlowBackState>({});

  const register = useCallback((value: FlowBackState) => {
    setFlowBack(value);
  }, []);

  const ctx = useMemo(
    () => ({
      ...flowBack,
      register,
    }),
    [flowBack, register]
  );

  return (
    <FlowNavBridgeContext.Provider value={ctx}>
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
    </FlowNavBridgeContext.Provider>
  );
};
