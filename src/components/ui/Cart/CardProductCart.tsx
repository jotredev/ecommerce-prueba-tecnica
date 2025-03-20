import {formatToMoney} from "@/helpers/formats/FormatMoney";
import {useCartStore} from "@/store/useCartStore";
import {useProductStore} from "@/store/useProductStore";
import {CartItem} from "@/types/Product";
import {IoTrashOutline} from "react-icons/io5";

interface CardProductCartProps {
  cartItem: CartItem;
}

export function CardProductCart({cartItem}: CardProductCartProps) {
  const {product, quantity} = cartItem;
  const {updateQuantity, removeFromCart} = useCartStore();
  const {products} = useProductStore();

  // Obtener el stock actual del producto
  const currentStock = products.find((p) => p.id === product.id)?.stock || 0;

  // Subtotal
  const subtotal = product.price * quantity;

  // Incremento de cantidad de producto
  const handleIncrement = () => {
    if (currentStock > 0) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  // Decremento de cantidad de producto
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  // Eliminar producto del carrito
  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="bg-background p-3 rounded-xl">
      <h3 className="text-lg font-medium mb-1.5">{product.name}</h3>
      <div className="flex items-center gap-2">
        <p className="text-primary text-xl font-bold">
          {formatToMoney(subtotal)}
        </p>
        {product.tax > 0 ? (
          <span className="text-xs text-muted-foreground">
            IVA: {(product.tax * 100).toFixed(0)}%
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center size-7 text-lg border border-border cursor-pointer rounded-full text-muted-foreground hover:border-primary transition-colors duration-150"
            onClick={handleDecrement}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-primary font-semibold">{quantity}</span>
          <button
            className="flex items-center justify-center size-7 text-lg border border-border cursor-pointer rounded-full text-muted-foreground hover:border-primary transition-colors duration-150"
            onClick={handleIncrement}
            disabled={currentStock <= 0}
          >
            +
          </button>
        </div>
        <div>
          <button
            className="flex items-center justify-center transition-colors duration-300 border rounded-full border-border size-10 hover:border-primary cursor-pointer"
            onClick={handleRemove}
          >
            <IoTrashOutline className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
