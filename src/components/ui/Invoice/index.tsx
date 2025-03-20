import {Invoice} from "@/types/Invoice";
import {formatToMoney} from "@/helpers/formats/FormatMoney";

interface InvoiceCardProps {
  invoice: Invoice;
}

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
