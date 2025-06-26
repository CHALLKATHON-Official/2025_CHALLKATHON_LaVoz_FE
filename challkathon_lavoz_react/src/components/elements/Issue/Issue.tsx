import AiFace from "@/Assets/AiFace.png";
import { useState } from "react";
import AiTalk from "./AiTalk";
import MyTalk from "./MyTalk";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { apiClient } from "@/api/client";
import { useIssueLoading } from "@/hooks/issueLoadingStore";
import { useNavigate } from "react-router-dom";
import type { IssueResponse } from "@/types/issues";
import { BeatLoader } from "react-spinners";

const Issue = () => {
  const [issue, setIssue] = useState(false);
  const [issueLists, setIssueList] = useState<IssueResponse[]>([]);
  const navigate = useNavigate();
  const setIssueLoading = useIssueLoading(
    (state) => (state as { nowIssueLoading: Function }).nowIssueLoading
  );
  const issueLoading = useIssueLoading(
    (state) => (state as { issueLoading: boolean }).issueLoading
  );
  const [questions, setQuestion] = useState("");

  const { register, handleSubmit } = useForm<{ message: string }>();

  const sendMessage = async (data: { message: string }) => {
    const orgaId = localStorage.getItem("currentOrganizationId");
    try {
      setIssueLoading(true);
      setQuestion(data.message);
      if (orgaId) {
        await apiClient
          .post(`/organization/${orgaId}/issue`, {
            question: data.message,
          })
          .then((res) => {
            setIssueList([...issueLists, res.data.result]);
          })
          .catch((err) => console.log(err));
      } else {
        alert("오가니제이션을 선택해주세요");
        navigate("/after");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIssueLoading(false);
    }
  };
  return (
    <>
      {issue ? (
        <div
          className="bg-black/30 w-screen h-screen fixed top-0 left-0 z-11 flex items-center justify-center"
          onClick={() => setIssue(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white h-[80%] px-4 py-5 w-[300px] md:w-[50%] rounded-xl flex-col flex gap-2"
          >
            {/* Greetings */}
            <div className="h-full overflow-y-scroll">
              <div className="flex justify-start my-5">
                <div
                  className="mr-2 text-white self-start bg-black w-[50px] aspect-square rounded-full flex items-center justify-center bg-center bg-cover shadow-lg cursor-pointer z-12"
                  style={{
                    backgroundImage: `url(${AiFace})`,
                  }}
                />
                <div className="flex flex-col">
                  <div className="flex items-center justify-start space-x-2 mb-1">
                    <span className="font-semibold text-sm">도우미</span>
                    <span className="text-xs text-gray-400">5분 전</span>
                  </div>
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs">
                    <div>안녕하세요, 당신의 AI 도우미 입니다.</div>
                  </div>
                </div>
              </div>
              {issueLoading ? (
                <div className="flex flex-col my-5">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs self-end">
                    {questions}
                  </div>

                  <div>
                    생각중입니다. <BeatLoader color="#d3d3d3" />
                  </div>
                </div>
              ) : (
                issueLists.map((i) => (
                  <div key={i.createdAt}>
                    <MyTalk {...i} />
                    <AiTalk {...i} />
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmit(sendMessage)}>
              <Textarea
                placeholder="AI에게 우리아이 맞춤 정보를 물어보세요."
                {...register("message", { required: true })}
              />
              <Button className="w-full my-2">보내기</Button>
            </form>
          </div>
        </div>
      ) : null}
      <div
        className="fixed bottom-5 right-5 text-white bg-black size-20 rounded-full flex items-center justify-center bg-center bg-cover shadow-lg cursor-pointer z-12"
        style={{
          backgroundImage: `url(${AiFace})`,
        }}
        onClick={() => {
          setIssue(!issue);
        }}
      />
    </>
  );
};

export default Issue;
