import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const register = async () => {
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName: process.env.COMPANY_NAME,
      ownerName: process.env.OWNER_NAME,
      rollNo: process.env.ROLL_NO,
      ownerEmail: process.env.OWNER_EMAIL,
      accessCode: process.env.ACCESS_CODE
    });

    console.log('Registration successful!');
    console.log('Client ID:', response.data.clientID);
    console.log('Client Secret:', response.data.clientSecret);

    // Update .env file with new credentials
    const envContent = `PORT=5000
COMPANY_NAME=${process.env.COMPANY_NAME}
OWNER_NAME=${process.env.OWNER_NAME}
ROLL_NO=${process.env.ROLL_NO}
OWNER_EMAIL=${process.env.OWNER_EMAIL}
ACCESS_CODE=${process.env.ACCESS_CODE}
CLIENT_ID=${response.data.clientID}
CLIENT_SECRET=${response.data.clientSecret}`;

    require('fs').writeFileSync('.env', envContent);
    console.log('Updated .env file with new credentials');
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
  }
};

register(); 