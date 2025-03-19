import {Link} from "react-router-dom";

import {IoCartOutline} from "react-icons/io5";

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 border-b border-border h-14">
      <h1 className="text-xl font-semibold text-gray-800">La tiendita</h1>
      <Link
        to="/cart"
        className="flex items-center justify-center transition-colors duration-300 border rounded-full border-border size-10 hover:border-primary"
      >
        <IoCartOutline className="size-5" />
      </Link>
    </header>
  );
}
