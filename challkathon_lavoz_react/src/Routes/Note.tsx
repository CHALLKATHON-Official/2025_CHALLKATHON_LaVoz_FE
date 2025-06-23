import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IoMdShare } from "react-icons/io";
import {
  FaSearch,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegComment,
} from "react-icons/fa";
import { BiFilterAlt } from "react-icons/bi";

const Note = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);

  return (
    <div>
      {/* 검색 */}
      {/* 검색 */}
      <div className="w-full flex justify-center">
        <div className="flex items-center space-x-4 w-full max-w-lg">
          <Input className="w-full" />
          <FaSearch className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* 필터링 */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="my-4 border-2 border-gray-200 bg-gray-200 text-black hover:bg-gray-300 rounded-md">
              <BiFilterAlt />
              <span className="ml-1">카테고리 선택</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>행동</DropdownMenuItem>
            <DropdownMenuItem>감정</DropdownMenuItem>
            <DropdownMenuItem>이슈</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* 노트 타임라인 */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/yiseoffline.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-2xl">Seo Yeon</CardTitle>
              <CardDescription>2025.06.23</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            自閉症 / Autism <br />
            <br />
            의사소통과 상호작용에 대한 이해, 감각지각 및 감각통합능력 등에
            장애가 있는 자폐성 장애. 유대계 미국인 레오 캐너(Leo Kanner)가
            발견했다고 해서 캐너 증후군(Kanner Syndrome)이라고도 한다. 다만
            아스퍼거 증후군과 구분하기 위한 문맥이 아니라면 카너 증후군이란
            명칭은 잘 쓰이지는 않는다. 보통 고기능 자폐는 IQ 80 이상, 저기능
            자폐는 IQ 70 이하(지적장애급 지능)에 붙인다. <br />
            <br />
            처음 발견한 캐너는 아동 정신 분열증(Schizophrenia, Childhood)로
            파악해 DSM-I(1952년 미국 정신의학회에서 정리한 정신과 질환 분류
            목록)에 수록했으며 이후 연구가 계속되어 DSM-III(1980년에
            정신의학회에서 개정한 버젼)에서는 아동의 발달 장애라고 파악하기
            시작했다.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 items-start">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
              {/* 좋아요 버튼 */}
              {liked ? (
                <FaHeart
                  className="w-6 h-6 text-red-400 cursor-pointer"
                  onClick={() => setLiked(false)}
                />
              ) : (
                <FaRegHeart
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setLiked(true)}
                />
              )}
              {/* 댓글 버튼 */}
              <FaRegComment
                className="w-6 h-6 cursor-pointer"
                onClick={() => setOpenComment((prev) => !prev)}
              />

              {/* 공유 버튼 */}
              <IoMdShare className="w-6 h-6 cursor-pointer" />
            </div>

            {/* 북마크 버튼 */}
            <div>
              {bookmarked ? (
                <FaBookmark
                  className="w-6 h-6  cursor-pointer"
                  onClick={() => setBookmarked(false)}
                />
              ) : (
                <FaRegBookmark
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setBookmarked(true)}
                />
              )}
            </div>
          </div>

          {/* 댓글 */}
          {openComment && (
            <div className="flex space-x-3 pt-6 pb-4">
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/yunchan312.png" />
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-sm">Yun Chan</span>
                  <span className="text-xs text-gray-400">5분 전</span>
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs">
                  hi
                </div>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Note;
