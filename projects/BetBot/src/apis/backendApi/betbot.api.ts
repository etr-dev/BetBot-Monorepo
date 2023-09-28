import {
  BetDto,
  CompleteMatchControllerResponse,
  CompleteMatchDto,
  CreateMatchControllerResponse,
  CreateMatchDto,
  CreateUserControllerResponse,
  CreateUserDto,
  GetBetsControllerResponse,
  GetMatchDto,
  GetMatchesControllerResponse,
  GetUserDto,
  GetUsersBetsDto,
  GetUsersControllerResponse,
  GetWalletByIdControllerResponse,
  GetWalletDto,
  MatchDto,
  PlaceBetControllerResponse,
  PlaceBetDto,
} from '@betbot-monorepo/betbot-backend';
import { logger } from '@utils/baseLogger';
import { backendRequest } from './backend.client';

export async function databaseHealth(): Promise<string> {
  return backendRequest({ url: '' });
}

export async function createUser(
  createUserRequest: CreateUserDto,
): Promise<CreateUserControllerResponse['data']> {
  const data = JSON.stringify(createUserRequest);

  const user = await backendRequest<CreateUserControllerResponse>({
    method: 'post',
    url: '/betbot/user',
    data,
  });

  return user.data;
}

export async function getWallet(
  getWalletDto: GetWalletDto,
): Promise<GetWalletByIdControllerResponse['data']> {
  const wallet = await backendRequest<GetWalletByIdControllerResponse>({
    method: 'get',
    url: `/betbot/wallet`,
    params: getWalletDto,
  });

  return wallet.data;
}

export async function getMatch(
  getMatchDto: GetMatchDto,
): Promise<GetMatchesControllerResponse['data']> {
  const data = JSON.stringify(getMatchDto);

  const match = await backendRequest<GetMatchesControllerResponse>({
    method: 'get',
    url: `/betbot/match`,
    data,
  });

  return match.data; // Array of matches
}

export async function getIncompleteMatchLinks(): Promise<string[]> {
  const data: GetMatchDto = { isComplete: false };

  const response = await backendRequest<GetMatchesControllerResponse>({
    method: 'get',
    url: `/betbot/match`,
    data,
  });

  const matches = response.data;
  const incompleteMatchLinks = matches.map(
    (specificMatch) => specificMatch.link,
  );
  return incompleteMatchLinks;
}

export async function createMatch(
  createMatchDto: CreateMatchDto,
): Promise<MatchDto['_id']> {
  const data = JSON.stringify(createMatchDto);

  const response = await backendRequest<CreateMatchControllerResponse>({
    method: 'post',
    url: `/betbot/match`,
    data,
  });
  const { matchId } = response;

  return matchId;
}

export async function completeMatch(
  completeMatchDto: CompleteMatchDto,
): Promise<BetDto['_id'][]> {
  logger.info(`Completing: ${completeMatchDto.matchTitle}`);
  const data = JSON.stringify(completeMatchDto);

  const response = await backendRequest<CompleteMatchControllerResponse>({
    method: 'post',
    url: `/betbot/match/complete`,
    data,
  });

  return response.data; // list of betIds
}

export async function placeBet(
  placeBetDto: PlaceBetDto,
): Promise<PlaceBetControllerResponse['betId']> {
  const data = JSON.stringify(placeBetDto);

  const response = await backendRequest<PlaceBetControllerResponse>({
    method: 'post',
    url: `/betbot/bet`,
    data,
  });

  return response.betId;
}

export async function getUsersBets(
  getUsersBetsRequest: GetUsersBetsDto,
): Promise<GetBetsControllerResponse['bets']> {
  const response = await backendRequest<GetBetsControllerResponse>({
    method: 'get',
    url: `/betbot/bet/user/${getUsersBetsRequest.userId}`,
    params: {
      betSelection: getUsersBetsRequest.betSelection,
      attachMatchInfo: getUsersBetsRequest.attachMatchInfo,
    },
  });

  return response.bets; // array of {bet, match}[]
}

export async function getUser(
  getUserDto: GetUserDto,
): Promise<GetUsersControllerResponse['data']> {
  const response = await backendRequest<GetUsersControllerResponse>({
    method: 'get',
    url: `/betbot/user`,
    params: getUserDto,
  });

  return response.data; // list of users
}
