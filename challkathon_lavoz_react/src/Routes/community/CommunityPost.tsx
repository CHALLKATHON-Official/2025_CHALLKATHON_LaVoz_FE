import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";
import { apiClient } from "@/api/client";

interface postInterface {
  boardId: number;
  bookmarked: boolean;
  content: string;
  createdAt: string;
  memberId: number;
  memberName: string;
  title: string;
  updatedAt: string;
  viewCount: number;
}
interface commentInterface {
  boardCommentId: number;
  content: string;
  memberId: number;
  memberName: string;
  memberRole: string;
  boardId: number;
  createdAt: string;
  updatedAt: string;
}

const CommunityPost = () => {
  const { postId } = useParams();
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [comment, setComment] = useState<commentInterface[]>([]);
  const [commentWrite, setCommentWrite] = useState("");
  const [post, setPost] = useState<postInterface>();

  useEffect(() => {
    const getPost = async () => {
      await apiClient
        .get(`/boards/${postId}`)
        .then((res) => {
          setPost(res.data.result);
          setBookmarked(res.data.result.bookmarked);
        })
        .catch((err) => console.log(err));
    };

    const getComment = async () => {
      await apiClient
        .get(`/boards/${postId}/comments`)
        .then((res) => setComment(res.data.result))
        .catch((err) => console.log(err));
    };

    getPost();
    getComment();
  }, []);

  return (
    <div className="py-10">
      <div className="text-3xl font-bold py-10">{post?.title}</div>
      {/* 게시물 */}
      <Card>
        <CardHeader>
          <CardTitle>
            {/* 프로필, 이름, 작성 시각 */}
            <div className="flex items-center space-x-4 justify-between">
              {/* <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/yiseoffline.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              <div className="space-y-1">
                <div>{post?.title}</div>
                <div className="text-xs font-medium text-gray-500">
                  {post ? new Date(post?.createdAt).toDateString() : null}
                </div>
              </div>

              <div
                onClick={async () => {
                  await apiClient
                    .post(`/boards/${postId}/bookmark`)
                    .then((res) => console.log(res));
                  setBookmarked(!bookmarked);
                }}
              >
                {bookmarked ? (
                  <FaBookmark
                    className="w-6 h-6 cursor-pointer"
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
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 내용 텍스트 */}
          <div>{post?.content}</div>

          {/* 내용 이미지 */}
          {/* <div className="flex flex-wrap gap-4">
            {[Logo, Logo, Logo].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`thumbnail-${index}`}
                className="w-full max-w-xs h-auto object-contain cursor-pointer hover:opacity-80"
                onClick={() => setOpenImage(src)}
              />
            ))}
          </div> */}

          {/* 이미지 클릭 시 확대 */}
          {openImage && (
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-25 flex items-center justify-center z-50"
              onClick={() => setOpenImage(null)}
            >
              <img
                src={openImage}
                alt="확대 이미지"
                className="max-w-[80%] max-h-[80%]"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 items-start">
          <div className="flex items-center space-x-2">
            {/* {liked ? (
              <FaHeart
                className="w-6 h-6 text-red-500 cursor-pointer"
                onClick={() => setLiked(false)}
              />
            ) : (
              <FaRegHeart
                className="w-6 h-6 text-red-500 cursor-pointer"
                onClick={() => setLiked(true)}
              />
            )} */}
            {/* <FaRegComment className="w-6 h-6 text-cyan-500 cursor-pointer" /> */}
          </div>
          {/* 댓글 */}
          <div className="w-full">
            <div className="flex space-x-3 py-6 flex-col gap-5">
              {/* <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/yunchan312.png" />
              </Avatar> */}
              {comment.length > 0
                ? comment.map((c) => (
                    <div key={c.createdAt}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm">
                          {c.memberName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {Math.ceil(
                            (new Date().getTime() -
                              new Date(c.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) <= 1
                            ? Math.floor(
                                (new Date().getTime() -
                                  new Date(c.createdAt).getTime()) /
                                  (1000 * 60)
                              ) < 60
                              ? Math.floor(
                                  (new Date().getTime() -
                                    new Date(c.createdAt).getTime()) /
                                    (1000 * 60)
                                ) + "분 전"
                              : Math.floor(
                                  (new Date().getTime() -
                                    new Date(c.createdAt).getTime()) /
                                    (1000 * 60 * 60)
                                ) + "시간 전"
                            : Math.floor(
                                (new Date().getTime() -
                                  new Date(c.createdAt).getTime()) /
                                  (1000 * 60 * 60 * 24)
                              ) + "일 전"}
                        </span>
                      </div>
                      <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs">
                        {c.content}
                      </div>
                    </div>
                  ))
                : null}
            </div>
            {/* 댓글 작성 부분 */}
            <div className="flex items-center space-x-3">
              {/* <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/yiseoffline.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              <Textarea
                onChange={(e) => setCommentWrite(e.target.value)}
                className="w-full"
              />
              <FaCircleArrowUp
                onClick={async () => {
                  await apiClient
                    .post(`/boards/${postId}/comments`, {
                      content: commentWrite,
                    })
                    .then((res) => {
                      console.log(res);
                      window.location.reload();
                    })
                    .catch((err) => console.log(err));
                }}
                className="w-7 h-7 cursor-pointer"
              />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CommunityPost;
