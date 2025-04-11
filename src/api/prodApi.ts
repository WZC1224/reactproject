import apiClient from './apiClient';
import { LoginParams, UserInfo, ApiResponse } from './types';

export default {
  async login(data: LoginParams): Promise<ApiResponse<{ token: string; user: UserInfo }>> {
    return apiClient.post('/auth/login', data);
  },

  async getProfile(): Promise<ApiResponse<UserInfo>> {
    return apiClient.get('/user/profile');
  },

  async updateProfile(data: UserInfo): Promise<ApiResponse> {
    return apiClient.put('/user/profile', data);
  }
};