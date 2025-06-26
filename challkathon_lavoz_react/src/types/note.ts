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

export interface Note {
  noteId: number;
  title: string;
  content: string;
  emotion: string;
  time: string;
  memberId: number;
  memberName: string;
  memberRole: string;
  organizationId: number;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface CreateNoteParams {
  organizationId: number;
  title: string;
  content: string;
  emotion: string;
  time: string; // e.g. "2025.02.05"
}

export interface CreateNoteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Note;
}
