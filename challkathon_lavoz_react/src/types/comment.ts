export interface CreateCommentParams {
  noteId: number;
  content: string;
}

export interface Comment {
  commentId: number;
  content: string;
  memberId: number;
  memberName: string;
  memberRole: string;
  noteId: number;
  createdAt: string;
  updatedAt: string;
}
