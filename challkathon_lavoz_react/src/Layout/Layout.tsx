import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <Header />
      <div className="w-screen max-w-[1000px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
