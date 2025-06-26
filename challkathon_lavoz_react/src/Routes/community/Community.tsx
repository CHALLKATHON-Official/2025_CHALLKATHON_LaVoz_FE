import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiClient } from "@/api/client";
import { useForm } from "react-hook-form";

interface onWriteInterface {
  title: string;
  content: string;
}

interface boardInterface {
  boardId: number;
  title: string;
  content: string;
  memberId: number;
  memberName: string;
  createdAt: string;
  updatedAt: string;
}

const Community = () => {
  const navigate = useNavigate();
  const [isReadyPost, setIsReadyPost] = useState<boolean>(false);
  const [board, setBoard] = useState<boardInterface[]>([]);
  const submitRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit } = useForm<onWriteInterface>();
  const onWrite = async (data: onWriteInterface) => {
    console.log(data);
    await apiClient
      .post("/boards", {
        title: data.title,
        content: data.content,
      })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    const getCommunity = async () => {
      await apiClient
        .get("/boards")
        .then((res) => setBoard(res.data.result))
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    };

    getCommunity();
  }, []);

  return (
    <div className="space-y-4 py-5 pb-10">
      {/* 제목 */}
      <div className="text-3xl font-bold py-6">Community</div>
      {/* 글쓰기 박스 */}
      <div className="border-1 rounded-2xl p-4 space-y-2 mb-8">
        {!isReadyPost ? (
          // 클릭 전
          <div className="flex items-center space-x-2">
            <Input
              placeholder="새 글을 작성해주세요!"
              className="border-none shadow-none"
              onFocus={() => setIsReadyPost(true)}
            />
            <MdOutlineEdit className="w-6 h-6 cursor-pointer" />
          </div>
        ) : (
          // 클릭 후
          <form onSubmit={handleSubmit(onWrite)}>
            <Input {...register("title")} placeholder="글 제목" />
            <Textarea
              {...register("content")}
              placeholder="내용을 입력해주세요"
              className="mt-2 p-2 shadow-xs my-4"
            />
            {/* <div className="flex items-center justify-between">
              <GrAttachment
                onClick={handleFileButtonClick}
                className="w-4 h-4 cursor-pointer mx-2"
              /> */}
            {/* 숨겨진 파일 선택 input */}
            {/* <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("선택된 파일:", file.name); // 필요 시 상태에 저장 가능
                  }
                }}
              />*/}
            <input type="submit" className="hidden" ref={submitRef} />
            <div className="flex justify-end">
              <MdOutlineEdit
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  submitRef.current?.click();
                }}
              />
            </div>
          </form>
        )}
      </div>

      {/* 게시글 목록 */}
      <div className="flex w-full xl:space-x-8">
        <div className="w-full xl:w-2/3 space-y-4">
          {board.map((b) => (
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
                    (new Date().getTime() - new Date(b.createdAt).getTime()) /
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
          ))}
        </div>

        {/* 실시간 인기 글 */}
        <div className="w-1/3 h-1/3 border-1 rounded-2xl p-4 hidden xl:block">
          <div className="font-bold text-lg px-2 pt-2 pb-4">실시간 인기 글</div>
          <div className="space-y-4">
            <Card className="shadow-xs cursor-pointer hover:bg-gray-50">
              <CardContent className="flex items-center justify-between">
                <div>급해서 여기도 올립니다</div>
                <div className="text-sm text-gray-400">24분 전</div>
              </CardContent>
            </Card>
            <Card className="shadow-xs cursor-pointer hover:bg-gray-50">
              <CardContent className="flex items-center justify-between">
                <div>다시 생각해보니까</div>
                <div className="text-sm text-gray-400">06/24 20:18</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
