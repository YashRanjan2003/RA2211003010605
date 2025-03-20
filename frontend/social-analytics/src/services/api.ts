import axios from 'axios';

// Use a CORS proxy service
const BASE_URL = 'https://corsproxy.io/?' + encodeURIComponent('http://20.244.56.144/test');

export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: number;
  userid: number;
  content: string;
}

export interface Comment {
  id: number;
  postid: number;
  content: string;
}

export interface UsersResponse {
  users: Record<string, string>;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CommentsResponse {
  comments: Comment[];
}

const api = axios.create({
  baseURL: BASE_URL,
});

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserPosts = async (userId: string): Promise<PostsResponse> => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data;
};

export const getPostComments = async (postId: number): Promise<CommentsResponse> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}; 