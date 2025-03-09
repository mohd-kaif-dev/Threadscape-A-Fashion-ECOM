import {
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
  HiShoppingBag,
} from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-full mb-4">
            <HiShoppingBag className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2 font-bold">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-sm text-gray-600 tracking-tighter">
            On all orders above $100
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-full mb-4">
            <HiArrowPathRoundedSquare className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2 font-bold">45 DAYS RETURN</h4>
          <p className="text-sm text-gray-600 tracking-tighter">
            Money back guarantee
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 rounded-full mb-4">
            <HiOutlineCreditCard className="text-2xl" />
          </div>
          <h4 className="tracking-tighter mb-2 font-bold">SECURE CHECKOUT</h4>
          <p className="text-sm text-gray-600 tracking-tighter">
            100% secure checkout process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
