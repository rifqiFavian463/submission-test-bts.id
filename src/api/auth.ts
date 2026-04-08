import { http } from "@/api/http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>("/auth/login", request);
  return data;
}

