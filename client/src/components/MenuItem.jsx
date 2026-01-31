import { NavLink } from "react-router-dom";

const MenuItem = ({ label, path, align = "center", danger }) => {
  return (
    <NavLink
      to={path}
      className={`w-full px-2 py-2 hover:bg-gray-600 text-${align} ${
        danger ? "text-red-600" : ""
      }`}
    >
      {label}
    </NavLink>
  );
};

export default MenuItem;