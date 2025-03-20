'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { getUsers, getUserPosts, getPostComments, type Post, type Comment } from '@/services/api';

interface PostWithComments extends Post {
  commentCount: number;
  userName: string;
}

export default function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState<PostWithComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const usersResponse = await getUsers();
        const users = usersResponse.users;

        // Fetch all posts from all users
        const allPosts: PostWithComments[] = [];
        for (const [userId, userName] of Object.entries(users)) {
          const postsResponse = await getUserPosts(userId);
          for (const post of postsResponse.posts) {
            const commentsResponse = await getPostComments(post.id);
            allPosts.push({
              ...post,
              commentCount: commentsResponse.comments.length,
              userName,
            });
          }
        }

        // Find the maximum comment count
        const maxComments = Math.max(...allPosts.map(post => post.commentCount));

        // Filter posts with the maximum comment count
        const trending = allPosts.filter(post => post.commentCount === maxComments);

        setTrendingPosts(trending);
      } catch (err) {
        setError('Failed to fetch trending posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Trending Posts</h1>
          <div className="space-y-6">
            {trendingPosts.map((post) => (
              <div key={post.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium">
                          {post.userName.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{post.userName}</div>
                      <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {post.commentCount} comments
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <div className="text-sm text-gray-900">{post.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 