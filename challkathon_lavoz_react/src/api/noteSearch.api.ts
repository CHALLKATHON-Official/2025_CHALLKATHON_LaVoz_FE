import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";

// 유사도 검색
const fetchSimilaritySearch = async (
  keyword: string,
  organizationId: number
) => {
  const response = await apiClient.get(
    `notes/search/similarity?keyword=${keyword}&organizationId=${organizationId}`
  );
  return response.data;
};

export const useSimilaritySearch = (
  keyword: string,
  organizationId: number
) => {
  return useQuery({
    queryKey: ["similaritySearch", keyword, organizationId],
    queryFn: () => fetchSimilaritySearch(keyword, organizationId),
    enabled: !!keyword && !!organizationId, // keyword와 organizationId가 있을 때만 쿼리 실행
  });
};

// 검색 엔진을 사용하여 기록 게시물 검색
const fetchSearchNote = async (keyword: string, organizationId: number) => {
  const response = await apiClient.get(
    `notes/search/similarity?keyword=${keyword}&organizationId=${organizationId}`
  );
  return response.data;
};

export const useSearchNote = (keyword: string, organizationId: number) => {
  return useQuery({
    queryKey: ["searchNote"],
    queryFn: () => fetchSearchNote(keyword, organizationId),
  });
};
