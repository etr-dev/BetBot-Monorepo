import { logError, logServer } from '@utils/log';
import { databaseHealth } from './backendApi';
import { ufcApiHealth } from './ufcApi';

export async function healthCheck(): Promise<boolean> {
  const databaseResponse = await databaseHealth();
  const ufcApiResponse = await ufcApiHealth();

  if (databaseResponse && ufcApiResponse) {
    logServer('Database is reachable!');
    return true;
  }
  if (!databaseResponse) {
    logError('Database is unreachable');
  } else if (!ufcApiResponse) {
    logError('UFC API is unreachable');
  }

  return false;
}
