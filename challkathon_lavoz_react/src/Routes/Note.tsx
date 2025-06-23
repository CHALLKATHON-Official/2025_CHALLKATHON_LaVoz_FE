import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { FaCircleArrowUp } from "react-icons/fa6";

import { BiFilterAlt } from "react-icons/bi";

const Note = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
            <Button className="my-4 border-2 border-gray-200 bg-gray-100 text-black hover:bg-gray-300 rounded-md">
              <BiFilterAlt />
              <span className="ml-1">
                {selectedCategory ? selectedCategory : "카테고리 선택"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedCategory("행동")}>
              <div className="w-2 h-2 bg-red-300 rounded-full mr-2"></div>
              <span>행동</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("감정")}>
              <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></div>
              <span>감정</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedCategory("이슈")}>
              <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
              <span>이슈</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedCategory("전체")}>
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
              <span>전체</span>
            </DropdownMenuItem>
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
          <CardAction>
            <Badge className="flex items-center space-x-0.5 rounded-full bg-red-300">
              <div className="w-2 h-2 bg-red-200 rounded-full"></div>
              <span>{selectedCategory}</span>
            </Badge>
          </CardAction>
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
              <IoMdShare
                onClick={() => setOpenDialog(true)}
                className="w-6 h-6 cursor-pointer"
              />
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
            <div className="w-full">
              <div className="flex space-x-3 py-6">
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
              <div className="flex items-center space-x-3">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/yiseoffline.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full"
                />
                <FaCircleArrowUp className="w-7 h-7 cursor-pointer" />
              </div>
            </div>
          )}
        </CardFooter>
      </Card>

      {/* 커뮤니티 공유 모달 */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시글 공유</DialogTitle>
            <DialogDescription className="py-4">
              이 게시글을 커뮤니티에 공유하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setOpenDialog(false)}>
              취소
            </Button>
            <Button
              onClick={() => {
                alert("해당 게시글이 커뮤니티에 공유되었습니다.");
                setOpenDialog(false);
              }}
            >
              공유하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Note;
