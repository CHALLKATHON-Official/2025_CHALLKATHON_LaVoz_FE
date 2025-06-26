import { useState, useRef } from "react";
import { format } from "date-fns";
import type { Comment as CommentType, Note as NoteType } from "@/types/note";

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
import toast from "react-hot-toast";

import { useCreateNote, useAllNotes } from "@/api/note.api";
import { usePostComment } from "@/api/comment.api";
import { usePostBoard } from "@/api/borad.api";

const Note = () => {
  const now = new Date();
  const formatted = format(now, "yyyy-MM-dd HH:mm");

  const [likedNotes, setLikedNotes] = useState<Set<number>>(new Set());
  const [bookmarkedNotes, setBookmarkedNotes] = useState<Set<number>>(
    new Set()
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [writeContent, setWriteContent] = useState<boolean>(false);
  const [contentTitle, setContentTitle] = useState<string>("");
  const [contentText, setContentText] = useState<string>("");
  const [contentEmotion, setContentEmotion] = useState<string>("");
  const [selectedEmotion, setSelectedEmotion] = useState<string>("전체");
  const [shareNote, setShareNote] = useState<NoteType | null>(null);
  const [commentMap, setCommentMap] = useState<{ [key: number]: string }>({});
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const organizationId = Number(localStorage.getItem("currentOrganizationId"));
  const { mutate: createNote } = useCreateNote();
  const { mutate: postComment } = usePostComment();
  const { mutate: postBoard } = usePostBoard();
  const { data: notes, refetch } = useAllNotes(organizationId!);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const filteredNotes = notes
    ?.filter((note: NoteType) =>
      selectedEmotion === "전체" || !selectedEmotion
        ? true
        : note.emotion === selectedEmotion
    )
    .filter(
      (note: NoteType) =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(searchText.toLowerCase())
    );

  // 검색
  const triggerSearch = () => {
    setSearchText(searchInput);
  };

  // 좋아요 토글
  const toggleLike = (noteId: number) => {
    setLikedNotes((prev) => {
      const updated = new Set(prev);
      if (updated.has(noteId)) {
        updated.delete(noteId);
      } else {
        updated.add(noteId);
      }
      return updated;
    });
  };

  // 북마크 토글
  const toggleBookmark = (noteId: number) => {
    setBookmarkedNotes((prev) => {
      const updated = new Set(prev);
      if (updated.has(noteId)) {
        updated.delete(noteId);
      } else {
        updated.add(noteId);
      }
      return updated;
    });
  };

  // 노트 작성
  const handleCreateNote = async () => {
    if (!contentTitle.trim() || !contentText.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요.");
      return;
    }

    if (!contentEmotion) {
      toast.error("감정과 카테고리를 선택해주세요.");
      return;
    }

    if (!organizationId) {
      toast.error("조직 정보를 불러오지 못했습니다.");
      return;
    }

    try {
      createNote(
        {
          organizationId,
          title: contentTitle,
          content: contentText,
          emotion: contentEmotion,
          time: formatted,
        },
        {
          onSuccess: () => {
            toast.success("게시글이 등록되었습니다.");
            refetch();
            setWriteContent(false);
            setContentTitle("");
            setContentText("");
            setContentEmotion("");
          },
          onError: () => {
            toast.error("게시글 등록 중 오류가 발생했습니다.");
          },
        }
      );
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      toast.error("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleCommentChange = (noteId: number, value: string) => {
    setCommentMap((prev) => ({
      ...prev,
      [noteId]: value,
    }));
  };

  // 댓글 작성
  const handlePostComment = async (noteId: number) => {
    const currentComment = commentMap[noteId];
    if (!currentComment?.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      postComment(
        {
          noteId,
          content: currentComment,
        },
        {
          onSuccess: () => {
            toast.success("댓글이 등록되었습니다.");
            refetch(); // 노트 목록 새로고침
            // 댓글 초기화
            setCommentMap((prev) => ({ ...prev, [noteId]: "" }));
          },
        }
      );
    } catch {
      toast.error("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  // 커뮤니티에 게시글 공유
  const handlePostBoard = async () => {
    if (!shareNote) return;

    try {
      postBoard({
        title: shareNote.title,
        content: shareNote.content,
      });
      toast.success("해당 게시글이 커뮤니티에 공유되었습니다.");
      await refetch();
    } catch {
      toast.error("커뮤니티 공유 중 오류가 발생했습니다.");
    } finally {
      setShareNote(null); // 상태 초기화
    }
  };

  return (
    <div className="pt-5 pb-10">
      {/* 브레드크럼 */}

      {/* 검색 + 버튼 영역 */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
        {/* 검색창 */}
        <div className="flex items-center px-8 w-full sm:max-w-lg gap-2">
          <Input
            className="w-full"
            placeholder="제목이나 내용을 검색하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                triggerSearch();
              }
            }}
          />
          <FaSearch
            className="w-6 h-6 cursor-pointer"
            onClick={triggerSearch}
          />
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
                    {selectedEmotion ? selectedEmotion : "카테고리 선택"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedEmotion("행동")}>
                  <div className="w-2 h-2 bg-red-300 rounded-full mr-2"></div>
                  <span>행동</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedEmotion("감정")}>
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></div>
                  <span>감정</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedEmotion("이슈")}>
                  <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                  <span>이슈</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedEmotion("전체")}>
                  <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                  <span>전체</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-y-12 xl:flex-row xl:space-x-6">
        {/* 노트 타임라인 */}
        <div className="w-full xl:flex-1 h-[calc(100vh-250px)] overflow-y-auto pr-2 space-y-8">
          {filteredNotes
            ?.slice()
            .reverse()
            .map((note: NoteType) => (
              <Card key={note.noteId} className="w-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/yiseoffline.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <CardTitle className="text-2xl">
                        {note.memberName}
                      </CardTitle>
                      <CardDescription>
                        {format(note.createdAt, "yyyy-MM-dd")}
                      </CardDescription>
                    </div>
                  </div>
                  <CardAction>
                    <Badge
                      className={`flex items-center space-x-0.5 rounded-full ${
                        note.emotion === "행동"
                          ? "bg-red-300"
                          : note.emotion === "감정"
                          ? "bg-yellow-300"
                          : note.emotion === "이슈"
                          ? "bg-blue-300"
                          : "bg-gray-300"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full bg-white`}></div>
                      <span className="text-gray-700">{note.emotion}</span>
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="font-bold text-lg">{note.title}</div>
                  <div>{note.content}</div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 items-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                      {/* 좋아요 버튼 */}
                      {likedNotes.has(note.noteId) ? (
                        <FaHeart
                          className="w-6 h-6 text-red-400 cursor-pointer"
                          onClick={() => toggleLike(note.noteId)}
                        />
                      ) : (
                        <FaRegHeart
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => toggleLike(note.noteId)}
                        />
                      )}
                      {/* 댓글 버튼 */}
                      <FaRegComment
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => setOpenComment((prev) => !prev)}
                      />

                      {/* 공유 버튼 */}
                      <IoMdShare
                        onClick={() => {
                          setShareNote(note);
                          setOpenDialog(true);
                        }}
                        className="w-6 h-6 cursor-pointer"
                      />
                    </div>

                    {/* 북마크 버튼 */}
                    <div>
                      {bookmarkedNotes.has(note.noteId) ? (
                        <FaBookmark
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => toggleBookmark(note.noteId)}
                        />
                      ) : (
                        <FaRegBookmark
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => toggleBookmark(note.noteId)}
                        />
                      )}
                    </div>
                  </div>

                  {/* 댓글 */}
                  {openComment && (
                    <div className="w-full">
                      {/* 댓글 목록 */}
                      {note.comments.map((comment: CommentType) => (
                        <div
                          key={comment.commentId}
                          className="flex space-x-3 py-2"
                        >
                          <Avatar className="cursor-pointer">
                            <AvatarImage src="https://github.com/yunchan312.png" />
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">
                                {comment.memberName}
                              </span>
                              <span className="text-xs text-gray-400">
                                {format(new Date(comment.createdAt), "HH:mm")}
                              </span>
                            </div>
                            <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs">
                              {comment.content}
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* 댓글 작성 */}
                      <div className="flex items-center space-x-3 pt-4">
                        <Avatar className="cursor-pointer">
                          <AvatarImage src="https://github.com/yiseoffline.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Textarea
                          value={commentMap[note.noteId] || ""}
                          onChange={(e) =>
                            handleCommentChange(note.noteId, e.target.value)
                          }
                          className="w-full"
                        />
                        <FaCircleArrowUp
                          onClick={() => handlePostComment(note.noteId)}
                          className="w-7 h-7 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
        </div>
        {/* 게시글 작성 */}
        {writeContent && (
          <div className="w-full xl:w-1/3">
            <Card>
              <CardHeader>
                {/* 제목 */}
                <CardTitle>
                  <Input
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="글 제목"
                  />
                </CardTitle>
                <div className="flex items-center space-x-2 mt-4">
                  {/* 카테고리 선택 드롭다운 */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="border border-gray-200 bg-gray-100 text-black hover:bg-gray-200 rounded-md">
                        <BiFilterAlt />
                        <span className="ml-1">
                          {contentEmotion ? contentEmotion : "카테고리 선택"}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setContentEmotion("행동")}
                      >
                        <div className="w-2 h-2 bg-red-300 rounded-full mr-2"></div>
                        <span>행동</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setContentEmotion("감정")}
                      >
                        <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></div>
                        <span>감정</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setContentEmotion("이슈")}
                      >
                        <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
                        <span>이슈</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setContentEmotion("전체")}
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
                  value={contentText}
                  onChange={(e) => setContentText(e.target.value)}
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
                <Button onClick={handleCreateNote}>게시</Button>
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
                  handlePostBoard();
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
