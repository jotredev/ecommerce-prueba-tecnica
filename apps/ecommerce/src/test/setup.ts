import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock de fetch API
global.fetch = vi.fn();
