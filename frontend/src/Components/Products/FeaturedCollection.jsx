import { Link } from "react-router-dom";
import FeaturedImage from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-8 items-center bg-green-200 rounded-3xl">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover our collection of stylish and comfortable apparel that will
            keep you looking and feeling your best.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-all"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <img
            src={FeaturedImage}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-r-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
