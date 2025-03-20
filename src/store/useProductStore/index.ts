import {create} from "zustand";

import {initProductsMock} from "@/assets/Products";
import {ProductState} from "@/types/Product";

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
