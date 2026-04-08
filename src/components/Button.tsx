import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50",
        props.disabled ? "opacity-60" : "hover:opacity-95",
        variant === "primary" &&
          "bg-slate-900 text-white shadow-sm active:translate-y-[1px]",
        variant === "secondary" &&
          "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
        className,
      )}
      {...props}
    />
  );
}

