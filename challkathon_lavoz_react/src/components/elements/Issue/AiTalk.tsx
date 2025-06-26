import AiFace from "@/Assets/AiFace.png";

const AiTalk = () => {
  return (
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
          안녕하세요 AI에요
        </div>
      </div>
    </div>
  );
};

export default AiTalk;
