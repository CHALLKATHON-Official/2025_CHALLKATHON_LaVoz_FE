import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "./client";

// Organization 조회
const fetchOrganization = async () => {
  const response = await apiClient.get("/organization");
  return response.data;
};

export const useOrganization = () => {
  return useQuery({
    queryKey: ["organization"],
    queryFn: fetchOrganization,
  });
};

// 상태 분석
export const useStateAnalysis = () => {
  return useMutation({
    mutationFn: async (organizationId: string) => {
      const response = await apiClient.post(
        `/organization/${organizationId}/state-analysis`
      );
      return response.data.result;
    },
  });
};
