import {cn} from "@/lib/utils";

/**
 * Componente Title que proporciona un encabezado principal con estilo consistente.
 *
 * Características principales:
 * - Renderiza un elemento h1 HTML semánticamente correcto
 * - Aplica estilos consistentes de tamaño de texto y peso de fuente
 * - Permite extender los estilos mediante la prop className
 * - Incluye un atributo data-slot para facilitar pruebas y selectores específicos
 * - Acepta todas las props estándar de un elemento h1 HTML
 *
 * El componente utiliza la función `cn` para combinar clases predeterminadas con
 * cualquier clase adicional proporcionada, manteniendo la flexibilidad de personalización
 * mientras se preserva la consistencia del diseño.
 *
 * @param {React.ComponentProps<"h1">} props - Props estándar de un elemento h1
 * @param {string} [props.className] - Clases CSS adicionales para personalizar el título
 * @returns {JSX.Element} Componente título renderizado
 *
 * @example
 * // Uso básico
 * <Title>Productos destacados</Title>
 *
 * @example
 * // Con clases adicionales
 * <Title className="mb-8 text-center text-primary">
 *   Catálogo de productos
 * </Title>
 *
 * @example
 * // Con atributos HTML adicionales
 * <Title id="section-title" aria-label="Sección de carrito">
 *   Tu carrito de compras
 * </Title>
 */
export function Title({className, ...props}: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="title"
      className={cn("text-xl font-bold", className)}
      {...props}
    />
  );
}
