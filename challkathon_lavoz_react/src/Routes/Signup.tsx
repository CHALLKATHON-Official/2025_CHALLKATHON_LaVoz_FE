import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/logo.png";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center space-x-2 mb-4">
        <img src={Logo} alt="logo" className="w-20" />
        <div className="font-bold text-2xl pr-6">Logtism</div>
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">회원가입</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>이름</p>
            <Input />
          </div>
          <div>
            <p>아이디</p>
            <Input />
          </div>
          <div>
            <p>비밀번호</p>
            <Input />
          </div>
          <div>
            <p>비밀번호 확인</p>
            <Input />
          </div>
          <div>
            <p>역할</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="역할을 고르세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>역할</SelectLabel>
                  <SelectItem value="ROLE_GUARDIAN">보호자</SelectItem>
                  <SelectItem value="ROLE_DOCTOR">의사</SelectItem>
                  <SelectItem value="ROLE_COUNSLER">상담사</SelectItem>
                  <SelectItem value="ROLE_CHILD">본인</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="cursor-pointer w-full bg-black text-white">
              회원가입
            </Button>

            <CardAction className="w-full flex items-center justify-center">
              <Button
                onClick={() => navigate("/login")}
                className="cursor-pointer"
                variant="link"
              >
                로그인 하러 가기
              </Button>
            </CardAction>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
