require('dotenv').config();
const express = require('express');
const apiService = require('./services/apiService');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize API service
async function initializeApiService() {
  try {
    await apiService.register();
    await apiService.getAuthToken();
    logger.info('API service initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize API service', { error: error.message });
    process.exit(1);
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  await initializeApiService();
}); 