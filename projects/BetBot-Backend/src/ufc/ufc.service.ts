import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { logError } from '../utils/log';
import { UfcEventDto } from './dto';
import { AllEventsServiceResponse } from './models/responses/allEvents.response';
import { AllLinksServiceResponse } from './models/responses/allLinks.response';
import { EventByUrlServiceResponse } from './models/responses/eventByUrl.response';
import { NextEventServiceResponse } from './models/responses/nextEvent.response';
import { getAllEventLinks, scrapeUfcPage } from './scraper';

@Injectable()
export class UfcService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async addToCache<T>(key: string, item: T) {
    await this.cacheManager.set(key, item);
  }

  async getFromCache<T>(key: string): Promise<T> {
    const value: T = await this.cacheManager.get(key);
    return value;
  }

  async isInCache(key: string) {
    return (await this.cacheManager.get(key)) ? true : false;
  }

  async nextEvent(): Promise<NextEventServiceResponse> {
    let eventLinks: string[];
    let scraped: UfcEventDto;
    try {
      eventLinks = await getAllEventLinks('https://www.ufc.com/events');
      if (!eventLinks.length) throw 'empty event links';
    } catch (e) {
      eventLinks = await getAllEventLinks('https://www.ufc.com/tickets');
    }

    if (!eventLinks.length)
      throw new InternalServerErrorException('EventLinks is empty');

    try {
      scraped = await scrapeUfcPage(eventLinks[0]);
    } catch (e) {
      logError(e);
      throw new InternalServerErrorException(
        `Error Scraping Page: ${eventLinks[0]}`,
      );
    }

    return scraped as unknown as UfcEventDto;
  }

  async eventByUrl(url: string): Promise<EventByUrlServiceResponse> {
    const cachedEvent: UfcEventDto = await this.getFromCache(url);
    let event: UfcEventDto;

    if (cachedEvent) {
      event = cachedEvent;
    } else {
      event = await scrapeUfcPage(url);
      await this.addToCache(url, event);
    }

    return event;
  }

  async allEvents(): Promise<AllEventsServiceResponse> {
    let allEvents: UfcEventDto[] = [];

    const eventLinks = await getAllEventLinks('https://www.ufc.com/tickets');
    for (let event of eventLinks) {
      allEvents.push(await scrapeUfcPage(event));
    }

    return allEvents;
  }

  async allEventLinks(): Promise<AllLinksServiceResponse> {
    let eventLinks: string[] = await getAllEventLinks(
      'https://www.ufc.com/tickets',
    );
    return eventLinks;
  }
}
