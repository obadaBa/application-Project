import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, LayoutGroup } from "framer-motion";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <LayoutGroup>
          <AnimatePresence mode="wait">
            <RouterProvider router={router} />
          </AnimatePresence>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            rtl
            pauseOnHover
            closeOnClick
          />
        </LayoutGroup>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
