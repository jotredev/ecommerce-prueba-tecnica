import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {InvoiceState, Invoice, CustomerInfo} from "@/types/Invoice";
import {CartItem} from "@/types/Product";

/**
 * Store global para la gestión de facturas.
 *
 * Este store implementa la funcionalidad de generación, almacenamiento
 * y consulta de facturas en la aplicación de e-commerce. Constituye
 * el registro permanente de las transacciones completadas y permite
 * tanto a clientes como administradores acceder al historial de compras.
 *
 * Características principales:
 * - Creación de nuevas facturas con datos completos de la compra
 * - Persistencia en localStorage para mantener el historial entre sesiones
 * - Consulta de todas las facturas (para panel de administrador)
 *
 * Las facturas generadas contienen información detallada sobre:
 * - Datos del cliente (nombre, contacto, país)
 * - Productos adquiridos con cantidades y precios
 * - Cálculos financieros (subtotal, impuestos, total)
 * - Metadatos (ID único, fecha y hora de la compra)
 *
 * Este store es utilizado principalmente en:
 * 1. El proceso de checkout para generar facturas al finalizar una compra
 * 2. El panel de administración para visualizar todas las compras realizadas
 * 3. Vistas de detalle de facturas para clientes y administradores
 *
 * @example
 * // Consultar todas las facturas (caso de uso para administradores)
 * function AdminInvoicesList() {
 *   const { getInvoices } = useInvoiceStore();
 *   const invoices = getInvoices();
 *
 *   return (
 *     <div>
 *       <h2>Listado de Facturas</h2>
 *       {invoices.map(invoice => (
 *         <InvoiceCard key={invoice.id} invoice={invoice} />
 *       ))}
 *     </div>
 *   );
 * }
 */
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
