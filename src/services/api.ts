import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: Date;
  about: string;
  avatar: string;
}

export default {
  getUserProfile() {
    return apiClient.get<UserProfile>('/user/profile');
  },
  updateUserProfile(data: UserProfile) {
    return apiClient.post<UserProfile>('/user/profile', data);
  },
};
