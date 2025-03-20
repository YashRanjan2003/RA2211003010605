import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Top Users', path: '/top-users' },
    { label: 'Trending Posts', path: '/trending-posts' },
    { label: 'Feed', path: '/feed' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Social Media Analytics
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <Button
                color="inherit"
                sx={{
                  mx: 1,
                  borderBottom: pathname === item.path ? '2px solid white' : 'none',
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 