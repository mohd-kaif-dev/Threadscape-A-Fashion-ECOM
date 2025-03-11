import { Link } from "react-router-dom";
import heroImg from "../../assets/HeroImage.webp";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="Hero Image"
        className="w-full h-[400px] md:h-[600px] lg:h-[625px] object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <div className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-4">
            <motion.h1
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Vacation
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              Ready
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-sm tracking-tighter md:text-lg mb-6"
          >
            Explore our vacation-ready outfits with fast worldwide shipping.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              to="#"
              className="bg-white text-gray-900 px-6 py-2 rounded-sm text-lg font-medium"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
