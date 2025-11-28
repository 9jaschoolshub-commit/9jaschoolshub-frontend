import { useState } from "react";
import { Menu, X } from "lucide-react";
import Navbar from "../components/headerComponents/Navbar.jsx";
import Container from "./Container";
import Logo from "./Logo";

const Header = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMenu = () => setIsMobileOpen(!isMobileOpen);
    const closeMenu = () => setIsMobileOpen(false);

    return (
        <Container className="py-3 bg-blue-900">
            <header className="flex items-center gap-8 md:justify-between">

                {/* Hamburger */}
                <button onClick={toggleMenu} className="text-white md:hidden">
                    {isMobileOpen ? <X /> : <Menu />}
                </button>

                <Logo />

                {/* Desktop Navbar */}
                <div className="hidden md:block">
                    <Navbar />
                </div>
            </header>

            {/* Mobile Dropdown */}
            {isMobileOpen && (
                <div className="md:hidden absolute left-0 w-full bg-white shadow-md mt-3 rounded-lg">
                    <Navbar closeMobileMenu={closeMenu} />
                </div>
            )}

        </Container>
    );
};

export default Header;
