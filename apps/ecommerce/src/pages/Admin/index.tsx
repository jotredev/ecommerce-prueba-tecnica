import {useState, useEffect} from "react";
import {Container} from "@/components/ui/Container";
import {Title} from "@/components/ui/Title";
import {useInvoiceStore} from "@/store/useInvoiceStore";
import {InvoiceCard} from "@/components/ui/Invoice";
import {Invoice} from "@/types/Invoice";

export function AdminPage() {
  const {getInvoices} = useInvoiceStore();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoices(getInvoices());
  }, [getInvoices]);

  return (
    <Container>
      <Title className="mb-5">Panel de Administración - Facturas</Title>

      {invoices.length === 0 ? (
        <div className="py-12 text-center rounded-lg bg-secondary">
          <p className="text-muted-foreground">No hay facturas generadas</p>
        </div>
      ) : (
        <div className="space-y-6">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </Container>
  );
}
