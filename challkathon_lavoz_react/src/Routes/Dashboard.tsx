import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const pieData = [
    { name: "자기전 루틴", value: 8 },
    { name: "식사 전 행동", value: 5 },
    { name: "외출 전 루틴", value: 3 },
  ];

  const COLORS = ["#CEDEF2", "#A0C4F2", "#6DA7F2"]; // 원하는 색상 배열
  return (
    <div>
      <div className="text-3xl font-bold py-10">Dashboard</div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">시간 별 빈번한 행동/감정</CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">시간대</TableHead>
                  <TableHead className="w-[100px]">행동</TableHead>
                  <TableHead className="w-[100px]">감정</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">아침</TableCell>
                  <TableCell className="break-keep whitespace-pre-wrap">
                    일어날 때 꼭 인형이 옆에 있어야하고 밥을 먹을때 좋아하는
                    캐릭터 숟가락을 써야해요
                  </TableCell>
                  <TableCell className="break-keep whitespace-pre-wrap space-y-1">
                    <div>😵‍💫</div>
                    <div>아침 루틴이 깨지면 불안해해요</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">점심</TableCell>
                  <TableCell>동일하게 행동 설명 넣기</TableCell>
                  <TableCell className="break-keep whitespace-pre-wrap space-y-1">
                    <div>😵‍💫</div>
                    <div>동일하게 감정 설명</div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">저녁</TableCell>
                  <TableCell>동일하게 행동 설명 넣기</TableCell>
                  <TableCell className="break-keep whitespace-pre-wrap space-y-1">
                    <div>😵‍💫</div>
                    <div>동일하게 감정 설명</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">
              카테고리 별 행동 발생 횟수
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
