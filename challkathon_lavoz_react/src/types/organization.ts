export interface ChatGptStatusDto {
  morningEmotion: string;
  morningBehavior: string;
  afternoonEmotion: string;
  afternoonBehavior: string;
  nightEmotion: string;
  nightBehavior: string;
  happyBehaviorMap: string;
  sadBehaviorMap: string;
  annoyingBehaviorMap: string;
  hearingSensitivity: number;
  sightSensitivity: number;
  touchSensitivity: number;
  smellSensitivity: number;
  tasteSensitivity: number;
  socialSensitivity: number;
}

export interface StatusAnalysisResult {
  childName: string;
  statusId: number;
  chatGptStatusDto: ChatGptStatusDto;
  issueId: number | null;
  memberId: number;
  memberName: string;
  organizationId: number;
  organizationName: string;
  createdAt: string;
  updatedAt: string;
}

export interface StatusAnalysisResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: StatusAnalysisResult;
}
