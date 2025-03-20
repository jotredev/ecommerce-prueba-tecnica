import {create} from "zustand";

import {initProductsMock} from "@/assets/Products";
import {ProductState} from "@/types/Product";

/**
 * Store global para la gestión del inventario de productos.
 *
 * Este store implementa la funcionalidad de administración de productos
 * en la aplicación de e-commerce, actuando como el repositorio central
 * de datos de productos y su disponibilidad de stock. Representa la
 * "fuente única de verdad" para toda la información relacionada con productos.
 *
 * Características principales:
 * - Carga inicial de productos desde localStorage o datos de mock
 * - Gestión de inventario (incremento y decremento de stock)
 * - Persistencia automática en localStorage para mantener el estado entre sesiones
 * - Sincronización con el carrito de compras a través de sus métodos
 *
 * Este store sigue el patrón Repository al abstraer completamente el acceso
 * a los datos de productos, permitiendo que el resto de la aplicación interactúe
 * con los productos sin conocer los detalles de cómo se almacenan o gestionan.
 *
 * @example
 * // Obtener la lista de productos y mostrarlos en la interfaz
 * function ProductList() {
 *   const { products } = useProductStore();
 *
 *   return (
 *     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 *       {products.map(product => (
 *         <ProductCard key={product.id} product={product} />
 *       ))}
 *     </div>
 *   );
 * }
 */
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  // Función de cargar productos
  loadProducts: () => {
    // Primero verificamos si ya tenemos productos cargados
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      set({products: JSON.parse(storedProducts)});
    } else {
      // Si no hay productos cargamos, carga los productos iniciales
      localStorage.setItem("products", JSON.stringify(initProductsMock));
      set({products: initProductsMock});
    }
  },
  // Función para decrementar un producto y su cantidad
  decreaseStock: (productId: number, quantity: number) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId
          ? {...product, stock: Math.max(0, product.stock - quantity)}
          : product
      );

      // Actualizamos los productos en el local storage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      return {products: updatedProducts};
    });
  },
  // Función para incrementar un producto y su cantidad
  increaseStock: (productId: number, quantity: number) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId
          ? {...product, stock: product.stock + quantity}
          : product
      );

      // Actualizamos los productos en el local storage
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return {products: updatedProducts};
    });
  }
}));
