import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

/**
 * Componente contenedor que proporciona un layout consistente con márgenes
 * y espaciado para envolver el contenido de la aplicación.
 *
 * Este componente:
 * - Aplica un ancho máximo con la clase `container`
 * - Gestiona márgenes horizontales responsivos
 * - Aplica espaciado vertical consistente (padding)
 * - Permite extender los estilos a través de la prop `className`
 * - Acepta todas las props estándar de un elemento div de HTML
 *
 * Se utiliza típicamente para envolver el contenido principal de una página
 * y mantener un diseño coherente en toda la aplicación.
 *
 * @param {ComponentProps<"div">} props - Props estándar de un elemento div
 * @param {string} [props.className] - Clases CSS adicionales para personalizar el contenedor
 * @returns {JSX.Element} Componente contenedor renderizado
 *
 * @example
 * // Uso básico
 * <Container>
 *   <h1>Contenido de la página</h1>
 *   <p>Más contenido...</p>
 * </Container>
 *
 * @example
 * // Con clases adicionales
 * <Container className="bg-gray-100 mt-8">
 *   <ProductList products={products} />
 * </Container>
 *
 * @example
 * // Con atributos HTML adicionales
 * <Container id="main-content" aria-label="Contenido principal">
 *   <Dashboard />
 * </Container>
 */
export function Container({className, ...props}: ComponentProps<"div">) {
  return (
    <div
      data-slot="container"
      className={cn(
        "container mx-auto px-5 sm:px-0 lg:px-5 xl:px-0 py-8",
        className
      )}
      {...props}
    />
  );
}
