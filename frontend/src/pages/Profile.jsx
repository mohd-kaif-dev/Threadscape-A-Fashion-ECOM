import { useDispatch, useSelector } from "react-redux";
import MyOrderPage from "./MyOrderPage";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className=" min-h-screen">
      <div className="flex-grow p-4 md:p-5 mt-20">
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md shadow-black/50 rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{user?.name}</h1>
            <p className="text-lg text-gray-600 font-medium mb-4">
              {user?.email}
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          {/* Right Section */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrderPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
