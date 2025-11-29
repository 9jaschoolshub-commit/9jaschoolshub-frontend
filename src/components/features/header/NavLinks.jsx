import { NavLink } from "react-router-dom";

const NavLinks = ({ path, name, onClick }) => {
  const getClassName = ({ isActive }) => {
    const baseClasses =
      "relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full";
    const activeClasses = isActive
      ? "text-black md:text-white hover:text-gray-200 after:w-full"
      : "text-black md:text-white hover:text-orange-400";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <NavLink onClick={onClick} to={path} className={getClassName}>
      {name}
    </NavLink>
  );
};
export default NavLinks;
