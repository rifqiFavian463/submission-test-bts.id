import type { Product } from "@/api/products";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const image =
    product.images?.[0] || "https://placehold.co/600x400/png?text=No+Image";

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="aspect-[4/3] w-full bg-slate-100">
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/600x400/png?text=No+Image";
          }}
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-slate-500">
          {product.category?.name}
        </p>
        <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
          {product.title}
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-900">${product.price}</p>
      </div>
    </article>
  );
}

