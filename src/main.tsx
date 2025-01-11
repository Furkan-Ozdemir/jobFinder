import { createRoot } from "react-dom/client";

import "./index.css";

import AppRoutes from "./AppRoutes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Zoom } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      draggable
      theme="dark"
      transition={Zoom}
      style={{ fontSize: "1.4rem", fontFamily: "Montserrat" }}
    />
  </QueryClientProvider>
);
