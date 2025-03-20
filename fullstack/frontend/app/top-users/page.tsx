'use client';

import { useQuery } from '@tanstack/react-query';
import { Container, Grid, Typography, Box } from '@mui/material';
import { getTopUsers } from '../services/api';
import CardComponent from '../components/Card';
import Navigation from '../components/ClientNavigation';

export default function TopUsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['topUsers'],
    queryFn: getTopUsers,
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
          <Typography color="error">Error loading top users</Typography>
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
            Top Users
          </Typography>
          <Grid container spacing={2}>
            {users?.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <CardComponent
                  type="user"
                  title={user.name}
                  content={`${user.postCount} posts`}
                  avatarUrl={user.avatarUrl}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
} 