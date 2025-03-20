import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { posts, users } from './data';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Types
interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

interface CompanyRegistration {
  companyName: string;
  clientID: string;
  clientSecret: string;
  ownerName: string;
  ownerEmail: string;
  rollNo: string;
}

// Global variables
let authToken: string | null = null;
let tokenExpiry: number | null = null;

// Helper function to check if token is expired
const isTokenExpired = (): boolean => {
  if (!tokenExpiry) return true;
  return Date.now() >= tokenExpiry * 1000;
};

// Function to get auth token
const getAuthToken = async (): Promise<string> => {
  if (authToken && !isTokenExpired()) {
    return authToken;
  }

  try {
    console.log('Requesting new auth token...');
    const response = await axios.post<AuthResponse>(
      'http://20.244.56.144/test/auth',
      {
        companyName: process.env.COMPANY_NAME,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        ownerName: process.env.OWNER_NAME,
        ownerEmail: process.env.OWNER_EMAIL,
        rollNo: process.env.ROLL_NO
      }
    );

    authToken = response.data.access_token;
    tokenExpiry = response.data.expires_in;
    console.log('New auth token received');
    return authToken;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw new Error('Failed to get auth token');
  }
};

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Routes
app.get('/api/top-users', async (req, res) => {
  try {
    console.log('Fetching top users...');
    // Sort users by post count (highest first) and take top 5
    const topUsers = [...users]
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);
    
    console.log(`Found ${topUsers.length} top users`);
    res.json(topUsers);
  } catch (error) {
    console.error('Error getting top users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/trending-posts', async (req, res) => {
  try {
    console.log('Fetching trending posts...');
    // Find the maximum comment count
    const maxCommentCount = Math.max(...posts.map(post => post.commentCount));
    
    // Filter posts with the maximum comment count
    const trendingPosts = posts.filter(post => post.commentCount === maxCommentCount);
    
    console.log(`Found ${trendingPosts.length} trending posts`);
    res.json(trendingPosts);
  } catch (error) {
    console.error('Error getting trending posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/feed', async (req, res) => {
  try {
    console.log('Fetching feed...');
    // Sort posts by creation date (newest first)
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    console.log(`Found ${sortedPosts.length} posts in feed`);
    res.json(sortedPosts);
  } catch (error) {
    console.error('Error getting feed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 