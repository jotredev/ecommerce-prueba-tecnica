import {Cart} from "@/components/ui/Cart";
import {Container} from "@/components/ui/Container";
import {FormBilling} from "@/components/ui/FormBilling";
import {Title} from "@/components/ui/Title";

export function CartPage() {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      <section className="lg:col-span-2 xl:col-span-4 space-y-5">
        <Title>Información</Title>
        <FormBilling />
      </section>
      <section className="xl:col-span-2 space-y-5">
        <Title>Carrito</Title>
        <Cart />
      </section>
    </Container>
  );
}
