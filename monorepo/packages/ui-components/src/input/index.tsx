import React, {ComponentProps} from "react";
import {cn} from "../lib/utils";

/**
 * Componente Input que proporciona un campo de entrada estandarizado
 */
export function Input({className, type, ...props}: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input flex h-10 w-full min-w-0 rounded-lg border border-border bg-transparent px-3 py-1 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary transition-color duration-150",
        className
      )}
      autoComplete="off"
      {...props}
    />
  );
}
