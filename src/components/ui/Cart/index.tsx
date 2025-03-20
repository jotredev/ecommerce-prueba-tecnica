import {toast} from "sonner";

import {CardProductCart} from "./CardProductCart";
import {useCartStore} from "@/store/useCartStore";
import {formatToMoney} from "@/helpers/formats/FormatMoney";
import {CustomerInfo} from "@/types/Invoice";

/**
 * Componente que muestra el carrito de compras completo con su contenido
 * y cálculos de totales.
 *
 * Este componente:
 * - Muestra la lista de productos en el carrito usando CardProductCart
 * - Presenta un mensaje cuando el carrito está vacío
 * - Calcula y muestra el subtotal, impuestos y total general
 * - Proporciona un botón para proceder al pago
 *
 * Utiliza el store global useCartStore para obtener:
 * - Los items del carrito
 * - Funciones para calcular subtotales, impuestos y totales
 *
 * @returns {JSX.Element} Componente renderizado del carrito
 *
 * @example
 * // Uso dentro de una página o componente
 * function CartPage() {
 *   return (
 *     <div>
 *       <h1>Tu Carrito</h1>
 *       <Cart />
 *     </div>
 *   );
 * }
 */
export function Cart() {
  const {items, getSubtotal, getTotalTax, getGrandTotal, checkout} =
    useCartStore();

  const subtotal = getSubtotal();
  const taxes = getTotalTax();
  const total = getGrandTotal();

  function handleCheckout() {
    const customerInfoString = localStorage.getItem("customer-info");
    if (items.length > 0) {
      if (customerInfoString) {
        const customerInfo: CustomerInfo = JSON.parse(customerInfoString);
        checkout(customerInfo);
        localStorage.removeItem("customer-info");
        toast.success("Compra realizada con éxito");
      } else {
        toast.error("Por favor, ingrese la información del cliente");
      }
    } else {
      toast.error("No hay productos en el carrito");
    }
  }

  return (
    <div className="bg-secondary p-5 rounded-xl">
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center my-8">
          No hay productos en el carrito.
        </p>
      ) : (
        <>
          <ul className="h-[450px] overflow-auto space-y-5">
            {items.map((item) => (
              <li key={item.product.id}>
                <CardProductCart cartItem={item} />
              </li>
            ))}
          </ul>
          <hr className="border-border my-8" />
          <div className="flex flex-col items-end">
            <ul className="text-right space-y-2">
              <li>
                <span className="text-muted-foreground">{`Subtotal: ${formatToMoney(
                  subtotal
                )}`}</span>
              </li>
              <li>
                <span className="text-muted-foreground">{`Impuestos: ${formatToMoney(
                  taxes
                )}`}</span>
              </li>
              <li>
                <span className="font-bold">{`Total: ${formatToMoney(
                  total
                )}`}</span>
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <button
              className="w-full flex items-center justify-center h-10 rounded-full bg-primary text-white cursor-pointer"
              onClick={handleCheckout}
            >
              Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
