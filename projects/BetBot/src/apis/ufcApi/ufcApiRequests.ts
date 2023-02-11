import axios from 'axios';
import { config } from 'dotenv';
import {
  UfcApiResponse,
  UfcEventResponse,
} from './responses/ufcEvent.response';

config({ path: require('find-config')('.env') });
const headers = {
  'X-API-KEY': process.env.BACKEND_API_KEY,
  'Content-Type': 'application/json',
};

const url =
  process.env.NODE_ENV === 'local'
    ? process.env.BETBOT_BACKEND_URL_LOCAL
    : process.env.BETBOT_BACKEND_URL_PROD;

export async function ufcApiHealth() {
  const config = {
    method: 'get',
    url: `${url}`,
    headers,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => null);
}

export async function getUpcomingFights(): Promise<UfcEventResponse> {
  const config = {
    method: 'get',
    url: `${url}/ufc/nextEvent`,
    headers,
  };

  return axios(config)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error);
      return null;
    });
}

export async function getEventByUrl(
  eventUrl: string,
): Promise<UfcEventResponse> {
  const config = {
    method: 'get',
    url: `${url}/ufc/eventByUrl`,
    params: { url: eventUrl },
    headers,
  };

  return axios(config)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error);
      return null;
    });
}
