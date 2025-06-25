export interface CreateBoardParams {
  title: string;
  content: string;
}

export interface Board {
  boardId: number;
  title: string;
  content: string;
  memberId: number;
  memberName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Board;
}
