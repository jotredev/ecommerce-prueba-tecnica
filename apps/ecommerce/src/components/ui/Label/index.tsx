import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

/**
 * Componente Label que proporciona etiquetas estandarizadas para
 * elementos de formulario con estilos consistentes en toda la aplicación.
 *
 * Este componente extiende el elemento HTML nativo `label` añadiendo:
 * - Estilos visuales consistentes con la identidad de la aplicación
 * - Tamaño de texto y peso de fuente estandarizados
 * - Comportamiento flexible con ancho automático (w-fit)
 * - Manejo adecuado de estados cuando el control asociado está deshabilitado
 * - Prevención de selección de texto para mejorar la experiencia de usuario
 * - Capacidad para incorporar elementos adicionales con espaciado adecuado
 *
 * El componente utiliza la clase `peer-disabled` para cambiar automáticamente
 * su apariencia cuando el elemento de formulario asociado está deshabilitado,
 * siempre que se use correctamente la relación peer en Tailwind CSS.
 *
 * La inclusión del atributo `data-slot="label"` facilita la selección
 * de este elemento para pruebas automatizadas o estilos específicos.
 *
 * @param {ComponentProps<"label">} props - Props estándar de un elemento label
 * @param {string} [props.className] - Clases CSS adicionales para personalizar la etiqueta
 * @returns {JSX.Element} Componente label renderizado con estilos consistentes
 *
 * @example
 * // Uso básico con un campo de texto
 * <div className="grid gap-2">
 *   <Label htmlFor="name">Nombre completo</Label>
 *   <Input id="name" placeholder="Escribe tu nombre" />
 * </div>
 *
 * @example
 * // Con un elemento adicional (como un indicador de requerido)
 * <Label htmlFor="email">
 *   Correo electrónico
 *   <span className="text-red-500">*</span>
 * </Label>
 *
 * @example
 * // Con un campo deshabilitado (muestra el comportamiento peer-disabled)
 * <div className="grid gap-2">
 *   <Label htmlFor="disabled-field">Campo deshabilitado</Label>
 *   <Input id="disabled-field" disabled />
 * </div>
 */
function Label({className, ...props}: ComponentProps<"label">) {
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

export {Label};
