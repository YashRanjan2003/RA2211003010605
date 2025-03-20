const axios = require('axios');
const logger = require('../utils/logger');

class ApiService {
  constructor() {
    this.baseURL = process.env.TEST_SERVER_URL;
    this.clientId = null;
    this.clientSecret = null;
    this.accessToken = null;
  }

  async register() {
    try {
      const registrationData = {
        companyName: process.env.COMPANY_NAME,
        ownerName: process.env.OWNER_NAME,
        rollNo: process.env.ROLL_NO,
        ownerEmail: process.env.OWNER_EMAIL,
        accessCode: process.env.ACCESS_CODE
      };

      logger.info('Attempting registration with data:', {
        ...registrationData,
        accessCode: '***' // Mask the access code in logs
      });

      const response = await axios.post(`${this.baseURL}/register`, registrationData);

      this.clientId = response.data.clientID;
      this.clientSecret = response.data.clientSecret;

      logger.info('Registration successful', {
        clientId: this.clientId,
        clientSecret: this.clientSecret
      });

      return response.data;
    } catch (error) {
      logger.error('Registration failed', {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method
        }
      });
      throw error;
    }
  }

  async getAuthToken() {
    try {
      const authData = {
        companyName: process.env.COMPANY_NAME,
        clientID: this.clientId,
        clientSecret: this.clientSecret,
        ownerName: process.env.OWNER_NAME,
        ownerEmail: process.env.OWNER_EMAIL,
        rollNo: process.env.ROLL_NO
      };

      logger.info('Attempting authentication with data:', {
        ...authData,
        clientSecret: '***' // Mask the client secret in logs
      });

      const response = await axios.post(`${this.baseURL}/auth`, authData);

      this.accessToken = response.data.access_token;
      logger.info('Authentication successful');
      return response.data;
    } catch (error) {
      logger.error('Authentication failed', {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  }

  // Helper method to make authenticated requests
  async makeAuthenticatedRequest(method, endpoint, data = null) {
    if (!this.accessToken) {
      await this.getAuthToken();
    }

    try {
      const response = await axios({
        method,
        url: `${this.baseURL}${endpoint}`,
        data,
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      return response.data;
    } catch (error) {
      logger.error(`Request failed: ${endpoint}`, {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      throw error;
    }
  }
}

module.exports = new ApiService(); 