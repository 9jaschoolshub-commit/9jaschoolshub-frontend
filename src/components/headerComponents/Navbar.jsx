import { Link } from "react-router";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Universities", href: "/universities" },
    { name: "Courses", href: "/courses" },
];

export default function Navbar({ closeMobileMenu }) {
    return (
        <nav className="flex flex-col md:flex-row gap-6">
            {navLinks.map((navLink) => (
                <Link
                    key={navLink.name}
                    to={navLink.href}
                    onClick={closeMobileMenu}
                    className="text-lg font-medium text-black md:text-white px-2 py-4 md:py-0 border-b border-gray-300 md:border-none"
                >
                    {navLink.name}
                </Link>
            ))}
        </nav>
    );
}
