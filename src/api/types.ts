export interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message?: string;
}