import React, { createContext, useCallback, useMemo, useState } from "react";

import * as authApi from "@/api/auth";
import { clearAccessToken, getAccessToken, setAccessToken } from "@/utils/storage";

export type AuthContextValue = {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (params: { username: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setTokenState] = useState<string | null>(() =>
    getAccessToken(),
  );

  const logout = useCallback(() => {
    clearAccessToken();
    setTokenState(null);
  }, []);

  const login = useCallback(
    async (params: { username: string; password: string }) => {
      // Requirement mapping: username -> email
      const result = await authApi.login({
        email: params.username,
        password: params.password,
      });

      setAccessToken(result.access_token);
      setTokenState(result.access_token);
    },
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isAuthenticated: Boolean(accessToken),
      login,
      logout,
    }),
    [accessToken, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

