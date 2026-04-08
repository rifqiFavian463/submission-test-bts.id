import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  username: z.string().min(1, "username wajib diisi"),
  password: z.string().min(1, "password wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(() => {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname;
    return from && from !== "/login" ? from : "/products";
  }, [location.state]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Login</h1>
          <p className="text-sm text-slate-600">
            Masuk untuk melanjutkan ke halaman products.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              await login(values);
              toast.success("Login berhasil");
              navigate(redirectTo, { replace: true });
            } catch (err) {
              toast.error("Login gagal. Periksa username/password.");
            }
          })}
        >
          <TextField
            label="Username"
            placeholder="john@mail.com"
            autoComplete="username"
            {...register("username")}
            error={errors.username?.message}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Loading..." : "Login"}
          </Button>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 ring-1 ring-slate-200">
            <p className="font-medium text-slate-700">Demo credentials</p>
            <p>
              username: <span className="font-mono">john@mail.com</span>
            </p>
            <p>
              password: <span className="font-mono">changeme</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

