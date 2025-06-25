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
import { useForm, Controller } from "react-hook-form";
import { apiClient } from "@/api/client";

const Signup = () => {
  const navigate = useNavigate();
  interface userRegisterInterface {
    loginId: string;
    password: string;
    passwordCheck: string;
    name: string;
    role: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<userRegisterInterface>();
  const onSubmit = async (data: userRegisterInterface) => {
    await apiClient
      .post("/member/register", {
        loginId: data.loginId,
        password: data.password,
        name: data.name,
        role: data.role,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <p>이름</p>
              <Input
                {...register("name", {
                  required: { value: true, message: "이 영역은 필수입니다." },
                })}
              />
              {errors.name ? (
                <p className="text-red-400">{errors.name.message}</p>
              ) : null}
            </div>
            <div>
              <p>아이디</p>
              <Input
                {...register("loginId", {
                  required: { value: true, message: "이 영역은 필수입니다." },
                })}
              />
              {errors.loginId ? (
                <p className="text-red-400">{errors.loginId.message}</p>
              ) : null}
            </div>
            <div>
              <p>비밀번호</p>
              <Input
                type="password"
                {...register("password", {
                  required: { value: true, message: "이 영역은 필수입니다." },
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8-20자 사이어야 합니다.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 8-20자 사이어야 합니다.",
                  },
                })}
              />
              {errors.password ? (
                <p className="text-red-400">{errors.password.message}</p>
              ) : null}
            </div>
            <div>
              <p>비밀번호 확인</p>
              <Input
                type="password"
                {...register("passwordCheck", {
                  required: { value: true, message: "이 영역은 필수입니다." },
                  validate: (data) => {
                    return data === watch("password") || "비밀번호가 다릅니다.";
                  },
                })}
              />
              {errors.passwordCheck ? (
                <p className="text-red-400">{errors.passwordCheck.message}</p>
              ) : null}
            </div>
            <div>
              <p>역할</p>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: { value: true, message: "이 영역은 필수입니다." },
                }}
                render={({ field }) => (
                  <>
                    <Select value={field.value} onValueChange={field.onChange}>
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
                    {errors.role ? (
                      <p className="text-red-400">{errors.role.message}</p>
                    ) : null}
                  </>
                )}
              />
            </div>
            <Button
              type="submit"
              className="cursor-pointer w-full bg-black text-white"
            >
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
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
