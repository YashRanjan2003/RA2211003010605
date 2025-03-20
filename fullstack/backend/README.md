# Social Media Analytics Platform

A full-stack social media analytics platform built with Next.js and Express.js.

## Project Structure

```
.
├── frontend/          # Next.js frontend application
└── backend/          # Express.js backend application
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   COMPANY_NAME=your_company_name
   OWNER_NAME=your_name
   ROLL_NO=your_roll_number
   OWNER_EMAIL=your_email
   ACCESS_CODE=your_access_code
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- Real-time social media feed
- Top users analytics
- Trending posts tracking
- Responsive design for mobile and desktop
- Modern UI with Material UI components

## API Endpoints

### Backend APIs
- GET /api/top-users - Get top 5 users by post count
- GET /api/trending-posts - Get posts with highest comment count
- GET /api/feed - Get real-time feed of posts

## Technologies Used

- Frontend:
  - Next.js
  - Material UI
  - React Query for data fetching
  - TypeScript

- Backend:
  - Express.js
  - TypeScript
  - JWT for authentication
  - MongoDB for data storage 