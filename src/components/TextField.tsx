import type { InputHTMLAttributes } from "react";
import React from "react";

import { cn } from "@/utils/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name ?? label.replace(/\s+/g, "-").toLowerCase();

    return (
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 transition",
            "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400",
            error && "ring-red-300 focus:ring-red-400",
            className,
          )}
          {...props}
        />
        {error ? <p className="text-xs text-red-600">{error}</p> : null}
      </div>
    );
  },
);

TextField.displayName = "TextField";

