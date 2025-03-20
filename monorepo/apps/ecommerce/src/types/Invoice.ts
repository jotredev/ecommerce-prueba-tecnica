import {CartItem} from "@/types/Product";

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  country: string;
}

export interface Invoice {
  id: string;
  date: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  taxes: number;
  total: number;
}

export interface InvoiceState {
  invoices: Invoice[];
  createInvoice: (
    customerInfo: CustomerInfo,
    items: CartItem[],
    subtotal: number,
    taxes: number,
    total: number
  ) => Invoice;
  getInvoices: () => Invoice[];
  getInvoiceById: (id: string) => Invoice | undefined;
}
