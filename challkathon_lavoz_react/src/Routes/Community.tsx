import { useState, useRef } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegComment, FaRegHeart } from "react-icons/fa";

import { GrAttachment } from "react-icons/gr";

const Community = () => {
  const [isReadyPost, setIsReadyPost] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold pt-10 pb-5 px-2">Community</div>
      {/* 글쓰기 박스 */}
      <div className="border-1 rounded-2xl p-4 space-y-2">
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
      <div>
        <Card className="w-full cursor-pointer hover:bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">자폐성 장애 / Autism</CardTitle>
            <CardDescription>
              자폐성 장애에 대한 정보와 토론을 위한 공간입니다.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex space-x-2">
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
    </div>
  );
};

export default Community;
