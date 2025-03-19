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
}
