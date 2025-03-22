import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { FormBilling } from "@/components/ui/FormBilling";
import { registerLocation } from "@/actions/submit-location-client";
import { toast } from "sonner";

// Mock de API
vi.mock("@/actions/submit-location-client");
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("FormBilling Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock de localstorage
    Object.defineProperty(window, "localstorage", {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  it("muestra el formulario con todos los campos obligatorios", () => {
    render(<FormBilling />);

    // Checamos que todos los input sean obligatorios
    const inputName = screen.getByTestId("input-name");
    expect(inputName).toBeInTheDocument();

    const inputPhone = screen.getByTestId("input-phone");
    expect(inputPhone).toBeInTheDocument();

    const inputEmail = screen.getByTestId("input-email");
    expect(inputEmail).toBeInTheDocument();

    const inputCountry = screen.getByTestId("input-country");
    expect(inputCountry).toBeInTheDocument();
  });

  it("valida y envia la data del formulario correctamente", async () => {
    // Mock respuesta correcta
    vi.mocked(registerLocation).mockResolvedValue({
      response: "success",
      message: "El país pertenece a la región de América",
    });

    render(<FormBilling />);

    // Rellenamos el formulario
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Jorge Trejo" },
    });
    fireEvent.change(screen.getByTestId("input-phone"), {
      target: { value: "6144555555" },
    });
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("input-country"), {
      target: { value: "MX" },
    });

    // Enviamos el formulario
    await act(async () => {
      fireEvent.click(screen.getByTestId("button-submit"));
    });

    // Verificamos que la llamada a la acción sea correcta
    await waitFor(() => {
      expect(registerLocation).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Jorge Trejo",
          phone: "6144555555",
          email: "test@gmail.com",
          country: "MX",
        })
      );
    });

    // Verificamos que se muestre el mensaje de success
    expect(toast.success).toHaveBeenCalledWith(
      "El país pertenece a la región de América"
    );
  });

  it("muestra un error cuando falla la validación del país", async () => {
    // Mock de respuesta de error
    vi.mocked(registerLocation).mockResolvedValue({
      response: "error",
      message: "El país no pertenece a la región de América",
    });

    render(<FormBilling />);

    // Rellenamos el formulario
    fireEvent.change(screen.getByTestId("input-name"), {
      target: { value: "Jorge Trejo" },
    });
    fireEvent.change(screen.getByTestId("input-phone"), {
      target: { value: "6144555555" },
    });
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("input-country"), {
      target: { value: "FR" },
    });

    // Enviamos el formulario
    await act(async () => {
      fireEvent.click(screen.getByTestId("button-submit"));
    });

    // Verificamos que la llamada a la acción sea incorrecta
    expect(toast.error).toHaveBeenCalledWith(
      "El país no pertenece a la región de América"
    );
  });

  it("muestra un mensaje de validación cuando el cliente ya ha registrado el país", () => {
    // Mock localstorage para regresar la información del cliente
    window.localStorage.getItem = vi.fn().mockReturnValue(
      JSON.stringify({
        name: "Jorge Trejo",
        phone: "6144555555",
        email: "test@gmail.com",
        country: "Mexico",
      })
    );

    render(<FormBilling />);

    expect(
      screen.getByTestId("message-customer-registered")
    ).toBeInTheDocument();
  });
});
