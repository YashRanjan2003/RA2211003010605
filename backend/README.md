# Afford Backend Service

This is a backend service for the Afford Medical Technologies Campus Hiring Evaluation.
Made by:
RA2211003010605

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the values in `.env` with your credentials

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

- `GET /health` - Health check endpoint

## Features

- Automatic registration with test server
- JWT token management
- Secure credential storage
- Comprehensive logging
- Error handling

## Project Structure

```
src/
├── index.js           # Main application entry point
├── services/          # Business logic and external API communication
│   └── apiService.js  # Test server API integration
└── utils/            # Utility functions
    └── logger.js     # Logging configuration
```

## Logging

Logs are stored in:
- `error.log` - Error-level logs
- `combined.log` - All logs

## Security

- Credentials are stored in environment variables
- JWT tokens are managed securely
- No sensitive data is logged 