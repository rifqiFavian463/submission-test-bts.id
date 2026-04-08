import { http } from "@/api/http";

export type ProductCategory = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ProductCategory;
};

export type GetProductsParams = {
  title?: string;
  limit?: number;
  offset?: number;
};

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  const { data } = await http.get<Product[]>("/products", { params });
  return data;
}

export type CreateProductRequest = {
  title: string;
  price: number;
  description?: string;
  categoryId: number;
  images?: string[];
};

export async function createProduct(request: CreateProductRequest): Promise<Product> {
  const { data } = await http.post<Product>("/products", request);
  return data;
}

