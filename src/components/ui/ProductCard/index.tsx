import {cn} from "@/lib/utils";
import {Product} from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({product}: ProductCardProps) => {
  return (
    <div className="flex flex-col border rounded-3xl border-border">
      <div className="flex flex-col flex-1 p-5">
        <h3 className="mb-2 text-lg font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <p className="mb-4 text-xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
        <div className="flex items-center justify-between mt-auto text-sm">
          <span
            className={cn(
              "",
              product.stock > 0
                ? product.stock < 5
                  ? "text-yellow-600"
                  : "text-green-600"
                : "text-red-500"
            )}
          >
            {product.stock > 0 ? `Stock (${product.stock})` : "Sin stock"}
          </span>
          <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-2">
        <button
          className={cn(
            "w-full font-medium transition-colors duration-150 bg-transparent border rounded-full border-border h-9 hover:bg-secondary",
            product.stock > 0
              ? "cursor-pointer"
              : "cursor-default pointer-events-none"
          )}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Agregar a carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  );
};
