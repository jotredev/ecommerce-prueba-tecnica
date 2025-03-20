import {MouseEvent} from "react";

import {cn} from "@/lib/utils";
import {useCartStore} from "@/store/useCartStore";
import {useProductStore} from "@/store/useProductStore";
import {Product} from "@/types/Product";

/**
 * Props para el componente ProductCard
 *
 * @interface ProductCardProps
 * @property {Product} product - Datos del producto a mostrar en la tarjeta
 */
interface ProductCardProps {
  product: Product;
}

/**
 * Componente que muestra una tarjeta de producto en el catálogo de la tienda.
 *
 * Este componente presenta la información esencial de un producto y permite al usuario añadirlo al carrito directamente desde la vista de catálogo.
 * La tarjeta muestra visualmente el estado de stock del producto mediante
 * indicadores de color y deshabilita la interacción cuando no hay stock.
 *
 * Características principales:
 * - Muestra nombre, precio, categoría y disponibilidad del producto
 * - El indicador de stock cambia de color según la cantidad disponible:
 *   - Verde: Stock normal (5 o más unidades)
 *   - Amarillo: Stock bajo (menos de 5 unidades)
 *   - Rojo: Sin stock (0 unidades)
 * - El botón de "Agregar a carrito" se deshabilita cuando no hay stock
 * - Obtiene el estado actual del stock desde el store global
 * - Interactúa con el store del carrito para añadir productos
 *
 * Utiliza los stores:
 * - useCartStore: Para la funcionalidad de añadir al carrito
 * - useProductStore: Para obtener información actualizada del stock
 *
 * @param {ProductCardProps} props - Props del componente
 * @param {Product} props.product - Datos del producto a mostrar
 *
 * @returns {JSX.Element} Componente tarjeta de producto renderizado
 *
 * @example
 * // Uso básico dentro de un grid de productos
 * const products = useProductStore().products;
 *
 * return (
 *   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 *     {products.map((product) => (
 *       <ProductCard key={product.id} product={product} />
 *     ))}
 *   </div>
 * );
 */
export const ProductCard = ({product}: ProductCardProps) => {
  const {addToCart} = useCartStore();
  const {products} = useProductStore();

  // Obtenemos el producto actual
  const currentProduct = products.find((p) => p.id === product.id) || product;

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    if (currentProduct.stock > 0) {
      addToCart(currentProduct, 1);
    }
  };

  return (
    <div className="flex flex-col border rounded-3xl border-border">
      <div className="flex flex-col flex-1 p-5">
        <h3 className="mb-2 text-lg font-medium text-gray-800 line-clamp-2">
          {currentProduct.name}
        </h3>
        <p className="mb-4 text-xl font-bold text-primary">
          ${currentProduct.price.toFixed(2)}
        </p>
        <div className="flex items-center justify-between mt-auto text-sm">
          <span
            className={cn(
              "",
              currentProduct.stock > 0
                ? currentProduct.stock < 5
                  ? "text-yellow-600"
                  : "text-green-600"
                : "text-red-500"
            )}
          >
            {currentProduct.stock > 0
              ? `Stock (${currentProduct.stock})`
              : "Sin stock"}
          </span>
          <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
            {currentProduct.category}
          </span>
        </div>
      </div>
      <div className="p-2">
        <button
          className={cn(
            "w-full font-medium transition-colors duration-150 bg-transparent border rounded-full border-border h-9 hover:bg-secondary",
            currentProduct.stock > 0
              ? "cursor-pointer"
              : "cursor-default pointer-events-none text-red-500 border-red-500"
          )}
          onClick={currentProduct.stock > 0 ? handleAddToCart : undefined}
          disabled={currentProduct.stock <= 0}
        >
          {currentProduct.stock > 0 ? "Agregar a carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  );
};
