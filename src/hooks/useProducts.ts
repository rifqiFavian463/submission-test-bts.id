import { useContext } from "react";

import { ProductsContext } from "@/context/ProductsContext";

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within ProductsProvider");
  }
  return ctx;
}

