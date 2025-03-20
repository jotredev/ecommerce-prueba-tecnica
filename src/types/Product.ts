export type Product = {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  tax: number;
};

export interface ProductState {
  products: Product[];
  loadProducts: () => void;
  decreaseStock: (productId: number, quantity: number) => void;
  increaseStock: (productId: number, quantity: number) => void;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: () => CartItem[];
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotalTax: () => number;
  getGrandTotal: () => number;
}
