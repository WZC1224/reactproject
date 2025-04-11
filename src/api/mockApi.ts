import { LoginParams, UserInfo, ApiResponse } from './types';

export default {
  async login(data: LoginParams): Promise<ApiResponse<{ token: string; user: UserInfo }>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      code: 200,
      data: {
        token: 'mock-token',
        user: {
          id: '1',
          name: data.username,
          role: 'admin',
          avatar: 'https://example.com/avatar.png'
        }
      }
    };
  },

  async getProfile(): Promise<ApiResponse<UserInfo>> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      code: 200,
      data: user
    };
  },

  async updateProfile(data: UserInfo): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem('user', JSON.stringify(data));
    return {
      code: 200,
      message: '更新成功'
    };
  }
};