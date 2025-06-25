import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { BadgeCheckIcon } from "lucide-react";
import { useState } from "react";

const MyPage = () => {
  const [user, setUser] = useState({
    userName: "이서연",
    role: "부모",
    email: "phenomenal312@naver.com",
  });
  return (
    <div>
      <div className="text-3xl font-bold py-10">마이페이지</div>
      <div className="border-2 shadow-sm rounded-xl flex items-center py-5 max-w-[900px] mx-auto justify-center gap-2 mb-5">
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
          <Drawer>
            <DrawerTrigger asChild>
              <Button>내 정보 변경</Button>
            </DrawerTrigger>
            <DrawerContent>
              <form className="max-w-[900px] w-full mx-auto mb-10 h-[30vh]">
                <DrawerHeader>
                  <DrawerTitle>내 정보 변경</DrawerTitle>
                  <DrawerDescription>내 정보를 변경합니다.</DrawerDescription>
                </DrawerHeader>

                <div className="w-full flex flex-col gap-5">
                  <Input defaultValue={user.userName} />
                  <Input defaultValue={user.email} />
                  <Input defaultValue={user.userName} />
                  <Button className="w-full">제출</Button>
                </div>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
