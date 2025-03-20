import axios from 'axios';

// Use a CORS proxy service
const BASE_URL = 'https://corsproxy.io/?' + encodeURIComponent('http://20.244.56.144/test');

interface RegisterRequest {
  companyName: string;
  ownerName: string;
  rollNo: string;
  ownerEmail: string;
  accessCode: string;
}

interface RegisterResponse {
  companyName: string;
  clientID: string;
  clientSecret: string;
  ownerName: string;
  ownerEmail: string;
  rollNo: string;
}

interface AuthRequest {
  companyName: string;
  clientID: string;
  clientSecret: string;
  ownerName: string;
  ownerEmail: string;
  rollNo: string;
}

interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};

export const getAuthToken = async (data: AuthRequest): Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}/auth`, data);
  return response.data;
}; 