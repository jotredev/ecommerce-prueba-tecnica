import React, {ComponentProps} from "react";
import {cn} from "../lib/utils";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  icon,
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-full font-medium transition-colors duration-150 flex items-center justify-center gap-2",
        // Variantes
        {
          "bg-primary text-white hover:bg-primary/90": variant === "primary",
          "bg-secondary hover:bg-secondary/90": variant === "secondary",
          "bg-transparent border border-border hover:bg-secondary":
            variant === "outline"
        },
        // Tamaños
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6 text-lg": size === "lg"
        },
        // Ancho completo
        fullWidth && "w-full",
        // Estado deshabilitado
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
}
