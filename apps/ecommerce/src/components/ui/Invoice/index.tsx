import {Invoice} from "@/types/Invoice";
import {formatToMoney} from "@/helpers/formats/FormatMoney";

/**
 * Props para el componente Invoice
 *
 * @interface InvoiceProps
 * @property {InvoiceType} invoice - Datos completos de la factura a mostrar
 * @property {boolean} [detailed=false] - Indica si se debe mostrar la versión detallada de la factura
 * @property {() => void} [onDownload] - Función opcional para manejar la descarga de la factura
 */
interface InvoiceCardProps {
  invoice: Invoice;
}

/**
 * Componente que muestra la información de una factura generada.
 *
 * Este componente visualiza todos los detalles de una factura de compra,
 * incluyendo información del cliente, productos adquiridos, cantidades,
 * precios e impuestos.
 *
 * La información se presenta en una estructura clara y jerárquica para facilitar su lectura.
 *
 * Este componente es utilizado principalmente en:
 * - Panel de administración para revisar compras realizadas
 * - Historial de compras de un cliente
 *
 * @param {InvoiceProps} props - Props del componente
 * @param {InvoiceType} props.invoice - Datos completos de la factura a mostrar
 *
 * @returns {JSX.Element} Componente de factura renderizado
 *
 * @example
 * // Uso básico
 * <Invoice invoice={invoiceData} />
 *
 */
export function InvoiceCard({invoice}: InvoiceCardProps) {
  return (
    <div className="bg-secondary p-5 rounded-xl">
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            Factura #{invoice.id.substring(0, 8)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(invoice.date).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{invoice.customerInfo.name}</p>
          <p className="text-sm">{invoice.customerInfo.email}</p>
          <p className="text-sm">{invoice.customerInfo.phone}</p>
          <p className="text-sm">País: {invoice.customerInfo.country}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium mb-2">Productos</h4>
        <ul className="space-y-2">
          {invoice.items.map((item) => (
            <li key={item.product.id} className="flex justify-between">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>{formatToMoney(item.product.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatToMoney(invoice.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos:</span>
          <span>{formatToMoney(invoice.taxes)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total:</span>
          <span>{formatToMoney(invoice.total)}</span>
        </div>
      </div>
    </div>
  );
}
