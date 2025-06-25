import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
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
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, loggedIn } = useAuth();

  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleLogin = async () => {
    if (!loginId || !password) {
      toast.error("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      await login({ loginId: loginId, password });
      toast.success("로그인 되었습니다");
    } catch {
      toast.error("로그인에 실패하였습니다.");
      setLoginId("");
      setPassword("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center space-x-2 mb-4">
        <img src={Logo} alt="logo" className="w-20" />
        <div className="font-bold text-2xl pr-6">Logtism</div>
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardAction>
            <Button
              onClick={() => navigate("/signup")}
              className="cursor-pointer"
              variant="link"
            >
              Sing up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p>ID</p>
            <Input
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>
          <div>
            <p>Password</p>
            <Input
              type="password"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              className="cursor-pointer w-full bg-black text-white"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
