import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <figure className="flex items-center justify-center space-x-2 w-max">
      <img src={logo} alt="9jaschoolshub Logo" width={43} height={38} />
      <Link
        to="/"
        className="text-xl font-bold
         text-white"
      >
        9jaschoolshub
      </Link>
    </figure>
  );
};
export default Logo;
