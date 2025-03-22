import {useEffect} from "react";
import {Outlet} from "react-router-dom";

import {useProductStore} from "@/store/useProductStore";
import {Header} from "@/components/ui/Header";

export function MainLayout() {
  const {loadProducts} = useProductStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
