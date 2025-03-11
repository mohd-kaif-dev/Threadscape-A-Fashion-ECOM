import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";

const AdminSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/admin" className="text-5xl font-medium font-[LogoFont]">
          ThreadScape
        </Link>
      </div>
      <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
      <nav onClick={toggleSidebar} className="flex flex-col space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-zinc-700 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700"
              : "text-gray-300 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700 hover:text-white"
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-zinc-700 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700"
              : "text-gray-300 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700 hover:text-white"
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-zinc-700 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700"
              : "text-gray-300 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700 hover:text-white"
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-zinc-700 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700"
              : "text-gray-300 py-3 px-4 rounded flex items-center space-x-2 hover:bg-zinc-700 hover:text-white"
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
