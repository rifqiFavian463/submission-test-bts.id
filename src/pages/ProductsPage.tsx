import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { getProducts } from "@/api/products";
import { Button } from "@/components/Button";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProducts } from "@/hooks/useProducts";

export function ProductsPage() {
  const { items, setItems, consumeSkipIfMatches } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, 500);
  const title = debouncedQuery.trim();

  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [title]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setErrorMessage(null);
        const paramsToCheck = { title, page };
        if (consumeSkipIfMatches(paramsToCheck)) {
          setIsLoading(false);
          setHasNext(items.length === 10);
          return;
        }

        setIsLoading(true);
        const limit = 10;
        const offset = (page - 1) * limit;

        const data = await getProducts({
          ...(title ? { title } : {}),
          limit,
          offset,
        });
        if (!cancelled) setItems(data);
        if (!cancelled) setHasNext(data.length === limit);
      } catch {
        toast.error("Gagal memuat products.");
        if (!cancelled) setErrorMessage("Gagal memuat products. Coba lagi.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [consumeSkipIfMatches, items.length, page, reloadKey, setItems, title]);

  const grid = useMemo(() => {
    return items.map((p) => {
      return <ProductCard key={p.id} product={p} />;
    });
  }, [items]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Products</h1>
          <p className="text-sm text-slate-600">Daftar produk dari API.</p>
        </div>
        <div className="flex flex-1 items-center gap-2 sm:justify-end">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      {errorMessage ? (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-700">{errorMessage}</p>
          <div className="mt-3">
            <Button variant="secondary" onClick={() => setReloadKey((k) => k + 1)}>
              Retry
            </Button>
          </div>
        </div>
      ) : null}

        {isLoading ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
              >
                <div className="aspect-[4/3] w-full animate-pulse bg-slate-200" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </section>
        ) : (
          <div className="space-y-4">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {grid}
            </section>

            <Pagination
              page={page}
              hasNext={hasNext}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => p + 1)}
            />
          </div>
        )}
    </div>
  );
}

