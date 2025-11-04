import { NavLink } from "react-router-dom";

const NavLinks = ({ path, name }) => {
  const getClassName = ({ isActive }) => {
    const baseClasses =
      "relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full";
    const activeClasses = isActive
      ? "text-white hover:text-gray-200 after:w-full"
      : "text-white hover:text-orange-400";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <NavLink to={path} className={getClassName}>
      {name}
    </NavLink>
  );
};
export default NavLinks;
