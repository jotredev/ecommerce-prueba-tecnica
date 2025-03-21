import {Outlet} from "react-router-dom";

import {Header} from "@/components/ui/Header";

export function AuthLayout() {
  return (
    <div>
      <Header />
      <main className="w-full h-[calc(100vh-56px)] flex items-center justify-center overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
