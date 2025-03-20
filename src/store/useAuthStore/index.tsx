import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {AuthState, User} from "@/types/User";

/**
 * Store para gestionar la autenticación y autorización de usuarios.
 *
 * Este store implementa un sistema simple de autenticación que:
 * - Mantiene información sobre el usuario actualmente autenticado
 * - Proporciona funciones para iniciar y cerrar sesión
 * - Indica si el usuario tiene permisos de administrador
 * - Persiste el estado de autenticación en localStorage para mantener la sesión entre recargas de página
 *
 * El sistema de autenticación es simulado (no se conecta a un backend real) y está diseñado para demostrar la diferencia entre usuarios cliente y administrador en la aplicación de e-commerce.
 *
 * El store es accesible desde cualquier componente a través del hook useAuthStore.
 *
 * @example
 * // Verificar el estado de autenticación
 * function ProfileButton() {
 *   const { isLoggedIn, user } = useAuthStore();
 *
 *   if (!isLoggedIn) {
 *     return <Link to="/auth/login">Iniciar sesión</Link>;
 *   }
 *
 *   return <span>Bienvenido, {user.name}</span>;
 * }
 *
 * @example
 * // Realizar inicio de sesión
 * function LoginForm() {
 *   const { login } = useAuthStore();
 *   const [username, setUsername] = useState("");
 *   const [role, setRole] = useState<"CLIENT" | "ADMIN">("CLIENT");
 *
 *   const handleSubmit = (e) => {
 *     e.preventDefault();
 *     login(username, role);
 *     navigate("/");
 *   };
 *
 *   // Resto del formulario...
 * }
 *
 * @example
 * // Cerrar sesión
 * function LogoutButton() {
 *   const { logout } = useAuthStore();
 *
 *   return (
 *     <button
 *       onClick={() => {
 *         logout();
 *         navigate("/auth/login");
 *       }}
 *     >
 *       Cerrar sesión
 *     </button>
 *   );
 * }
 */
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,

      login: (username, role) => {
        const user: User = {
          id: crypto.randomUUID(),
          name: username,
          role
        };

        set({
          user,
          isLoggedIn: true,
          isAdmin: role === "ADMIN"
        });
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          isAdmin: false
        });
      }
    }),
    {
      name: "auth-prueba-tecnica",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
