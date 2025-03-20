import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {InvoiceState, Invoice, CustomerInfo} from "@/types/Invoice";
import {CartItem} from "@/types/Product";

export const useInvoiceStore = create(
  persist<InvoiceState>(
    (set, get) => ({
      invoices: [],

      createInvoice: (
        customerInfo: CustomerInfo,
        items: CartItem[],
        subtotal: number,
        taxes: number,
        total: number
      ) => {
        const newInvoice: Invoice = {
          id: crypto.randomUUID(), // Generamos un ID único
          date: new Date().toISOString(),
          customerInfo,
          items,
          subtotal,
          taxes,
          total
        };

        set((state) => ({
          invoices: [...state.invoices, newInvoice]
        }));

        return newInvoice;
      },

      getInvoices: () => {
        return get().invoices;
      },

      getInvoiceById: (id) => {
        return get().invoices.find((invoice) => invoice.id === id);
      }
    }),
    {
      name: "invoices-prueba-tecnica",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
