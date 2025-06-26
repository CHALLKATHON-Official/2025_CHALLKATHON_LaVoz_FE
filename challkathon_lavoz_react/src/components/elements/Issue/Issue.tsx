import AiFace from "@/Assets/AiFace.png";
import { useState } from "react";
import AiTalk from "./AiTalk";
import MyTalk from "./MyTalk";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Issue = () => {
  const [issue, setIssue] = useState(false);
  return (
    <>
      {issue ? (
        <div className="bg-black/30 w-screen h-screen fixed top-0 left-0 z-11 flex items-center justify-center">
          <div className="bg-white h-[80%] px-4 py-5 w-[300px] md:w-[50%] rounded-xl flex-col flex gap-2">
            <div className="h-full overflow-y-scroll">
              <AiTalk />
              <MyTalk />
            </div>
            <form>
              <Textarea />
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
        onClick={() => setIssue(!issue)}
      />
    </>
  );
};

export default Issue;
