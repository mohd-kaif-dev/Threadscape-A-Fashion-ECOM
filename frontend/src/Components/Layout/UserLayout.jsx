import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const UserLayout = () => {
  return (
    <div className="bg-neutral-100">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
