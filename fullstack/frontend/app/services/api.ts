import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface User {
  id: string;
  name: string;
  postCount: number;
  avatarUrl: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  commentCount: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}

export const getTopUsers = async (): Promise<User[]> => {
  const response = await api.get('/top-users');
  return response.data;
};

export const getTrendingPosts = async (): Promise<Post[]> => {
  const response = await api.get('/trending-posts');
  return response.data;
};

export const getFeed = async (): Promise<Post[]> => {
  const response = await api.get('/feed');
  return response.data;
};

export default api; 