import {Route, Routes} from "react-router-dom";

// Layouts
import {MainLayout} from "@/layouts/MainLayout";
import {AuthLayout} from "@/layouts/AuthLayout";

// Pages
import {HomePage} from "@/pages/Home";
import {CartPage} from "@/pages/Cart";
import {AdminPage} from "@/pages/Admin";
import {LoginPage} from "@/pages/Auth/Login";

// Components
import {ProtectedRoute} from "@/components/ui/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="/admin" element={<AuthLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
