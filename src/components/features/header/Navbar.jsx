import { navLinks } from "../../../data/navData";
import NavLinks from "./NavLinks";

const Navbar = ({ isMobileOpen, closeMobileMenu }) => {
  return (
    <>
      {/* desktop nav */}
      <nav className="hidden md:flex flex-1 text-lg gap-10">
        {navLinks.map((navLink) => (
          <NavLinks key={navLink.name} {...navLink} />
        ))}
      </nav>

      {/* mobile nav */}
      {isMobileOpen && (
        <nav className="md:hidden absolute bg-white top-15 w-full h-auto left-0 px-4 py-8 flex flex-col gap-10 z-100">
          {navLinks.map((navLink) => (
            <div key={navLink.name} className="w-full text-xl border-t-2 border-solid border-gray-400 pt-8">
              <NavLinks onClick={closeMobileMenu} {...navLink} />
            </div>
          ))}
        </nav>
      )}
    </>
  );
};
export default Navbar;
