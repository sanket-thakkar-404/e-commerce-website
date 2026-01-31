import { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Men's Collection", path: "/categories/men" },
  { label: "Women's Collection", path: "/categories/women" },
  { label: "Leather Bag", path: "/categories/leather-bags" },
  { label: "Cart", path: "/cart" },
  { label: "My account", path: "/profile" },
  { label: "Admin", path: "/admin" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 md:px-8 h-14 flex items-center justify-between">
      <NavLink to="/" className="text-xl font-bold uppercase text-gray-900 dark:text-gray-100">
        Shop.
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, path}) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive
                  ? "text-gray-900 dark:text-gray-100"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        className="md:hidden p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <i className="ri-menu-line text-2xl"></i>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden z-50 py-4 px-4 flex flex-col gap-2">
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className="py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
