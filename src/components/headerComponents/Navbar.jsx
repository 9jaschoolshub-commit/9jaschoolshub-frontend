import { navLinks } from "../../data/navData";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <nav className="hidden md:flex flex-1 text-lg gap-10">
      {navLinks.map((navLink) => (
        <NavLinks key={navLink.name} {...navLink} />
      ))}
    </nav>
  );
};
export default Navbar;
