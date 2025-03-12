import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionsPage from "./pages/CollectionsPage";
import ProductDetails from "./Components/Products/ProductDetails";
import Checkout from "./Components/Cart/Checkout";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./Components/Admin/UserManagement";
import ProductManagement from "./Components/Admin/ProductManagement";
import OrderManagement from "./Components/Admin/OrderManagement";
import EditProductPage from "./Components/Admin/EditProductPage";

import { Provider } from "react-redux";
import store from "./redux/store";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import CreateProductPage from "./Components/Admin/CreateProduct";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            {/* User Layout */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="collections/:collection"
              element={<CollectionsPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="/purchase-cancel" element={<PurchaseCancelPage />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            {/* Admin Layout */}
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="products/create" element={<CreateProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
