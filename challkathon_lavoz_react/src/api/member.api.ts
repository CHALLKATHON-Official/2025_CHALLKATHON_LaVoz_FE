import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";

// 회원 정보 조회
const fetchMemberInfo = async () => {
  const response = await apiClient.get("/member/me");
  return response.data.result;
};

export const useMemberInfo = () => {
  return useQuery({
    queryKey: ["memberInfo"],
    queryFn: fetchMemberInfo,
  });
};
