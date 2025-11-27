import Logo from "./Logo";
import Container from "./Container";
import Navbar from "./headerComponents/Navbar";
import { Menu } from "lucide-react";
import {useState} from "react";

const Header = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobile = () => {
        setIsMobileOpen(!isMobileOpen);
    };
  return (
    <Container className={`py-3 bg-blue-900`}>
      <header className="flex items-center justify-between">
        <button
            onClick={toggleMobile}
            className="text-white md:hidden"
            >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
        <div className="ml-[12px] md:ml-0 flex-1 md:flex-none">
          <Logo />
        </div>
        <div>
            <Navbar
                isMobileOpen={isMobileOpen}
                closeMobileMenu={() => setIsMobileOpen(false)}
            />
        </div>
      </header>
    </Container>
  );
};
export default Header;
