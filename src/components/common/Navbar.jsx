import Logo from "../../assets/images/Logo.png";
import Button from "./Button";
import { Link } from "react-router-dom";

const NavItems = [
];

const loginButton = "Login";

const Navbar = () => {
  return (
    <>
      <div className="max-w-[1120px] px-6 xl:px-0 mx-auto flex justify-between items-center py-6">
        <div>
          <img src={Logo} alt="Logo" className="w-[109px] h-[24px]" />
        </div>
        <div>
          <ul className="flex justify-center gap-6 text-[16px] leading-[24px] font-poppins font-medium text-[#999999]">
            {NavItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center items-center gap-6">
          <Link to={"/login"}>
            <Button className="px-6 py-2 lg:py-4 bg-[#1061E5] text-white">
              {loginButton}
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
