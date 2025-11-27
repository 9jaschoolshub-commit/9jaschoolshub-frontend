import { navLinks } from "../../../data/navData";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    // desktop nav
    <nav className="hidden md:flex flex-1 text-lg gap-10">
      {navLinks.map((navLink) => (
        <NavLinks key={navLink.name} {...navLink} />
      ))}
    </nav>

    // mobile nav
    /**
     * Todo
     * Implement nav section for mobile
     */
  );
};
export default Navbar;
