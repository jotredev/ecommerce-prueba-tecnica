import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * Función de utilidad para combinar clases CSS, especialmente optimizada para Tailwind CSS.
 *
 * Esta función combina dos bibliotecas poderosas para manejar nombres de clases de manera eficiente:
 *
 * 1. `clsx`: Permite la combinación condicional de nombres de clase, manejando diferentes tipos de entrada.
 *
 * 2. `tailwind-merge`: Resuelve conflictos entre clases de Tailwind CSS.
 *
 * @param {...ClassValue[]} inputs - Múltiples argumentos que pueden ser strings, objetos, arrays o valores booleanos
 * @returns {string} Una cadena de texto optimizada con las clases CSS combinadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
