import {
  EventByUrlControllerResponse,
  NextEventControllerResponse,
  UfcEventDto,
} from '@betbot-monorepo/betbot-backend';
import { backendRequest } from '../backendApi/backend.client';

export async function ufcApiHealth(): Promise<string> {
  const health = await backendRequest<string>({
    method: 'get',
    url: ``,
  });

  return health;
}

export async function getUpcomingFights(): Promise<UfcEventDto> {
  const event = await backendRequest<NextEventControllerResponse>({
    method: 'get',
    url: `/ufc/nextEvent`,
  });

  return event.data;
}

export async function getEventByUrl(eventUrl: string): Promise<UfcEventDto> {
  const event = await backendRequest<EventByUrlControllerResponse>({
    method: 'get',
    url: `/ufc/eventByUrl`,
    params: { url: eventUrl },
  });

  return event.data;
}
