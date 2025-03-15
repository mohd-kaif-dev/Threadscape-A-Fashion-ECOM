import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta, TbPhoneCall } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isCollectionPage = location.pathname.includes("collections");
  const handleScroll = () => {
    isCollectionPage
      ? window.scroll({ top: 0, behavior: "smooth" })
      : window.scrollTo(0, 0);
  };

  return (
    <footer className="border-t pt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0 ">
        {/* Newsletter section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Newsletter
          </h3>
          <p className="text-xs text-gray-600 mb-3">
            Be the first to hear about our new products, exclusive events, and
            special offers.
          </p>
          <p className="text-xs font-medium text-gray-600 mb-6">
            Sign Up and get 10% off on your first order.
          </p>
          {/* Newsletter Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full rounded-l-md border-gray-300 text-xs border-t border-l border-b focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all "
              required
            />
            <button
              type="submit"
              className="bg-black text-white p-3 rounded-r-md text-sm hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop Links */}
        <div onClick={handleScroll}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Shop</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link
                to="/collections/all?category=Top+Wear&gender=Men"
                className=" hover:text-black text-sm"
              >
                Men&apos;s Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?category=Top+Wear&gender=Women"
                className=" hover:text-black text-sm"
              >
                Women&apos;s Top Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?category=Bottom+Wear&gender=Men"
                className=" hover:text-black text-sm"
              >
                Men&apos;s Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="/collections/all?category=Bottom+Wear&gender=Women"
                className=" hover:text-black text-sm"
              >
                Women&apos;s Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <nav className="flex flex-col space-y-2">
            <Link to="#" className="text-gray-700 hover:text-black text-sm">
              Contact Us
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm">
              About Us
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm">
              FAQs
            </Link>
            <Link to="#" className="text-gray-700 hover:text-black text-sm">
              Features
            </Link>
          </nav>
        </div>
        {/* Socials Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Follow Us
          </h3>
          <nav className="flex items-center text-center space-x-2 mb-6 text-gray-500">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black "
            >
              <TbBrandMeta className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              <IoLogoInstagram className="w-5 h-5 " />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              <RiTwitterXLine className="w-4 h-4 " />
            </a>
          </nav>
          <h3 className="text-gray-800 ">Call Us</h3>
          <div className="flex items-center text-sm">
            <TbPhoneCall className="w-4 h-4 mr-2" />
            <a
              href="tel:+919616992527"
              className="hover:text-gray-500 font-bold"
            >
              +91 961-699-2527
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container flex items-center justify-center mx-auto mt-12 px-4 lg:px-0 border-t border-gray-300 p-3">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          &copy; 2025, CompileTab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
