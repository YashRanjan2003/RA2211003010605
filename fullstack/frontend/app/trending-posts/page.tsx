'use client';

import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Typography, Box } from '@mui/material';
import { getTrendingPosts } from '../services/api';
import CardComponent from '../components/Card';
import Navigation from '../components/ClientNavigation';

export default function TrendingPostsPage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['trendingPosts'],
    queryFn: getTrendingPosts,
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <Container>
          <Typography>Loading...</Typography>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <Container>
          <Typography color="error">Error loading trending posts</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Trending Posts
          </Typography>
          <Grid container spacing={2}>
            {posts?.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <CardComponent
                  type="post"
                  title={post.title}
                  content={post.content}
                  imageUrl={post.imageUrl}
                  subtitle={`${post.commentCount} comments`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
} 