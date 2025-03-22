import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

/**
 * Componente Input que proporciona un campo de entrada estandarizado
 * con estilos y comportamientos consistentes para toda la aplicación.
 *
 * Este componente extiende el elemento HTML nativo `input` añadiendo:
 * - Estilos visuales consistentes con la identidad de la aplicación
 * - Bordes redondeados completos (rounded-full) para un diseño moderno
 * - Estados interactivos como focus con transiciones suaves
 * - Estilos específicos para el estado deshabilitado
 * - Capacidad para combinar clases personalizadas con los estilos base
 *
 * El componente utiliza la función `cn` para fusionar las clases base
 * con cualquier clase personalizada proporcionada por el desarrollador,
 * manteniendo así la capacidad de personalización sin perder la consistencia.
 *
 * La inclusión del atributo `data-slot="input"` facilita la selección
 * de este elemento para pruebas automatizadas o estilos específicos.
 *
 * Por defecto, se establece `autoComplete="off"` para evitar el autocompletado
 * del navegador en campos donde generalmente no se desea.
 *
 * @param {ComponentProps<"input">} props - Props estándar de un elemento input
 * @param {string} [props.className] - Clases CSS adicionales para personalizar el input
 * @param {string} [props.type] - Tipo de input (text, email, password, etc.)
 * @returns {JSX.Element} Componente input renderizado con estilos consistentes
 *
 * @example
 * // Uso básico como campo de texto
 * <Input placeholder="Nombre completo" />
 *
 * @example
 * // Como campo de email con validación
 * <Input
 *   type="email"
 *   placeholder="correo@ejemplo.com"
 *   required
 * />
 *
 * @example
 * // Integración con React Hook Form
 * <Input
 *   {...register("username")}
 *   placeholder="Nombre de usuario"
 * />
 *
 * @example
 * // Con clases personalizadas adicionales
 * <Input
 *   className="bg-gray-100 focus:bg-white"
 *   placeholder="Buscar..."
 * />
 */
export function Input({className, type, ...props}: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input flex h-10 w-full min-w-0 rounded-full border border-border bg-transparent px-3 py-1 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary transition-color duration-150",
        className
      )}
      autoComplete="off"
      {...props}
    />
  );
}
