import { LoginParams, UserInfo } from './types';
import mockApi from './mockApi';
import prodApi from './prodApi';

const api = import.meta.env.VITE_MOCK_API === 'true' ? mockApi : prodApi;

export const login = (data: LoginParams) => api.login(data);
export const getProfile = () => api.getProfile();
export const updateProfile = (data: UserInfo) => api.updateProfile(data);

export default {
  login,
  getProfile,
  updateProfile
};