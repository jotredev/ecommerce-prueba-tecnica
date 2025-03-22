import { formatToMoney } from "@/helpers/formats/FormatMoney";

type PriceDisplayProps = {
  amount: number;
};

export function PriceDisplay({ amount }: PriceDisplayProps) {
  return (
    <div data-testid="price-container">
      <span data-testid="formatted-price">{formatToMoney(amount)}</span>
    </div>
  );
}
