import { useEffect, useState } from "react";
import RegisterImage from "../assets/register.webp";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiUserHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something else
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <section className=" flex h-[650px]">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="p-8 md:p-12 w-full md:w-1/2 flex items-center justify-center mt-20"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col items-center justify-center rounded-lg shadow-md shadow-black/50 px-8 py-3"
        >
          <h1 className="text-3xl font-regular font-[LogoFont]">ThreadScape</h1>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Welcome!{"   "}
            <RiUserHeartFill className="w-4 h-4" />
          </h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition font-semibold"
          >
            {loading ? "Loading..." : "Register"}
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?
            <Link
              to={`/login/redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500 hover:underline"
            >
              {" "}
              Log In
            </Link>
          </p>
        </form>
      </motion.div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <img
          src={RegisterImage}
          alt="Login Image"
          className="w-full h-[650px] object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
