import { NavLink } from "react-router-dom";

const NavLinks = ({ path, name, onClick }) => {
  const getClassName = ({ isActive }) => {
    const baseClasses =
      "relative md:after:content-[''] md:after:absolute md:after:left-0 md:after:bottom-[-2px] md:after:w-0 md:after:h-[2px] md:after:bg-orange-500 md:after:transition-all md:after:duration-300 md:hover:after:w-full";
    const activeClasses = isActive
      ? "text-orange-400 md:text-white hover:text-gray-200 md:after:w-full"
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
