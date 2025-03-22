// src/components/ui/__tests__/PriceDisplay.test.tsx
import { render, screen, waitFor, act } from "@testing-library/react";
import { PriceDisplay } from "@/helpers/formats/__tests__/PriceDisplay";
import { describe, it, expect } from "vitest";

describe("PriceDisplay Function", () => {
  it("formatea correctamente valores monetarios", async () => {
    // container: Proporciona acceso directo al nodo DOM contenedor
    const { container } = render(<PriceDisplay amount={1000} />);

    // screen: Proporciona métodos para consultar el DOM renderizado
    const priceElement = screen.getByTestId("formatted-price");

    // waitFor: Espera por cambios asíncronos (útil para renderizados que dependen de promesas)
    await waitFor(() => {
      // Espera que el precio formateado sea "$1,000.00"
      expect(priceElement.textContent).toBe("$1,000.00");

      // Verificamos que exista el elemento que no sea null o undefined
      expect(
        container.querySelector('[data-testid="price-container"]')
      ).toBeTruthy();
    });
  });

  it("formatea correctamente valores monetarios negativos", async () => {
    await act(async () => {
      render(<PriceDisplay amount={-500} />);
    });

    const priceElement = screen.getByTestId("formatted-price");
    expect(priceElement.textContent).toBe("-$500.00");
  });

  it("formatea correctamente valores con decimales", async () => {
    await act(async () => {
      render(<PriceDisplay amount={99.99} />);
    });

    await waitFor(() => {
      const priceElement = screen.getByTestId("formatted-price");
      expect(priceElement.textContent).toBe("$99.99");
    });
  });
});
