import axiosInstance from '../lib/axiosInstance';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  nickname: string;
  bio?: string | null;
  profileImage?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateUserProfileDto {
  name?: string;
  bio?: string;
  avatar?: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get<{data: UserProfile}>('/v1/users/me');
  return response.data.data;
};

export const updateUserProfile = async (data: UpdateUserProfileDto): Promise<UserProfile> => {
  const response = await axiosInstance.patch<{data: UserProfile}>('/v1/users', data);
  return response.data.data;
};

export const uploadProfileImage = async (file: File): Promise<{url: string}> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await axiosInstance.post<{data: {url: string}}>('/v1/uploads/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.data;
};

export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete('/v1/users');
}; 