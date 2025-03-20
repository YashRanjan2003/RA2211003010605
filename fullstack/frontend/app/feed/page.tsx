'use client';

import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Typography, Box } from '@mui/material';
import { getFeed } from '../services/api';
import CardComponent from '../components/Card';
import Navigation from '../components/ClientNavigation';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

export default function FeedPage() {
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ['feed'],
    queryFn: getFeed,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <Container>
          <LoadingSpinner />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <Container>
          <ErrorDisplay
            message="Failed to load feed. Please try again."
            onRetry={() => refetch()}
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container>
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Real-time Feed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updates every 5 seconds
            </Typography>
          </Box>
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