export interface IUserInfo {
  username: string;
  useremail: string;
  password: string;
}
export type UserInfoWithoutName = Omit<IUserInfo, "username">;
