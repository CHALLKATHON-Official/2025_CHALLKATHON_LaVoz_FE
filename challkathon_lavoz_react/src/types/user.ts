import type { Role } from "./enums";

export interface userInterface {
  memberCreationDate?: string;
  memberUpdateDate?: string;
  memberId?: number;
  memberName?: string;
  loginId?: string;
  role?: keyof Role;
  imageUrl?: string;
  childName?: string;
  childBirthday?: string;
  childGender?: string;
  childImageUrl?: string;
}

export interface userRegisterInterface {
  loginId: string;
  password: string;
  passwordCheck: string;
  name: string;
  role: string;
}
