import { IBet } from '../interfaces/bet.interface';
import { IMatch } from '../interfaces/match.interface';

export interface GetUsersBetsResponse {
  message: string;
  data: BetsResponse[];
}

interface BetsResponse {
  bet: IBet;
  match?: IMatch;
}
