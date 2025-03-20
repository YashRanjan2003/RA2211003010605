# Social Media Analytics Dashboard
By: RA2211003010605
A real-time social media analytics dashboard built with Next.js and TypeScript.

## Features

- Top Users: Display the top five users with the highest number of posts
- Trending Posts: Show posts with the maximum number of comments
- Real-time Feed: Display posts in real-time with auto-refresh every 30 seconds

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios for API calls

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page (Top Users)
│   ├── trending/          # Trending Posts page
│   └── feed/             # Real-time Feed page
├── components/            # Reusable components
│   └── Navigation.tsx    # Navigation component
└── services/             # API services
    └── api.ts           # API integration
```

## API Integration

The application integrates with the following endpoints:

- GET /users - Get all users
- GET /users/:userId/posts - Get posts by user
- GET /posts/:postId/comments - Get comments for a post

## Performance Considerations

- Implemented efficient data fetching and caching
- Real-time updates with polling mechanism
- Responsive design for mobile and desktop views
- Optimized re-renders using React hooks

## Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement error handling and loading states
- Maintain clean and organized code structure 