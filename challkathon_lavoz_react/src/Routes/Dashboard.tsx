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
  TableCell,
  TableHead,
  TableHeader,
  TableBody,
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
import type { ChatGptStatusDto } from "@/types/organization";

import { useMemberInfo } from "@/api/member.api";
import { useAllNotes } from "@/api/note.api";
import { useOrganization, useStateAnalysis } from "@/api/organization.api";

const Dashboard = () => {
  const [todaysNotes, setTodaysNotes] = useState<NoteType[]>([]);
  const [barData, setBarData] = useState<{ day: string; count: number }[]>([]);
  const [stateAnalysis, setStateAnalysis] = useState<ChatGptStatusDto | null>(
    null
  );

  const { data: memberInfo } = useMemberInfo();
  const { data: organization } = useOrganization();
  const organizationId = organization?.result[0].organizationId;
  const { mutateAsync: analyzeState } = useStateAnalysis();
  const { data: notes } = useAllNotes(organizationId);

  useEffect(() => {
    const fetchStateAnalysis = async () => {
      if (!organizationId) return;
      try {
        const result = await analyzeState(organizationId.toString());
        setStateAnalysis(result.chatGptStatusDto);
      } catch {
        // 실패했을 경우 아무 처리 안 함
      }
    };

    fetchStateAnalysis();
  }, [organizationId, analyzeState]);

  // 파이 차트 색상
  const COLORS = ["#CEDEF2", "#A0C4F2", "#6DA7F2"];

  // 파이 차트 데이터
  const pieDataRaw = [
    { name: "시각", value: stateAnalysis?.sightSensitivity || 0 },
    { name: "청각", value: stateAnalysis?.hearingSensitivity || 0 },
    { name: "후각", value: stateAnalysis?.smellSensitivity || 0 },
    { name: "미각", value: stateAnalysis?.tasteSensitivity || 0 },
    { name: "촉각", value: stateAnalysis?.touchSensitivity || 0 },
    { name: "사회성", value: stateAnalysis?.socialSensitivity || 0 },
  ];

  // 전체 값이 0인지 검사
  const total = pieDataRaw.reduce((sum, item) => sum + item.value, 0);

  // 값이 모두 0이면 균등하게 1로 할당 (단지 보여주기용)
  const pieData =
    total === 0
      ? pieDataRaw.map((item) => ({ ...item, value: 1 }))
      : pieDataRaw;

  useEffect(() => {
    if (!notes) return;

    const today = new Date();

    // 오늘의 노트 추출
    const todays = notes.filter((note: NoteType) =>
      isSameDay(parseISO(note.createdAt), today)
    );

    setTodaysNotes(todays);

    // 이슈노트로 요일별 bar chart 데이터 계산
    const issueOnly = todays.filter(
      (note: NoteType) => note.emotion === "이슈"
    );
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

    issueOnly.forEach((note: NoteType) => {
      const day = format(parseISO(note.createdAt), "eee"); // 요일 계산
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
  }, [notes]);

  return (
    <div className="pt-5 pb-10">
      <div className="text-3xl font-bold pt-10 pb-5">
        {memberInfo?.memberName}의 상태
      </div>
      <div className="space-y-4 py-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {/* 시간 별 빈번한 행동/감정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                시간대 별 빈번한 행동/감정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="text-center">
                    <TableHead className="w-1/6">시간대</TableHead>
                    <TableHead>행동</TableHead>
                    <TableHead>카테고리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stateAnalysis && (
                    <>
                      <TableRow>
                        <TableCell className="font-medium">아침</TableCell>
                        <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                          {stateAnalysis.morningBehavior ||
                            "해당 시간대 행동 없음"}
                        </TableCell>
                        <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                          {stateAnalysis.morningEmotion || "해당 이슈 없음"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">점심</TableCell>
                        <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                          {stateAnalysis.afternoonBehavior ||
                            "해당 시간대 행동 없음"}
                        </TableCell>
                        <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                          {stateAnalysis.afternoonEmotion || "해당 이슈 없음"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">저녁</TableCell>
                        <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                          {stateAnalysis.nightBehavior ||
                            "해당 시간대 행동 없음"}
                        </TableCell>
                        <TableCell className="w-1/2 break-keep whitespace-pre-wrap">
                          {stateAnalysis.nightEmotion || "해당 이슈 없음"}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
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
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
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
                    <div>{stateAnalysis?.happyBehaviorMap}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😫</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    <div>{stateAnalysis?.sadBehaviorMap}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-6xl">😵‍💫</div>
                <Card className="w-2/3">
                  <CardContent className="break-keep">
                    <div>{stateAnalysis?.annoyingBehaviorMap}</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
