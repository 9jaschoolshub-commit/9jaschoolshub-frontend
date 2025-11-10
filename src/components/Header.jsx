import Logo from "./headerComponents/Logo";
import Container from "./Container";
import Navbar from "./headerComponents/Navbar";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <Container className={`py-3 bg-blue-900`}>
      <header className="flex items-center justify-between">
        <Menu className="text-white md:hidden " />
        <div className="ml-[12px] md:ml-0 flex-1 md:flex-none">
          <Logo />
        </div>
        <div>
          <Navbar />
        </div>
      </header>
    </Container>
  );
};
export default Header;
