import {
  Controller,
  Get,
  Query,
  CacheKey,
  CacheTTL,
  CacheInterceptor,
  UseInterceptors,
  createParamDecorator,
  UseGuards,
} from '@nestjs/common';
import { UfcService } from './ufc.service';
import { logServer } from 'src/utils/log';
import { EventByLinkDto } from './dto/eventByLink.dto';
import { AuthGuard } from '@nestjs/passport';
import { NextEventControllerResponse } from './models/responses/nextEvent.response';
import { SecurityHeader } from './api-descriptions/headers.api';
import { EventByUrlControllerResponse } from './models/responses/eventByUrl.response';
import { AllEventsControllerResponse } from './models/responses/allEvents.response';
import { AllLinksControllerResponse } from './models/responses/allLinks.response';
import { ApiTags } from '@nestjs/swagger';

const URL = createParamDecorator((data, req) => {
  const result = new EventByLinkDto();
  result.url = req.query.url;
  return result;
});

@Controller('ufc')
@ApiTags('UFC')
@UseGuards(AuthGuard('api-key'))
@UseInterceptors(CacheInterceptor)
export class UfcController {
  constructor(private readonly ufcService: UfcService) {}
  @CacheKey('nextEvent')
  @CacheTTL(600)
  @SecurityHeader()
  @Get('nextEvent')
  async nextEvent(): Promise<NextEventControllerResponse> {
    logServer('Next Event endpoint hit');
    const event = await this.ufcService.nextEvent();
    return { data: event };
  }

  @SecurityHeader()
  @Get('eventByUrl')
  async eventByUrl(@Query() query: EventByLinkDto): Promise<EventByUrlControllerResponse> {
    logServer('Event by URL endpoint hit');
    const event = await this.ufcService.eventByUrl(query.url);
    return { data: event };
  }

  @CacheKey('allEvents')
  @CacheTTL(3600)
  @SecurityHeader()
  @Get('allEvents')
  async allEvents(): Promise<AllEventsControllerResponse> {
    logServer('allEvents endpoint hit');
    const events = await this.ufcService.allEvents();
    return { data: events }
  }

  @CacheKey('allEventLinks')
  @CacheTTL(10)
  @SecurityHeader()
  @Get('allEventLinks')
  async allEventLinks(): Promise<AllLinksControllerResponse> {
    logServer('allEvents endpoint hit');
    const links = await this.ufcService.allEventLinks();
    return { data: links };
  }
}
