import type { IssueResponse } from "@/types/issues";

const MyTalk = (props: IssueResponse) => {
  return (
    <div className="flex justify-end my-5">
      <div className="w-full gap-2 items-center">
        <div className="flex flex-col">
          <div className="flex items-center justify-end space-x-2 mb-1">
            <span className="font-semibold text-sm">{props.memberName}</span>
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-2xl text-sm text-gray-800 max-w-xs self-end">
            {props.question}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTalk;
