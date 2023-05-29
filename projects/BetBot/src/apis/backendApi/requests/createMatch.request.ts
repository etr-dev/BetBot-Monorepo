import {
  CornerDetailsDto,
  CreateMatchDto,
} from '@betbot-monorepo/betbot-backend';
import { UfcEventResponse } from 'src/apis/ufcApi/responses/ufcEvent.response';

export class CreateMatchRequest implements CreateMatchDto {
  constructor(ufcEvent: UfcEventResponse, selectedMatch: string) {
    this.eventTitle = ufcEvent.eventTitle;
    this.matchTitle = selectedMatch;
    this.link = ufcEvent.url;
    this.isComplete = ufcEvent.fights[selectedMatch].details.isComplete;
    const {
      name: redName,
      image: redImage,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...restRed
    } = ufcEvent.fights[selectedMatch].Red;
    this.Red = { name: redName, image: redImage };

    const {
      name: blueName,
      image: blueImage,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...restBlue
    } = ufcEvent.fights[selectedMatch].Blue;
    this.Blue = { name: blueName, image: blueImage };
  }

  eventTitle: string;

  matchTitle: string;

  link: string;

  isComplete: boolean;

  Red: Partial<CornerDetailsDto> & Pick<CornerDetailsDto, 'name' | 'image'>;

  Blue: Partial<CornerDetailsDto> & Pick<CornerDetailsDto, 'name' | 'image'>;
}
