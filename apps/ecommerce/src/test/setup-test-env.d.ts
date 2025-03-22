import "@testing-library/jest-dom";

declare global {
  namespace Vi {
    interface Assertion {
      toBeInTheDocument(): void;
      toHaveClass(className: string): void;
      // Agrega otros matchers personalizados que necesites
    }
  }
}
