import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
const TopBar = () => {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex items-center justify-between py-1.5 px-4 gap-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="w-5 h-5 " />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="w-5 h-5 " />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="w-4 h-4 " />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We ship Worldwide - Fast and Reliable Shipping!</span>
        </div>
        <div className="hidden md:block text-sm">
          <a href="tel:+919616992527" className="hover:text-gray-300">
            +91 961-699-2527
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
