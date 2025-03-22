import {Container} from "@/components/ui/Container";
import {ProductCard} from "@/components/ui/ProductCard";

import {useProductStore} from "@/store/useProductStore";

export function HomePage() {
  const {products} = useProductStore();

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-12 text-center rounded-lg bg-gray-50">
          <p className="text-gray-500">No hay productos disponibles</p>
        </div>
      )}
    </Container>
  );
}
