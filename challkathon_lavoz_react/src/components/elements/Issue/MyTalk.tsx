const MyTalk = () => {
  return (
    <div className="flex justify-end my-5">
      <div className="w-full grid grid-cols-[10fr_40px] gap-2 items-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-end space-x-2 mb-1">
            <span className="font-semibold text-sm">이서연</span>
            <span className="text-xs text-gray-400">5분 전</span>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs self-end">
            뭐 어쩌라고 꺼져
          </div>
        </div>

        <div
          className="text-white self-start bg-black w-full aspect-square rounded-full flex items-center justify-center bg-center bg-cover shadow-lg cursor-pointer z-12"
          style={{
            backgroundImage: `url("https://github.com/yiseoffline.png")`,
          }}
        />
      </div>
    </div>
  );
};

export default MyTalk;
