import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./client";
import type { CreateBoardParams } from "@/types/board";

// 커뮤니티에 글 생성
export const usePostBoard = () => {
  return useMutation({
    mutationFn: async ({ title, content }: CreateBoardParams) => {
      const response = await apiClient.post(`/boards`, { title, content });
      return response.data.result;
    },
  });
};
