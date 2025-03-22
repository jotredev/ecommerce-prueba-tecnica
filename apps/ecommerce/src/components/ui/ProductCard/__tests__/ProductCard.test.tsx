import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProductCard } from "@/components/ui/ProductCard";
import * as cartStoreModule from "@/store/useCartStore";
import * as productStoreModule from "@/store/useProductStore";

// Mock completo de los módulos
vi.mock("@/store/useCartStore");
vi.mock("@/store/useProductStore");

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    name: "Manzana Roja",
    category: "Frutas Frescas",
    stock: 10,
    price: 2000,
    tax: 0.19,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Configuración de mocks para cada prueba
    vi.mocked(productStoreModule.useProductStore).mockReturnValue({
      products: [mockProduct],
      loadProducts: vi.fn(),
      decreaseStock: vi.fn(),
      increaseStock: vi.fn(),
    });

    vi.mocked(cartStoreModule.useCartStore).mockReturnValue({
      items: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      checkout: vi.fn(),
      getTotalItems: vi.fn(),
      getSubtotal: vi.fn(),
      getTotalTax: vi.fn(),
      getGrandTotal: vi.fn(),
    });
  });

  it("renderiza la tarjeta de producto con la información correcta", () => {
    // Usamos container para acceder directamente al DOM
    const { container } = render(<ProductCard product={mockProduct} />);

    // Usando container
    const productCard = container.querySelector('[data-testid="product-card"]');
    expect(productCard).toBeInTheDocument();

    const price = container.querySelector('[data-testid="product-price"]');
    expect(price).toHaveTextContent("$2000.00");

    // Verificaciones usando screen
    expect(screen.getByTestId("product-category")).toHaveTextContent(
      "Frutas Frescas"
    );
    expect(screen.getByTestId("product-stock")).toHaveTextContent("Stock (10)");
    expect(screen.getByTestId("product-button-add-to-cart")).toHaveTextContent(
      "Agregar a carrito"
    );
  });

  it("llama a addToCart cuando se hace clic en el botón", async () => {
    const addToCartMock = vi.fn();

    // Configurar un mock específico para esta prueba
    vi.mocked(cartStoreModule.useCartStore).mockReturnValue({
      items: [],
      addToCart: addToCartMock,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      checkout: vi.fn(),
      getTotalItems: vi.fn(),
      getSubtotal: vi.fn(),
      getTotalTax: vi.fn(),
      getGrandTotal: vi.fn(),
    });

    render(<ProductCard product={mockProduct} />);

    // Obtenemos el botón de Agregar a carrito
    const addButton = screen.getByTestId("product-button-add-to-cart");

    // Verificamos que tenga el texto de "Agregar a carrito"
    expect(addButton).toHaveTextContent("Agregar a carrito");

    await act(async () => {
      fireEvent.click(addButton);
    });

    // Usamos waitFor para esperar a que la función sea llamada
    await waitFor(() => {
      expect(addToCartMock).toHaveBeenCalledWith(mockProduct, 1);
    });
  });

  it('muestra "Sin stock" cuando el producto no tiene stock', () => {
    const noStockProduct = { ...mockProduct, stock: 0 };

    // Actualizamos el mock para que devuelva el producto sin stock
    vi.mocked(productStoreModule.useProductStore).mockReturnValue({
      products: [noStockProduct],
      loadProducts: vi.fn(),
      decreaseStock: vi.fn(),
      increaseStock: vi.fn(),
    });

    // Usamos container para verificar elementos del DOM
    const { container } = render(<ProductCard product={noStockProduct} />);

    // Span de sin stock
    const stockSpan = container.querySelector('[data-testid="product-stock"]');

    // Verificamos que el span tenga el testo de "Sin stock"
    expect(stockSpan).toHaveTextContent("Sin stock");

    // Botón "Agregar a carrito" sin stock
    const addButton = container.querySelector(
      '[data-testid="product-button-add-to-cart"]'
    );

    // Verificamos que el botón esta deshabilitado
    expect(addButton).toBeDisabled();

    // Verificamos que el botoón tenga el texto de "Sin stock"
    expect(addButton).toHaveTextContent("Sin stock");

    // Verificamos que el texto "Agregar a carrito" no este presente en el botón
    expect(screen.queryByText("Agregar a carrito")).not.toBeInTheDocument();
  });
});
