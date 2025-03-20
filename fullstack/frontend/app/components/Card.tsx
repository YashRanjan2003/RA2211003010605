import { Card, CardContent, CardMedia, Typography, Box, Avatar } from '@mui/material';

interface CardProps {
  title: string;
  content: string;
  imageUrl?: string;
  avatarUrl?: string;
  subtitle?: string;
  type: 'post' | 'user';
}

const CardComponent = ({ title, content, imageUrl, avatarUrl, subtitle, type }: CardProps) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {type === 'post' && imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {type === 'user' && avatarUrl && (
            <Avatar
              src={avatarUrl}
              sx={{ width: 56, height: 56, mr: 2 }}
            />
          )}
          <Box>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent; 