import { http } from "@/api/http";

export type Category = {
  id: number;
  name: string;
  image: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data } = await http.get<Category[]>("/categories");
  return data;
}

