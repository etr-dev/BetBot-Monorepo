import { config } from 'dotenv';

config({ path: require('find-config')('.env') });
export const HealthResponse = `Server is running on port ${process.env.PORT}`;
export const SUCCESS_MESSAGE = 'SUCCESS';
