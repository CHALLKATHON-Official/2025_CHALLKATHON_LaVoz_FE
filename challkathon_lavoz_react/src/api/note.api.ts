import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";
import type { CreateNoteParams } from "@/types/note";

// 기록 게시물 생성
export const useCreateNote = () => {
  return useMutation({
    mutationFn: async ({
      organizationId,
      title,
      content,
      emotion,
      time,
    }: CreateNoteParams) => {
      const response = await apiClient.post(
        `/organizations/${organizationId}/notes`,
        {
          title,
          content,
          emotion,
          time,
        }
      );
      return response.data.result;
    },
  });
};

// 모든 기록 게시물 조회
const fetchAllNotes = async (organizationId: number) => {
  const response = await apiClient.get(
    `/organizations/${organizationId}/notes`
  );
  return response.data.result;
};

export const useAllNotes = (organizationId: number) => {
  return useQuery({
    queryKey: ["notes", organizationId],
    queryFn: () => fetchAllNotes(organizationId),
    enabled: !!organizationId, // organizationId가 있을 때만 쿼리 실행
  });
};

// 특정 시각 이후 기록 게시물 조회
const fetchNotesAfterTime = async (
  organizationId: number,
  isoDateTime: string
) => {
  const response = await apiClient.get(
    `/organizations/${organizationId}/notes/after`,
    {
      params: {
        dateTime: isoDateTime,
      },
    }
  );
  return response.data.result;
};

export const useNotesAfterTime = (organizationId: number, dateTime: string) => {
  return useQuery({
    queryKey: ["notes", organizationId, "after", dateTime],
    queryFn: () => fetchNotesAfterTime(organizationId, dateTime),
    enabled: !!organizationId && !!dateTime, // organizationId와 dateTime이 있을 때만 쿼리 실행
  });
};
