import {useEffect} from "react";
import {Outlet} from "react-router-dom";

import {useProductStore} from "@/store/useProductStore";

export function MainLayout() {
  const loadProducts = useProductStore((state) => state.loadProducts);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
