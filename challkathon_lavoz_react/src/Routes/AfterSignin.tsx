import { apiClient } from "@/api/client";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { organizationInterface } from "@/types/organization";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AfterSignin = () => {
  const [newOrgaName, setNewOrgaName] = useState("");
  const [invitation, setInvitation] = useState("");
  const [orgas, setOrgas] = useState<organizationInterface[]>([]);
  const navigate = useNavigate();
  const onCreate = async () => {
    await apiClient
      .post("/organization/new", {
        organizationName: newOrgaName,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err));

    window.location.reload();
  };

  useEffect(() => {
    const getOrga = async () => {
      await apiClient
        .get("/organization")
        .then((res) => {
          setOrgas(res.data.result);
        })
        .catch((err) => console.log(err));
    };

    getOrga();
  }, []);
  return (
    <div className="px-8 py-10 w-full max-w-[900px] mx-auto">
      <div className="font-bold">접속할 오가니제이션을 선택해주세요</div>

      <div className="pt-5 flex justify-end gap-3">
        <Drawer>
          <DrawerTrigger>
            <Button>새 오가니제이션 생성하기</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                새로 생성하려고 하는 오가니제이션의 소유자 이름을 입력해주세요
              </DrawerTitle>
              <DrawerDescription>본명을 작성해주세요</DrawerDescription>
            </DrawerHeader>
            <div className="h-[40vh] w-full max-w-[900px] mx-auto mt-10 px-10">
              <Input onChange={(e) => setNewOrgaName(e.target.value)} />
              <Button className="w-full mt-2" onClick={onCreate}>
                제출하기
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger>
            <Button>초대코드 입력하기</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>초대 코드를 입력해주세요</DrawerTitle>
            </DrawerHeader>
            <div className="h-[40vh] w-full max-w-[900px] mx-auto mt-10 px-10">
              <Input onChange={(e) => setInvitation(e.target.value)} />
              <Button
                className="w-full mt-2"
                onClick={async () => {
                  await apiClient
                    .post("/organization/join", {
                      inviteCode: invitation,
                    })
                    .then(() => {
                      window.location.reload();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                제출하기
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="my-5 max-w-[900px] mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>아이디</TableHead>
              <TableHead>초대코드</TableHead>
              <TableHead>오가니제이션 이름</TableHead>
              <TableHead>접속</TableHead>
              <TableHead>삭제</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orgas.map((orga) => (
              <TableRow key={orga.organizationId}>
                <TableCell>{orga.organizationId}</TableCell>
                <TableCell>{orga.inviteCode}</TableCell>
                <TableCell>{orga.name}</TableCell>
                <TableCell>
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      localStorage.setItem(
                        "currentOrganizationId",
                        `${orga.organizationId}`
                      );
                      navigate("/");
                    }}
                  >
                    접속하기
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="cursor-pointer bg-red-400 hover:bg-red-500"
                    onClick={async () => {
                      const ok = confirm("정말로 삭제하시겠습니까?");
                      if (ok) {
                        localStorage.removeItem("currentOrganizationId");
                        await apiClient
                          .delete(`/organization/${orga.organizationId}`)
                          .catch((err) => console.log(err));
                      }
                      window.location.reload();
                    }}
                  >
                    삭제하기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <Card className="">
          <CardHeader>
            <CardTitle>새 오가니제이션 생성하기</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>생성</Button>
          </CardContent>
        </Card> */}

        {/* <Card className="">
          <CardHeader>
            <CardTitle>새 오가니제이션 연결하기</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>초대 코드 입력</Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default AfterSignin;
