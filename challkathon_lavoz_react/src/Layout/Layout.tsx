import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <div className="w-full px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

// const Layout = () => {
//   return (
//     <div className="min-h-screen flex flex-col justify-between">
//       <Header />
//       <div className="w-screen max-w-[1000px] px-4">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;
