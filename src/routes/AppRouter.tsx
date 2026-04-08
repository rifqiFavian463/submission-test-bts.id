import { Navigate, Route, Routes } from "react-router-dom";

import { AppShell } from "@/components/AppShell";
import { AddProductPage } from "@/pages/AddProductPage";
import { LoginPage } from "@/pages/LoginPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}

