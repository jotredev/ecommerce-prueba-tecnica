import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

import {CartState, Product} from "@/types/Product";
import {useProductStore} from "@/store/useProductStore";
import {useInvoiceStore} from "@/store/useInvoiceStore";
import {CustomerInfo} from "@/types/Invoice";

/**
 * Función de acceso al estado global de productos.
 * Permite acceder al store de productos desde dentro del store de carrito
 * sin crear dependencias circulares.
 *
 * @returns {ReturnType<typeof useProductStore.getState>} Estado actual del store de productos
 */
const productStore = () => useProductStore.getState();

/**
 * Función de acceso al estado global de facturas.
 * Permite acceder al store de facturas desde dentro del store de carrito
 * para la creación de facturas durante el checkout.
 *
 * @returns {ReturnType<typeof useInvoiceStore.getState>} Estado actual del store de facturas
 */
const invoiceStore = () => useInvoiceStore.getState();

/**
 * Store global para la gestión del carrito de compras.
 *
 * Este store implementa toda la lógica relacionada con el carrito de compras:
 * - Agregar productos al carrito
 * - Actualizar cantidades de productos
 * - Eliminar productos
 * - Calcular subtotales, impuestos y totales
 * - Proceso de checkout y generación de facturas
 *
 * Características clave:
 * - Sincronización automática con el inventario (store de productos)
 * - Persistencia en localStorage para mantener el carrito entre sesiones
 * - Gestión de disponibilidad de stock al agregar o actualizar productos
 * - Integración con el sistema de facturación
 *
 * @example
 * // Obtener información del carrito y agregar un producto
 * function ProductCard({ product }) {
 *   const { addToCart, getTotalItems } = useCartStore();
 *
 *   return (
 *     <div>
 *       <h3>{product.name}</h3>
 *       <button onClick={() => addToCart(product, 1)}>
 *         Agregar al carrito
 *       </button>
 *       <span>Items en carrito: {getTotalItems()}</span>
 *     </div>
 *   );
 * }
 */
export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      // Función para agregar un producto al carrito
      addToCart: (product: Product, quantity = 1) => {
        const productStoreRef = productStore();
        // Verificamos si hay stock disponible
        const availableQuantity = Math.min(quantity, product.stock);

        if (availableQuantity <= 0) return;

        set((state) => {
          // Verificamos si el producto ya está en el carrito
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          // Si el producto ya está en el carrito, actualizamos la cantidad
          if (existingItem) {
            // Incrementamos la cantidad del producto en el carrito
            const updatedProduct = {...product};

            // Decrementamos el stock del producto
            const quantityDifference = availableQuantity;
            productStoreRef.decreaseStock(product.id, quantityDifference);

            // Actualizamos la cantidad del producto en el carrito
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      product: updatedProduct,
                      quantity: item.quantity + availableQuantity
                    }
                  : item
              )
            };
          } else {
            // Si el producto no está en el carrito, lo agregamos

            // Decrementamos el stock del producto
            productStoreRef.decreaseStock(product.id, availableQuantity);

            const updatedProduct = {
              ...product,
              stock: product.stock - availableQuantity
            };

            // Agregamos el producto al carrito
            return {
              items: [
                ...state.items,
                {product: updatedProduct, quantity: availableQuantity}
              ]
            };
          }
        });
      },
      // Función para eliminar un producto del carrito
      removeFromCart: (productId: number) => {
        const productStoreRef = productStore();
        const {items} = get();

        // Buscamos el producto en el carrito
        const itemToRemove = items.find(
          (item) => item.product.id === productId
        );

        if (itemToRemove) {
          // Incrementamos el stock del producto eliminado
          productStoreRef.increaseStock(productId, itemToRemove.quantity);

          // Eliminamos el producto del carrito
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId)
          }));
        }
      },
      // Función para actualizar la cantidad de un producto en el carrito
      updateQuantity: (productId: number, newQuantity: number) => {
        const productStoreRef = productStore();
        const {items} = get();

        // Buscamos el producto en el carrito
        const existingItem = items.find(
          (item) => item.product.id === productId
        );

        if (existingItem) {
          // Actualizamos la cantidad del producto en el carrito
          const quantityDifference = newQuantity - existingItem.quantity;

          if (quantityDifference > 0) {
            // Decrementamos stock
            productStoreRef.decreaseStock(productId, quantityDifference);
          } else if (quantityDifference < 0) {
            // Incrementamos stock
            productStoreRef.increaseStock(
              productId,
              Math.abs(quantityDifference)
            );
          }

          // Actualizamos la cantidad del producto en el carrito
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === productId
                ? {...item, quantity: newQuantity}
                : item
            )
          }));
        }
      },
      // Función para limpiar el carrito
      clearCart: () => {
        const productStore = useProductStore.getState();
        const {items} = get();

        // Restablecemos el stock de todos los productos del carrito
        items.forEach((item) => {
          productStore.increaseStock(item.product.id, item.quantity);
        });

        set({items: []});
      },
      // Función para realizar el checkout
      checkout: (customerInfo: CustomerInfo) => {
        const invoiceStoreRef = invoiceStore();
        const {items, getSubtotal, getTotalTax, getGrandTotal} = get();

        // Creamos una nueva factura
        const invoice = invoiceStoreRef.createInvoice(
          customerInfo,
          items,
          getSubtotal(),
          getTotalTax(),
          getGrandTotal()
        );

        // Limpiamos el carrito sin restaurar el stock
        set({items: []});

        // Retornamos los productos comprados
        return invoice;
      },

      // Función para obtener el total de productos en el carrito
      getTotalItems: (): number => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Devuelve solo el precio base sin impuestos
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
      // Calcula impuestos basados en la tasa de cada producto
      getTotalTax: () => {
        return get().items.reduce(
          (totalTax, item) =>
            totalTax + item.product.price * item.product.tax * item.quantity,
          0
        );
      },
      // Devuelve el precio total con impuestos
      getGrandTotal: (): number => {
        const {getSubtotal, getTotalTax} = get();
        return getSubtotal() + getTotalTax();
      }
    }),
    {
      name: "carrito-prueba-tecnica",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
