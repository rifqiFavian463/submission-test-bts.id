import React, { createContext, useCallback, useMemo, useRef, useState } from "react";

import type { Product } from "@/api/products";

export type ProductsParams = {
  title: string;
  page: number;
};

export type ProductsContextValue = {
  items: Product[];
  setItems: React.Dispatch<React.SetStateAction<Product[]>>;
  skipNextFetchFor: ProductsParams | null;
  setSkipNextFetchFor: (params: ProductsParams | null) => void;
  prependProduct: (product: Product) => void;
  consumeSkipIfMatches: (params: ProductsParams) => boolean;
};

export const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const skipRef = useRef<ProductsParams | null>(null);

  const setSkipNextFetchFor = useCallback((params: ProductsParams | null) => {
    skipRef.current = params;
  }, []);

  const consumeSkipIfMatches = useCallback((params: ProductsParams) => {
    const current = skipRef.current;
    if (!current) return false;
    const matches = current.page === params.page && current.title === params.title;
    if (matches) skipRef.current = null;
    return matches;
  }, []);

  const prependProduct = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [product, ...prev];
    });
  }, []);

  const value = useMemo<ProductsContextValue>(
    () => ({
      items,
      setItems,
      skipNextFetchFor: skipRef.current,
      setSkipNextFetchFor,
      prependProduct,
      consumeSkipIfMatches,
    }),
    [items, setSkipNextFetchFor, prependProduct, consumeSkipIfMatches],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

