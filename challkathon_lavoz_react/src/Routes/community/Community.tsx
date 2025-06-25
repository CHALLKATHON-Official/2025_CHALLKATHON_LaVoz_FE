import { useState, useRef } from "react";
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
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";

const Community = () => {
  const navigate = useNavigate();
  const [isReadyPost, setIsReadyPost] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
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
          <>
            <Input placeholder="글 제목" />

            <Textarea
              placeholder="내용을 입력해주세요"
              className="mt-2 p-2 shadow-xs my-4"
            />
            <div className="flex items-center justify-between">
              <GrAttachment
                onClick={handleFileButtonClick}
                className="w-4 h-4 cursor-pointer mx-2"
              />
              {/* 숨겨진 파일 선택 input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log("선택된 파일:", file.name); // 필요 시 상태에 저장 가능
                  }
                }}
              />
              <MdOutlineEdit className="w-6 h-6 cursor-pointer" />
            </div>
          </>
        )}
      </div>

      {/* 게시글 목록 */}
      <div className="flex w-full xl:space-x-8">
        <div className="w-full xl:w-2/3 space-y-4">
          <Card
            onClick={() => navigate("/community/1")}
            className="cursor-pointer hover:bg-gray-50"
          >
            <CardHeader>
              <CardTitle className="text-lg">자폐성 장애 / Autism</CardTitle>
              <CardDescription>
                자폐성 장애에 대한 정보와 토론을 위한 공간입니다.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex space-x-2">
              {/* todo: 좋아요 있으면 보이게 분기처리 */}
              <div className="flex items-center space-x-2">
                <FaRegHeart className="mt-1 text-red-500" />
                <div className="text-sm text-red-500">1</div>
                <div className="text-gray-500">|</div>
              </div>
              {/* todo: 댓글 있으면 보이게 분기처리 */}
              <div className="flex items-center space-x-2">
                <FaRegComment className="mt-1 text-cyan-500" />
                <div className="text-sm text-cyan-500">1</div>
                <div className="text-gray-500">|</div>
              </div>
              <div className="text-gray-500">21분전</div>
              <div className="text-gray-500">|</div>
              <div className="text-gray-500">yiseonline</div>
            </CardFooter>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">이서왔다~~</CardTitle>
              <CardDescription>1등 안 주면 공학관 불지른다</CardDescription>
            </CardHeader>
            <CardFooter className="flex space-x-2">
              {/* todo: 좋아요 있으면 보이게 분기처리 */}
              <div className="flex items-center space-x-2">
                <FaRegHeart className="mt-1 text-red-500" />
                <div className="text-sm text-red-500">1</div>
                <div className="text-gray-500">|</div>
              </div>
              {/* todo: 댓글 있으면 보이게 분기처리 */}
              <div className="flex items-center space-x-2">
                <FaRegComment className="mt-1 text-cyan-500" />
                <div className="text-sm text-cyan-500">1</div>
                <div className="text-gray-500">|</div>
              </div>
              <div className="text-gray-500">21분전</div>
              <div className="text-gray-500">|</div>
              <div className="text-gray-500">yiseonline</div>
            </CardFooter>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">미스터구</CardTitle>
              <CardDescription>꾸꾸까까</CardDescription>
            </CardHeader>
            <CardFooter className="flex space-x-2">
              {/* todo: 좋아요 있으면 보이게 분기처리 */}
              <div className="flex items-center space-x-2">
                <FaRegHeart className="mt-1 text-red-500" />
                <div className="text-sm text-red-500">1</div>
                <div className="text-gray-500">|</div>
              </div>
              {/* todo: 댓글 있으면 보이게 분기처리 */}
              <div className="flex items-center space-x-2">
                <FaRegComment className="mt-1 text-cyan-500" />
                <div className="text-sm text-cyan-500">1</div>
                <div className="text-gray-500">|</div>
              </div>
              <div className="text-gray-500">21분전</div>
              <div className="text-gray-500">|</div>
              <div className="text-gray-500">yiseonline</div>
            </CardFooter>
          </Card>
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
