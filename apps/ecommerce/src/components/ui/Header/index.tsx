import {Link} from "react-router-dom";

import {IoCartOutline} from "react-icons/io5";
import {useCartStore} from "@/store/useCartStore";
import {useAuthStore} from "@/store/useAuthStore";

/**
 * Componente de cabecera principal de la aplicación.
 *
 * Este componente representa la barra de navegación superior que está presente
 * en todas las páginas de la aplicación. Incluye el nombre/logo de la tienda
 * con un enlace a la página principal y un icono de carrito que muestra
 * la cantidad actual de productos en el carrito del usuario.
 *
 * Características principales:
 * - Título de la tienda con enlace a la página principal
 * - Icono de carrito que actúa como enlace a la página del carrito
 * - Indicador numérico que muestra la cantidad de productos en el carrito
 * - El indicador solo aparece cuando hay al menos un producto en el carrito
 * - Estilos responsivos con bordes y efectos de hover
 *
 * Utiliza el store global useCartStore para obtener:
 * - La cantidad total de productos en el carrito mediante getTotalItems()
 *
 * @returns {JSX.Element} Componente de cabecera renderizado
 *
 * @example
 * // Uso típico dentro del layout principal de la aplicación
 * function MainLayout() {
 *   return (
 *     <div>
 *       <Header />
 *       <main>{children}</main>
 *       <Footer />
 *     </div>
 *   );
 * }
 */
export function Header() {
  const {getTotalItems} = useCartStore();
  const {isLoggedIn, user, logout} = useAuthStore();

  return (
    <header className="flex items-center justify-between px-5 border-b border-border h-14">
      <Link to="/">
        <h1 className="text-xl font-semibold text-gray-800">La tiendita</h1>
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/cart"
          className="relative flex items-center justify-center transition-colors duration-300 border rounded-full border-border size-10 hover:border-primary"
        >
          <IoCartOutline className="size-5" />
          {getTotalItems() > 0 ? (
            <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center rounded-full bg-primary text-white text-xs">
              {getTotalItems()}
            </span>
          ) : null}
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center size-10 rounded-full bg-secondary font-medium uppercase">
              {user?.name.charAt(0)}
              {user?.name.charAt(1)}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {user?.role}
              </span>
              |
              <button className="cursor-pointer" onClick={logout}>
                Salir
              </button>
            </div>
          </div>
        ) : (
          <Link to="/auth/login">Ingresar</Link>
        )}
      </div>
    </header>
  );
}
