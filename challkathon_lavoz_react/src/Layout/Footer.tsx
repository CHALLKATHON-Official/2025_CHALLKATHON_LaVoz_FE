import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#30333a] h-[150px] px-5 py-5">
      <div
        onClick={() => navigate("/")}
        className="flex items-center justify-center space-x-4 pb-4 cursor-pointer"
      >
        <img className="w-10 h-10" src={Logo} />
        <div className="text-2xl text-white font-bold">Logtism</div>
      </div>
      <div className="w-2/3 border-gray-400 border-b mx-auto"></div>
      <div className="text-gray-200 text-center font-light text-sm pt-4">
        Copyright © LaVoz. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
