import {Route, Routes} from "react-router-dom";

import {MainLayout} from "@/layouts/MainLayout";
import {HomePage} from "@/pages/Home";
import {CartPage} from "@/pages/Cart";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}

export default App;
