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

const Login = () => {
  const navigate = useNavigate();
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
            <Input />
          </div>
          <div>
            <p>Password</p>
            <Input />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="cursor-pointer w-full bg-black text-white">
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
