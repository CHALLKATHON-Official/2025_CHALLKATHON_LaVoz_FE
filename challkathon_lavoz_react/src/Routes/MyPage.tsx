import { apiClient } from "@/api/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { AlertCircleIcon, BadgeCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Face from "@/Assets/face.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FemaleFace from "@/Assets/FemaleFace.png";

interface boardInterface {
  boardId: number;
  title: string;
  content: string;
  memberId: number;
  memberName: string;
  createdAt: string;
  updatedAt: string;
}

enum Role {
  ROLE_GUARDIAN = "보호자",
  ROLE_DOCTOR = "의사",
  ROLE_COUNSLER = "상담사",
  ROLE_CHILD = "본인",
}

interface userInterface {
  memberCreationDate?: string;
  memberUpdateDate?: string;
  memberId?: number;
  memberName?: string;
  loginId?: string;
  role?: keyof Role;
  imageUrl?: string;
  childName?: string;
  childBirthday?: string;
  childGender?: string;
  childImageUrl?: string;
}

enum Gender {
  MALE = "남성",
  FEMALE = "여성",
}

const MyPage = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<boardInterface[]>([]);
  const [user, setUser] = useState<userInterface>();
  const { control, register, handleSubmit } = useForm<userInterface>();
  const date = new Date();
  const [main, setMain] = useState("Unknown");

  const onUserChange = async (data: userInterface) => {
    await apiClient
      .put("/member/me", {
        name: user?.memberName,
        imageUrl: "",
        childName: data.childName,
        childGender: data.childGender,
        childBirthday: data.childBirthday,
        childImageUrl: data.childImageUrl,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  useEffect(() => {
    const getUser = async () => {
      await apiClient
        .get("/member/me")
        .then((res) => {
          setUser(res.data.result);
        })
        .catch((err) => console.log(err));
    };

    const getCurrentOrga = async () => {
      const info = (await apiClient.get(`/organization`)).data.result;
      const currentOrgaId = Number(
        localStorage.getItem("currentOrganizationId")
      );
      const res = info.filter((i: any) => i.organizationId === currentOrgaId);
      setMain(res[0].name);
    };

    getUser();
    getCurrentOrga();
  }, []);

  useEffect(() => {
    const getBookmarks = async () => {
      if (modal) {
        await apiClient
          .get("/boards/bookmarks")
          .then((res) => setBookmarks(res.data.result))
          .catch((err) => console.log(err));
      }
    };

    getBookmarks();
  }, [modal]);

  return (
    <div>
      {modal ? (
        <div
          onClick={() => setModal(false)}
          className="w-screen h-screen flex items-center justify-center bg-black/30 absolute top-0 left-0"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[90%] h-[80%] rounded-xl px-6 py-5 "
          >
            <div className="font-bold text-2xl mb-4">Bookmarks</div>
            <div className="flex flex-col gap-4 h-[90%] overflow-y-scroll">
              {bookmarks.length > 0 ? (
                bookmarks.map((b) => (
                  <Card
                    key={b.boardId}
                    onClick={() => navigate(`/community/${b.boardId}`)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{b.title}</CardTitle>
                      <CardDescription>
                        {b.content.length > 100
                          ? b.content.slice(0, 100) + "..."
                          : b.content}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex space-x-2 text-sm">
                      <div className="text-gray-500">
                        {Math.ceil(
                          (new Date().getTime() -
                            new Date(b.createdAt).getTime()) /
                            (1000 * 60 * 60 * 24)
                        ) <= 1
                          ? Math.floor(
                              (new Date().getTime() -
                                new Date(b.createdAt).getTime()) /
                                (1000 * 60)
                            ) + "분 전"
                          : Math.floor(
                              (new Date().getTime() -
                                new Date(b.createdAt).getTime()) /
                                (1000 * 60 * 60 * 24)
                            ) + "일 전"}
                      </div>
                      <div className="text-gray-500">|</div>
                      <div className="text-gray-500">{b.memberName}</div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Alert variant="destructive" className="w-fit">
                    <AlertCircleIcon />
                    <AlertTitle>북마크한 게시물이 없습니다.</AlertTitle>
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <div className="text-3xl font-bold py-10 max-w-[900px] mx-auto">
        마이페이지
      </div>
      <div className="border-2 shadow-sm rounded-xl flex md:flex-row flex-col items-center py-5 max-w-[900px] mx-auto justify-center gap-2 mb-5">
        <div className="font-bold text-5xl">{user?.memberName}</div>
        <div className="flex gap-3">
          <div>
            <Badge variant="secondary" className="bg-blue-500 text-white">
              <BadgeCheckIcon />
              {user?.role ? Role[user.role as keyof typeof Role] : ""}
            </Badge>
            <div className="text-neutral-400 font-thin">{user?.loginId}</div>
          </div>
        </div>
        <div className="md:self-start mx-2"></div>
      </div>
      <div className="*:cursor-pointer grid md:grid-cols-2 mb-10 md:gap-3 gap-5 w-full max-w-[900px] mx-auto">
        <Card onClick={() => setModal(true)}>
          <CardHeader>
            <CardTitle>Bookmarks</CardTitle>
            <CardDescription>내가 북마크한 글 확인하기</CardDescription>
          </CardHeader>
        </Card>

        <Card onClick={() => navigate("/after")}>
          <CardHeader>
            <CardTitle>오가니제이션 변경하기</CardTitle>
            <CardDescription>내 오가니제이션 리스트 보러 가기</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="w-full max-w-[900px] mx-auto">
        <div className="gap-5">
          <div className="flex items-center gap-4">
            <div className="font-bold text-2xl">집중 대상자 정보</div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>집중 대상자 변경</Button>
              </DrawerTrigger>
              <DrawerContent>
                <form
                  className="max-w-[900px] w-full md:mx-auto px-5 mb-10"
                  onSubmit={handleSubmit(onUserChange)}
                >
                  <DrawerHeader>
                    <DrawerTitle>대상자 정보 변경</DrawerTitle>
                    <DrawerDescription>
                      대상자 정보를 변경합니다.
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="w-full flex flex-col gap-5">
                    <Input
                      {...register("childName")}
                      placeholder="대상자 이름"
                    />

                    <input
                      {...register("childBirthday")}
                      type="date"
                      className="px-3 py-1 border-1 shadow-sm rounded-md"
                      defaultValue={date?.toISOString().slice(0, 10)}
                    />

                    <Controller
                      name="childGender"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={String(field.value ?? "")}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="성별을 고르세요." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="MALE">남자</SelectItem>
                              <SelectItem value="FEMALE">여자</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <Button className="w-full">제출</Button>
                  </div>
                </form>
              </DrawerContent>
            </Drawer>
          </div>
          {user?.childName ? (
            <Alert className="mt-5">
              <AlertCircleIcon />
              <AlertTitle>
                현재 속한 오가니제이션은 회원님의 집중 대상자 오가니제이션이
                아닐 수 있습니다.
              </AlertTitle>

              <AlertDescription>
                지금 속한 오가니제이션 이름은 [ {main} ] 입니다.
              </AlertDescription>
            </Alert>
          ) : null}
        </div>

        {user?.childName ? (
          <div className="py-10">
            <div className="border-2 shadow-sm rounded-xl flex md:flex-row flex-col items-center py-5 max-w-[900px] mx-auto justify-center gap-2 mb-5">
              {user.childGender === "MALE" ? (
                <div
                  className="size-40 bg-center bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(${Face})`,
                  }}
                />
              ) : (
                <div
                  className="size-40 bg-center bg-cover rounded-full"
                  style={{
                    backgroundImage: `url(${FemaleFace})`,
                  }}
                />
              )}

              <div className="font-bold text-5xl">{user?.childName}</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={
                      user.childGender === "MALE"
                        ? "bg-blue-400 text-white"
                        : "bg-pink-400 text-white"
                    }
                  >
                    {user?.role
                      ? Gender[`${user.childGender as keyof typeof Gender}`]
                      : ""}
                  </Badge>
                </div>
                <div className="text-neutral-400 font-thin">
                  {user?.childBirthday}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card className="my-5">
            <CardHeader>
              <CardDescription>
                오가니제이션 대상자에 대한 자료가 없습니다.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyPage;
