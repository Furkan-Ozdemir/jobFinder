import { createRoot } from "react-dom/client";

import "./index.css";

import AppRoutes from "./AppRoutes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, Zoom } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
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
  </Provider>
);
