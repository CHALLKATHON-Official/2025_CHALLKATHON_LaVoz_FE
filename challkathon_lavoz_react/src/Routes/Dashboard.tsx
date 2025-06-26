import { useEffect, useState } from "react";
import { isSameDay, parseISO, format } from "date-fns";
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
import type { Note as NoteType } from "@/types/note";

import { useAllNotes } from "@/api/note.api";
import { useOrganization } from "@/api/organization.api";
import { useSearchNote, useSimilaritySearch } from "@/api/noteSearch.api";

const Dashboard = () => {
  const [todaysNotes, setTodaysNotes] = useState<NoteType[]>([]);
  const [barData, setBarData] = useState<{ day: string; count: number }[]>([]);
  const { data: organization } = useOrganization();
  const organizationId = organization?.result[0].organizationId;
  const { data: notes } = useAllNotes(organizationId);
  const { data: happyNotes } = useSimilaritySearch("행복해", organizationId);
  const { data: angryNotes } = useSimilaritySearch("화났어", organizationId);
  const { data: anxiousNotes } = useSimilaritySearch("불안해", organizationId);
  const { data: searchNotes } = useSearchNote("루틴", organizationId);

  const actionNotes = todaysNotes.filter((note) => note.emotion === "행동");
  const emotionNotes = todaysNotes.filter((note) => note.emotion === "감정");
  const issueNotes = todaysNotes.filter((note) => note.emotion === "이슈");

  // 파이 차트 데이터
  const pieData = [
    { name: "행동", value: actionNotes.length },
    { name: "감정", value: emotionNotes.length },
    { name: "이슈", value: issueNotes.length },
  ];

  useEffect(() => {
    const today = new Date();

    const todays = notes?.filter((note: NoteType) =>
      isSameDay(parseISO(note.createdAt), today)
    );

    setTodaysNotes(todays || []);
    const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
    const counts: Record<string, number> = {
      월: 0,
      화: 0,
      수: 0,
      목: 0,
      금: 0,
      토: 0,
      일: 0,
    };

    issueNotes?.forEach((note: NoteType) => {
      const day = format(parseISO(note.createdAt), "eee", {
        locale: undefined,
      });

      const dayMap: Record<string, string> = {
        Mon: "월",
        Tue: "화",
        Wed: "수",
        Thu: "목",
        Fri: "금",
        Sat: "토",
        Sun: "일",
      };
      const koreanDay = dayMap[day];
      if (koreanDay) {
        counts[koreanDay]++;
      }
    });

    const resultBarData = weekDays.map((day) => ({
      day,
      count: counts[day],
    }));

    setBarData(resultBarData);
    console.log(resultBarData);
  }, [issueNotes, notes]);

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
              <CardTitle className="text-lg">카테고리 별 발생 횟수</CardTitle>
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
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {/* 오늘의 감정 흐름 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">오늘의 행동 흐름</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* 수직선 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-200 z-0"></div>

                <div className="space-y-6">
                  {todaysNotes.map((note, index) => (
                    <div
                      key={note.noteId}
                      className="flex items-center justify-between relative"
                    >
                      {/* 홀수 인덱스: 오른쪽, 짝수 인덱스: 왼쪽 */}
                      {index % 2 === 0 ? (
                        <>
                          <div className="w-1/2 pr-6 flex justify-end">
                            <div className="bg-white p-4 rounded-md shadow w-60">
                              <div className="flex flex-row items-center space-x-4">
                                <div className="text-2xl">📝</div>
                                <div className="text-sm mb-1">
                                  {format(parseISO(note.createdAt), "HH:mm")}
                                </div>
                              </div>
                              <div className="text-sm mt-1">{note.content}</div>
                            </div>
                          </div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white z-10"></div>
                          <div className="w-1/2"></div>
                        </>
                      ) : (
                        <>
                          <div className="w-1/2"></div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white z-10"></div>
                          <div className="w-1/2 pl-6 flex justify-start">
                            <div className="bg-white p-4 rounded-md shadow w-60">
                              <div className="flex flex-row items-center space-x-4">
                                <div className="text-2xl">📝</div>
                                <div className="text-sm mb-1">
                                  {format(parseISO(note.createdAt), "HH:mm")}
                                </div>
                              </div>
                              <div className="text-sm mt-1 break-keep">
                                {note.content}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
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
                    {happyNotes?.map((similarity: NoteType) => (
                      <div key={similarity.noteId}>{similarity.content}</div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😫</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    {angryNotes?.map((similarity: NoteType) => (
                      <div key={similarity.noteId}>{similarity.content}</div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😵‍💫</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    {anxiousNotes?.map((similarity: NoteType) => (
                      <div key={similarity.noteId}>{similarity.content}</div>
                    ))}
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
