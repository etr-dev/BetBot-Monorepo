import { logServer } from '@utils/log';
import axios, { AxiosRequestConfig } from 'axios';
import { config as dotenvConfig } from 'dotenv';
import QueryString from 'qs';
import { IMatch, IUser } from './interfaces';
import { IGetRequest } from './interfaces/get.interface';
import {
  CompleteMatchRequest,
  CreateMatchRequest,
  CreateUserRequest,
  GetUsersBetsRequest,
  PlaceBetRequest,
} from './requests';
import {
  CreateMatchResponse,
  CreateUserResponse,
  GetAllIncompleteMatchLinksResponse,
  GetMatchResponse,
  GetUserResponse,
  GetUsersBetsResponse,
  GetWalletResponse,
  PlaceBetResponse,
} from './responses';

dotenvConfig({ path: '../../.env' });

const headers = {
  'X-API-KEY': process.env.BACKEND_API_KEY,
  'Content-Type': 'application/json',
};

const url =
  process.env.NODE_ENV === 'local'
    ? process.env.BETBOT_BACKEND_URL_LOCAL
    : process.env.BETBOT_BACKEND_URL_PROD;

export async function databaseHealth() {
  const config = {
    method: 'get',
    url: `${url}`,
    headers,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => null);
}

export async function getUserWalletId(
  createUserRequest: CreateUserRequest,
): Promise<CreateUserResponse> {
  const data = JSON.stringify(createUserRequest);

  const config = {
    method: 'post',
    url: `${url}/betbot/createUser`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function getWallet(walletId: string): Promise<GetWalletResponse> {
  const data = JSON.stringify({ walletId });

  const config = {
    method: 'get',
    url: `${url}/betbot/wallet`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function getMatch(
  partialMatch: Partial<IMatch>,
): Promise<GetMatchResponse> {
  const data = JSON.stringify(partialMatch);

  const config = {
    method: 'get',
    url: `${url}/betbot/getMatch`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function getIncompleteMatchLinks(): Promise<GetAllIncompleteMatchLinksResponse> {
  const config = {
    method: 'get',
    url: `${url}/betbot/getAllIncompleteMatchLinks`,
    headers,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function createMatch(
  createMatchRequest: CreateMatchRequest,
): Promise<CreateMatchResponse> {
  const data = JSON.stringify(createMatchRequest);

  const config = {
    method: 'post',
    url: `${url}/betbot/createMatch`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function completeMatch(
  completeMatchRequest: CompleteMatchRequest,
): Promise<unknown> {
  logServer(`Completing: ${completeMatchRequest.matchTitle}`);

  const data = JSON.stringify(completeMatchRequest);

  const config = {
    method: 'post',
    url: `${url}/betbot/completeMatch`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function placeBet(
  placeBetRequest: PlaceBetRequest,
): Promise<PlaceBetResponse> {
  const data = JSON.stringify(placeBetRequest);

  const config = {
    method: 'post',
    url: `${url}/betbot/placeBet`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function getUsersBets(
  getUsersBetsRequest: GetUsersBetsRequest,
): Promise<GetUsersBetsResponse> {
  const data = JSON.stringify(getUsersBetsRequest);

  const config = {
    method: 'get',
    url: `${url}/betbot/getUsersBets`,
    headers,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}

export async function getUser(
  userData: Partial<IUser> | IGetRequest,
): Promise<GetUserResponse> {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${url}/betbot/user`,
    headers,
    params: userData,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
}
