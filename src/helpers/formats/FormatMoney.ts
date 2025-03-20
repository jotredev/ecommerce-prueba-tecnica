/**
 * Formatea un valor numérico a formato de moneda (USD)
 *
 * @param amount - Cantidad a formatear
 * @returns Cadena formateada como moneda (ej: $10.50)
 *
 * @example
 * ```ts
 * formatToMoney(10.5) // "$10.50"
 * ```
 */
export function formatToMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
