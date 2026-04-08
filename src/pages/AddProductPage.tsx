import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import type { Category } from "@/api/categories";
import { getCategories } from "@/api/categories";
import { createProduct } from "@/api/products";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useProducts } from "@/hooks/useProducts";

const schema = z.object({
  title: z.string().min(1, "title wajib diisi").max(150, "maksimal 150 karakter"),
  price: z
    .string()
    .min(1, "price wajib diisi")
    .refine((v) => !Number.isNaN(Number(v)), "price wajib number"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "categoryId wajib diisi"),
  images: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function AddProductPage() {
  const navigate = useNavigate();
  const { prependProduct, setSkipNextFetchFor } = useProducts();

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setIsLoadingCategories(true);
        const data = await getCategories();
        if (!cancelled) setCategories(data);
      } catch {
        toast.error("Gagal memuat categories.");
      } finally {
        if (!cancelled) setIsLoadingCategories(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const defaultCategoryId = useMemo(() => categories[0]?.id, [categories]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: "",
    },
  });

  useEffect(() => {
    if (defaultCategoryId) {
      setValue("categoryId", String(defaultCategoryId), { shouldValidate: true });
    }
  }, [defaultCategoryId, setValue]);

  return (
    <div className="min-h-dvh p-6">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Add Product</h1>
          <p className="text-sm text-slate-600">
            Tambah product baru, lalu kembali ke halaman products.
          </p>
        </header>

        <form
          className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          onSubmit={handleSubmit(async (values) => {
            try {
              const images = values.images
                ? values.images
                    .split(",")
                    .map((s: string) => s.trim())
                    .filter(Boolean)
                : [];

              const created = await createProduct({
                title: values.title,
                price: Number(values.price),
                description: values.description,
                categoryId: Number(values.categoryId),
                images: images.length ? images : undefined,
              });

              prependProduct(created);
              setSkipNextFetchFor({ title: "", page: 1 });

              toast.success("Product berhasil dibuat");
              navigate("/products", { replace: true });
            } catch {
              toast.error("Gagal membuat product.");
            }
          })}
        >
          <TextField
            label="Title"
            placeholder="Product title"
            maxLength={150}
            {...register("title")}
            error={errors.title?.message}
          />

          <TextField
            label="Price"
            type="number"
            inputMode="decimal"
            step="1"
            placeholder="100"
            {...register("price")}
            error={errors.price?.message}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700" htmlFor="description">
              Description (optional)
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="Description..."
              {...register("description")}
            />
            {errors.description?.message ? (
              <p className="text-xs text-red-600">{errors.description.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700" htmlFor="categoryId">
              Category
            </label>
            <select
              id="categoryId"
              className="w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 transition focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-60"
              disabled={isLoadingCategories || categories.length === 0}
              {...register("categoryId")}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId?.message ? (
              <p className="text-xs text-red-600">{errors.categoryId.message}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700" htmlFor="images">
              Images (optional)
            </label>
            <input
              id="images"
              className="w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="https://... , https://..."
              {...register("images")}
            />
            <p className="text-xs text-slate-500">Pisahkan URL dengan koma.</p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/products")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

