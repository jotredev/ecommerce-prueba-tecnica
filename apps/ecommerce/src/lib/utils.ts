import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * Función de utilidad para combinar clases CSS, especialmente optimizada para Tailwind CSS.
 *
 * Esta función combina dos bibliotecas poderosas para manejar nombres de clases de manera eficiente:
 *
 * 1. `clsx`: Permite la combinación condicional de nombres de clase, manejando diferentes tipos de entrada como strings, objetos, arrays, y valores booleanos.
 *
 * 2. `tailwind-merge`: Resuelve conflictos entre clases de Tailwind CSS fusionando adecuadamente utilidades que tienen el mismo propósito (ej. `bg-red-500` y `bg-blue-300`), aplicando correctamente solo la última según el orden de aparición.
 *
 * Esta función es esencial en toda la aplicación para:
 * - Aplicar estilos condicionales
 * - Mezclar clases base de componentes con clases personalizadas
 * - Evitar conflictos entre utilidades de Tailwind
 * - Mantener un código CSS más limpio y predecible
 *
 * @param {...ClassValue[]} inputs - Múltiples argumentos que pueden ser strings, objetos, arrays o valores booleanos
 * @returns {string} Una cadena de texto optimizada con las clases CSS combinadas
 *
 * @example
 * // Combinación básica de clases
 * cn("text-red-500", "font-bold"); // "text-red-500 font-bold"
 *
 * @example
 * // Clases condicionales
 * cn("btn", {
 *   "bg-primary": isPrimary,
 *   "bg-secondary": !isPrimary,
 *   "opacity-50": isDisabled
 * }); // Ej: "btn bg-primary" si isPrimary es true e isDisabled es false
 *
 * @example
 * // Resolución de conflictos de Tailwind
 * cn("bg-red-500", "bg-blue-300"); // "bg-blue-300" (el último prevalece)
 *
 * @example
 * // Uso con componentes personalizables
 * function Button({ className, ...props }) {
 *   return (
 *     <button
 *       className={cn("px-4 py-2 rounded-full bg-primary text-white", className)}
 *       {...props}
 *     />
 *   );
 * }
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
