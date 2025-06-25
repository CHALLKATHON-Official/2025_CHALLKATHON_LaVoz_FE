import {
  Card,
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
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // 파이 차트 데이터
  const pieData = [
    { name: "자기전 루틴", value: 8 },
    { name: "식사 전 행동", value: 5 },
    { name: "외출 전 루틴", value: 3 },
  ];

  // 바 차트 데이터
  const barData = [
    { day: "월", count: 3 },
    { day: "화", count: 5 },
    { day: "수", count: 2 },
    { day: "목", count: 6 },
    { day: "금", count: 4 },
    { day: "토", count: 1 },
    { day: "일", count: 2 },
  ];

  // 파이 차트 색상
  const COLORS = ["#CEDEF2", "#A0C4F2", "#6DA7F2"];
  return (
    <div className="pt-5 pb-10">
      <div className="text-3xl font-bold pt-10 pb-5">이서연의 상태</div>
      <div className="space-y-4 py-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {/* 시간 별 빈번한 행동/감정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                시간 별 빈번한 행동/감정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">시간대</TableHead>
                    <TableHead className="px-6">행동</TableHead>
                    <TableHead className="px-6">감정</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">아침</TableCell>
                    <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                      일어날 때 꼭 인형이 옆에 있어야하고 밥을 먹을때 좋아하는
                      캐릭터 숟가락을 써야해요
                    </TableCell>
                    <TableCell className="flex items-center space-x-2 break-keep">
                      <div>😵‍💫</div>
                      <div>아침 루틴이 깨지면 불안해해요</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">점심</TableCell>
                    <TableCell>동일하게 행동 설명 넣기</TableCell>
                    <TableCell className="flex items-center space-x-2 break-keep">
                      <div>😵‍💫</div>
                      <div>동일하게 감정 설명</div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">저녁</TableCell>
                    <TableCell>동일하게 행동 설명 넣기</TableCell>
                    <TableCell className="flex items-center space-x-2 break-keep">
                      <div>😵‍💫</div>
                      <div>동일하게 감정 설명</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
          {/* 카테고리 별 행동 발생 횟수 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">
                카테고리 별 행동 발생 횟수
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center gap-x-12 px-4">
              {/* 파이차트 영역 */}
              <div className="w-[180px]">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius="100%"
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
              </div>

              {/* 파이 조각 설명 영역 */}
              <div className="space-y-2 text-sm">
                {pieData.map((entry, index) => (
                  <div key={`legend-${index}`} className="flex items-center">
                    <div
                      className="w-3 h-3 mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="break-keep">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* 요일 별 이상 횟수 */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">요일 별 이상 횟수</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#71A4D9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1  gap-4">
          {/* 오늘의 감정 흐름 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">오늘의 감정 흐름</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* 수직선 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-200 z-0"></div>

                <div className="space-y-12">
                  {/* 첫 번째 감정 */}
                  <div className="flex items-center justify-between relative">
                    {/* 왼쪽 박스 */}
                    <div className="w-1/2 pr-6 flex justify-end">
                      <div className="bg-white p-4 rounded-md shadow w-60">
                        <div className="flex flex-row items-center space-x-4">
                          <div className="text-2xl">😄</div>
                          <div className="text-sm  mb-1">08:00</div>
                        </div>
                        <div className="text-sm  mt-1">기분 좋게 등원함</div>
                      </div>
                    </div>
                    {/* 시점 동그라미 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white z-10"></div>
                    {/* 오른쪽 빈칸 */}
                    <div className="w-1/2"></div>
                  </div>

                  {/* 두 번째 감정 */}
                  <div className="flex items-center justify-between relative">
                    {/* 왼쪽 빈칸 */}
                    <div className="w-1/2"></div>
                    {/* 시점 동그라미 */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-yellow-400 rounded-full border-4 border-white z-10"></div>
                    {/* 오른쪽 박스 */}
                    <div className="w-1/2 pl-6 flex justify-start">
                      <div className="bg-white p-4 rounded-md shadow w-60">
                        <div className="flex flex-row items-center space-x-4">
                          <div className="text-2xl">😫</div>
                          <div className="text-sm  mb-1">12:30</div>
                        </div>
                        <div className="text-sm  mt-1">
                          낮잠 후 기분이 나빠졌음
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 세번째  */}
                  <div className="flex items-center justify-between relative">
                    <div className="w-1/2 pr-6 flex justify-end">
                      <div className="bg-white p-4 rounded-md shadow w-60">
                        <div className="flex flex-row items-center space-x-4">
                          <div className="text-2xl">😵‍💫</div>
                          <div className="text-sm  mb-1">18:00</div>
                        </div>
                        <div className="text-sm  mt-1">
                          루틴이 깨져서 불안함
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-red-400 rounded-full border-4 border-white z-10"></div>
                    <div className="w-1/2"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 특정 감정일 때 자주 발생한 행동 매칭 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                특정 감정일 때 자주 발생한 행동 매칭
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😄</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    루틴을 잊지마세요
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😫</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    등을 약하게 두드려 주세요
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😵‍💫</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    안정감을 느끼던 노래를 들려주세요
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
