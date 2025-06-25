import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheckIcon } from "lucide-react";

const MyPage = () => {
  return (
    <div>
      <div className="text-3xl font-bold py-10">마이페이지</div>
      <div className="border-2 rounded-xl flex items-center py-5 max-w-[900px] mx-auto justify-center gap-2 mb-5">
        <div
          className="size-40 bg-center bg-cover rounded-full"
          style={{
            backgroundImage: `url("https://avatars.githubusercontent.com/u/127468786?v=4)`,
          }}
        />
        <div className="font-bold text-5xl">이서연</div>
        <div>
          <Badge variant="secondary" className="bg-blue-500 text-white">
            <BadgeCheckIcon /> 부모
          </Badge>
          <div className="text-neutral-400 font-thin">
            phenomenal312@naver.com
          </div>
        </div>
        <div className="self-start mx-2">
          <Button>내 정보 변경</Button>
        </div>
      </div>

      {/* <div className="border-2 rounded-xl py-5 max-w-[900px] mx-auto gap-2 mb-5">
        
      </div> */}
    </div>
  );
};

export default MyPage;
