import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./i18n";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
