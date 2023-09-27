/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { CompleteMatchRequest } from 'src/apis/backendApi/requests/completeMatch.request';
import {
  completeMatch,
  getEventByUrl,
  getIncompleteMatchLinks,
  getMatch,
} from '@apis';
import { logger } from '@utils/log';

export async function checkMatches(): Promise<void> {
  const incompleteLinks = await getIncompleteMatchLinks(); // Get links to all incomplete events

  try {
    for (const link of incompleteLinks) {
      logger.debug(`Checking for completion: ${link}`);
      const ufcEventRes = await getEventByUrl(link); // Get the current UFC Api Response for the event
      const matches = await getMatch({ link, isComplete: false }); // Get all incomplete matches for that event
      for (const match of matches) {
        // if ufcEventRes.fights[match.matchTitle] is undefined then the match was probably deleted and should be deleted in DB
        if (ufcEventRes.fights[match.matchTitle].details.isComplete) {
          // If they have been complete then update the database
          logger.debug(`Setting match to complete: ${match.matchTitle}`);
          await completeMatch(
            new CompleteMatchRequest(ufcEventRes, match.matchTitle),
          );
        }
      }
    }
  } catch (error) {
    logger.error('Match completion issue!', { error });
  }
}
