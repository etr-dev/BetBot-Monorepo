/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@utils/log';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from 'dotenv';

config({ path: '../../.env' });

const headers = {
  'X-API-KEY': process.env.BACKEND_API_KEY,
  'Content-Type': 'application/json',
};

const url =
  process.env.NODE_ENV === 'local'
    ? process.env.BETBOT_BACKEND_URL_LOCAL
    : process.env.BETBOT_BACKEND_URL_PROD;

logger.debug(`BaseURL: ${url}`);

export const backendClient: AxiosInstance = axios.create({
  baseURL: url,
  headers,
});

export async function backendRequest<T>(
  options: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await backendClient.request<T>(options);
    logger.debug(options.url, response.data);
    return response.data;
  } catch (err) {
    logger.error(options.url, err.response?.data);
    return undefined;
  }
}
