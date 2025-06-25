import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Issue from "@/components/elements/Issue/Issue";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Issue />
      <Header />
      <div className="flex-grow px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
