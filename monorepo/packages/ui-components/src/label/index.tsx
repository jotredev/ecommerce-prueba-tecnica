import React, {ComponentProps} from "react";
import {cn} from "../lib/utils";

/**
 * Componente Label que proporciona etiquetas estandarizadas para
 * elementos de formulario con estilos consistentes
 */
export function Label({className, ...props}: ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
