import { useQuery } from "@tanstack/react-query";
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
