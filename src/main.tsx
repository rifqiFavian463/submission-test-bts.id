import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { AppRouter } from "@/routes/AppRouter";

import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <AppRouter />
          <Toaster position="top-right" />
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

