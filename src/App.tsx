import {useEffect} from "react";

import {useProductStore} from "@/store/useProductStore";

function App() {
  const loadProducts = useProductStore((state) => state.loadProducts);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
