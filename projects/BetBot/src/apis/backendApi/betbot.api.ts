import axios from 'axios';
import { config } from 'dotenv';
import { IMatch } from './interfaces/match.interface';
import { GetUsersBetsRequest } from './requests';
import { CompleteMatchRequest } from './requests/completeMatch.request';
import { CreateMatchRequest } from './requests/createMatch.request';
import { CreateUserRequest } from './requests/createUser.request';
import { PlaceBetRequest } from './requests/placeBet.request';
import { GetUsersResponse } from './responses';
import { CreateMatchResponse } from './responses/createMatch.response';
import { CreateUserResponse } from './responses/createUser.response';
import { GetAllIncompleteMatchLinksResponse } from './responses/getAllIncompleteMatchLinks.response';
import { GetMatchResponse } from './responses/getMatch.response';
import { GetWalletResponse } from './responses/getWallet.response';
import { PlaceBetResponse } from './responses/placeBet.response';

config({ path: '../../.env' });

const headers = {
  'X-API-KEY': process.env.BACKEND_API_KEY,
  'Content-Type': 'application/json',
};

const url =
  process.env.IS_LOCAL === 'true'
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
): Promise<GetUsersResponse> {
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
