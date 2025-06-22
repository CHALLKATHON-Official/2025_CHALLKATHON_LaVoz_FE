import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full border-b-2 px-4 py-2">
      <div className="flex justify-between">
        <div
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer"
        >
          Logtism
        </div>
        <div className="flex space-x-4 items-center">
          <div
            onClick={() => navigate("/note")}
            className="cursor-pointer text-gray-800 hover:text-black"
          >
            Note
          </div>
          <div
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer text-gray-800 hover:text-black"
          >
            Dashboard
          </div>
          <div
            onClick={() => navigate("/issue")}
            className="cursor-pointer text-gray-800 hover:text-black"
          >
            Issue
          </div>
          <div
            onClick={() => navigate("/community")}
            className="cursor-pointer text-gray-800 hover:text-black"
          >
            community
          </div>

          {/* Avatar + DropdownMenu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/yiseoffline.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/mypage")}>
                My Page
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
