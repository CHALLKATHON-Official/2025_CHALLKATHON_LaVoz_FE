import { apiClient } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface noteInterface {
  noteId: number;
  title: string;
  content: string;
  emotion: string;
  time: string;
  memberId: number;
  memberName: string;
  memberRole: string;
  organizationId: number;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
  comments?: [
    {
      commentId: number;
      content: string;
      memberId: number;
      memberName: string;
      memberRole: string;
      noteId: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

interface organizationInterface {
  organizationId: number;
  name: string;
  notes?: noteInterface[];
}

const AfterSignin = () => {
  const [newOrgaName, setNewOrgaName] = useState("");
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
    <div className="px-8 py-10">
      <div className="font-bold">접속할 오가니제이션을 선택해주세요</div>

      <div className="pt-5 flex justify-end">
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
      </div>

      <div className="my-5 max-w-[900px] mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>아이디</TableHead>
              <TableHead>오가니제이션 이름</TableHead>
              <TableHead>접속</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orgas.map((orga) => (
              <TableRow key={orga.organizationId}>
                <TableCell>{orga.organizationId}</TableCell>
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
