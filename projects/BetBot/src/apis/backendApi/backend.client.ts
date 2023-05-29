/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const backendClient: AxiosInstance = axios.create({
  baseURL: url,
  timeout: 5000, // Set a timeout of 5 seconds
  headers,
});

export async function backendRequest<T>(
  options: AxiosRequestConfig,
): Promise<T> {
  try {
    const response = await backendClient.request<T>(options);
    return response.data;
  } catch (err) {
    console.log(err.response?.data);
    return undefined;
  }
}
