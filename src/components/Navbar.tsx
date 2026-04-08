import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            Store Admin
          </span>
        </div>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
              )
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/add-product"
            className={({ isActive }) =>
              cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
              )
            }
          >
            Add Product
          </NavLink>
        </nav>

        <Button
          variant="secondary"
          onClick={() => {
            logout();
            toast.success("Logout berhasil");
            navigate("/login", { replace: true });
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

