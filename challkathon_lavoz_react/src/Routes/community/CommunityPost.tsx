import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import Logo from "@/assets/logo.png";
import {
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegComment,
} from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CommunityPost = () => {
  const { postId } = useParams();
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  return (
    <div className="py-10">
      {/* 브레드크럼 */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/community">Community</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>글 제목</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-3xl font-bold py-10">#{postId} 글 제목</div>
      {/* 게시물 */}
      <Card>
        <CardHeader>
          <CardTitle>
            {/* 프로필, 이름, 작성 시각 */}
            <div className="flex items-center space-x-4">
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/yiseoffline.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div>Seo Yeon</div>
                <div className="text-xs font-medium text-gray-500">
                  06/24 22:35
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 내용 텍스트 */}
          <div>
            글 내용 ~~
            <br />
            자고로휘문이란말이지강남8학군노른자땅으로서고교최초노히트노런과퍼펙트게임이나온학교운동장땅값만팔아도니네학교를다사는학교매년서울대를수도없이많이보내고서울대를가고싶은데연고대만붙어서재수생이많은학교야구부가들어온최초의고등학교엔팍돠마산구장총면적을다팔아도휘문고땅에안되는대명문휘문고삼성역사거리오르막길올라가다보며휘문고교사거리가있는데포르쉐매장을끼고우회전을하면거기에대치동이있다그중심엔휘문고등학교가있다
          </div>

          {/* 내용 이미지 */}
          <div className="flex space-x-2">
            {[Logo, Logo, Logo].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`thumbnail-${index}`}
                className="w-64 h-64 cursor-pointer hover:opacity-80"
                onClick={() => setOpenImage(src)}
              />
            ))}
          </div>

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
            {liked ? (
              <FaHeart
                className="w-6 h-6 text-red-500 cursor-pointer"
                onClick={() => setLiked(false)}
              />
            ) : (
              <FaRegHeart
                className="w-6 h-6 text-red-500 cursor-pointer"
                onClick={() => setLiked(true)}
              />
            )}
            <FaRegComment className="w-6 h-6 text-cyan-500 cursor-pointer" />
            {bookmarked ? (
              <FaBookmark
                className="w-6 h-6 text-yellow-500 cursor-pointer"
                onClick={() => setBookmarked(false)}
              />
            ) : (
              <FaRegBookmark
                className="w-6 h-6 text-yellow-500 cursor-pointer"
                onClick={() => setBookmarked(true)}
              />
            )}
          </div>
          {/* 댓글 */}
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
            {/* 댓글 작성 부분 */}
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default CommunityPost;
