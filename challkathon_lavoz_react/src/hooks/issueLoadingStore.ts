import { create } from "zustand";

export const useIssueLoading = create((set) => ({
  issueLoading: false,
  nowIssueLoading: (newState: boolean) => set({ issueLoading: newState }),
}));
