import { useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "../features/header/Navbar.jsx";
import Container from "./Container";
import Logo from "./Logo";

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <Container
      className={`py-3 bg-blue-900 ${
        isMobileOpen ? "bg-white" : "bg-blue-900"
      }`}
    >
      <header className="flex items-center gap-8 md:justify-between">
        {/* Hamburger */}
        <button onClick={toggleMenu} className="text-orange-400 md:hidden">
          {isMobileOpen ? <X /> : <Menu />}
        </button>

        <Logo isMobileOpen={isMobileOpen} />

        {/* Navbar */}
        <div>
          <Navbar closeMobileMenu={isMobileOpen} />
        </div>
      </header>
    </Container>
  );
};

export default Header;
