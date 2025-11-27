// <nav className="hidden md:flex flex-1 text-lg gap-10">
//     {navLinks.map((navLink) => (
//         <NavLinks key={navLink.name} {...navLink} />
//     ))}
// </nav>

import { Link } from 'react-router';
// import MobileDropdown from "./MobileDropdown";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Universities", href: "/universities" },
    { name: "Courses", href: "/courses" },
];

export default function Navbar({ isMobileOpen, closeMobileMenu  }) {
    return (
        <div className="absolute left-0 top-16 w-full bg-white shadow-md z-50">
            {navLinks.map((navLink) => (
                <Link
                    key={navLink.name}
                    href={navLink.href}
                    onClick={closeMobileMenu}
                >
                    <div className="px-6 py-6 border-b text-lg font-medium text-[#0A0A0A]">
                        {navLink.name}
                    </div>
                </Link>
            ))}

            {isMobileOpen && (
                <MobileDropdown closeMenu={closeMobileMenu} />
            )}
        </div>
    );
}
