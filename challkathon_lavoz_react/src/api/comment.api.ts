import { useMutation } from "@tanstack/react-query";
import { apiClient } from "./client";
import type { CreateCommentParams } from "@/types/comment";

// 행동 기록 게시물에 댓글 생성
export const usePostComment = () => {
  return useMutation({
    mutationFn: async ({ noteId, content }: CreateCommentParams) => {
      const response = await apiClient.post(`/notes/${noteId}/comments`, {
        content,
      });
      return response.data.result;
    },
  });
};
