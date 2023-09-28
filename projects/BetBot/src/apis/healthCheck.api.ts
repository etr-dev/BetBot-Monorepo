import { logger } from '@utils/baseLogger';
import { databaseHealth } from './backendApi/betbot.api';
import { ufcApiHealth } from './ufcApi';

export async function healthCheck(): Promise<boolean> {
  const databaseResponse = await databaseHealth();
  const ufcApiResponse = await ufcApiHealth();

  if (databaseResponse && ufcApiResponse) {
    logger.info('Database is reachable!');
    return true;
  }
  if (!databaseResponse) {
    logger.error('Database is unreachable');
  } else if (!ufcApiResponse) {
    logger.error('UFC API is unreachable');
  }

  return false;
}
