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
    <div className={"header w-full px-4 py-2 border-b-1 text-black bg-white"}>
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
            className="text cursor-pointer"
          >
            공유노트
          </div>
          <div
            onClick={() => navigate("/dashboard")}
            className="text cursor-pointer"
          >
            대시보드
          </div>

          <div
            onClick={() => navigate("/community")}
            className="text cursor-pointer"
          >
            커뮤니티
          </div>
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
              <DropdownMenuItem onClick={() => navigate("/login")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
