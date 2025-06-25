import { useState, useRef } from "react";
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
import { GrAttachment } from "react-icons/gr";

const Note = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedWriteCategory, setSelectedWriteCategory] =
    useState<string>("");
  const [writeContent, setWriteContent] = useState<boolean>(false);
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="pt-5 pb-10">
      {/* 브레드크럼 */}

      {/* 검색 + 버튼 영역 */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
        {/* 검색창 */}
        <div className="flex items-center px-8 w-full sm:max-w-lg gap-2">
          <Input className="w-full" />
          <FaSearch className="w-6 h-6 cursor-pointer" />
        </div>
        {/* 버튼 */}
        <div className="flex items-center justify-end gap-2">
          {/* 글쓰기 */}
          <Button
            onClick={() => setWriteContent(true)}
            className="cursor-pointer"
          >
            글 작성
          </Button>
          {/* 필터링 */}
          <div>
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
        </div>
      </div>

      <div className="flex flex-col-reverse gap-y-12 xl:flex-row xl:space-x-12">
        {/* 노트 타임라인 */}
        <div className="w-full space-y-8 xl:w-auto h-[calc(100vh-250px)] overflow-y-auto pr-2">
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
        </div>
        {/* 게시글 작성 */}
        {writeContent && (
          <div className="w-full xl:w-2/3">
            <Card>
              <CardHeader>
                {/* 제목 */}
                <CardTitle>
                  <Input placeholder="글 제목" />
                </CardTitle>
                <div className="flex items-center space-x-2 mt-4">
                  {/* 카테고리 선택 드롭다운 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="border border-gray-200 bg-gray-100 text-black hover:bg-gray-200 rounded-md">
                        <BiFilterAlt />
                        <span className="ml-1">
                          {selectedWriteCategory
                            ? selectedWriteCategory
                            : "카테고리 선택"}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setSelectedWriteCategory("행동")}
                      >
                        <div className="w-2 h-2 bg-red-300 rounded-full mr-2"></div>
                        <span>행동</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelectedWriteCategory("감정")}
                      >
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></div>
                        <span>감정</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setSelectedWriteCategory("이슈")}
                      >
                        <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                        <span>이슈</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setSelectedWriteCategory("전체")}
                      >
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        <span>전체</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* 파일 첨부 버튼 */}
                  <Button
                    className="border-gray-200 bg-gray-100 hover:bg-gray-200"
                    onClick={handleFileButtonClick}
                  >
                    <GrAttachment className="text-black" />
                  </Button>

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
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={
                    "#함께라서 특별해\n\n함께라면 모든 일들이 특별해집니다.\n아이의 행동이나 감정을 자유롭게 공유해보세요."
                  }
                  className="h-96"
                />
              </CardContent>
              <CardFooter className="flex flex-row space-x-4 justify-end">
                <Button
                  onClick={() => setWriteContent(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-black"
                >
                  취소
                </Button>
                <Button>게시</Button>
              </CardFooter>
            </Card>
          </div>
        )}
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
    </div>
  );
};

export default Note;
