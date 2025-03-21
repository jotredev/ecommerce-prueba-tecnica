import {Navigate} from "react-router-dom";
import {useAuthStore} from "@/store/useAuthStore";

/**
 * Props para el componente ProtectedRoute
 *
 * @interface ProtectedRouteProps
 * @property {React.ReactNode} children - Componentes hijos que se renderizarán si el usuario está autorizado
 * @property {boolean} [requireAdmin=true] - Si es `true`, el usuario debe ser administrador para acceder a la ruta protegida
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * Componente que protege rutas basadas en autenticación y autorización.
 *
 * Este componente actúa como un guardián para las rutas de la aplicación que requieren autenticación o permisos específicos de administrador. Impide el acceso no autorizado a secciones restringidas de la aplicación como el panel de administración.
 *
 * Comportamiento:
 * - Si el usuario no ha iniciado sesión, redirige a la página de login
 * - Si se requiere rol de administrador y el usuario no lo tiene, redirige a la página principal
 * - Si el usuario cumple con los requisitos, muestra el contenido protegido
 *
 * Utiliza el store `useAuthStore` para verificar:
 * - `isLoggedIn`: Si el usuario ha iniciado sesión
 * - `isAdmin`: Si el usuario tiene permisos de administrador
 *
 * @param {ProtectedRouteProps} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si el usuario está autorizado
 * @param {boolean} [props.requireAdmin=true] - Si se requiere rol de administrador para acceder
 *
 * @returns {JSX.Element} El contenido protegido o una redirección
 *
 * @example
 * // Ruta que requiere rol de administrador (comportamiento por defecto)
 * <Route
 *   path="/admin"
 *   element={
 *     <ProtectedRoute>
 *       <AdminDashboard />
 *     </ProtectedRoute>
 *   }
 * />
 *
 * @example
 * // Ruta que solo requiere autenticación (sin requisito de admin)
 * <Route
 *   path="/mi-cuenta"
 *   element={
 *     <ProtectedRoute requireAdmin={false}>
 *       <UserAccountPage />
 *     </ProtectedRoute>
 *   }
 * />
 */
export function ProtectedRoute({
  children,
  requireAdmin = true
}: ProtectedRouteProps) {
  const {isLoggedIn, isAdmin} = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
