import { errorResponse } from '../common/tasks/errorResponse.task';
import { tempMessageTask } from '../common/tasks/tempMessage.task';
import { Saga } from '../framework/saga';
import { Task } from '../framework/task';
import { getUserBetsTask } from './tasks/getUserBets.task';
import { selectHistoryTask } from './tasks/selectHistory.task';
import { showHistoryTask } from './tasks/showHistory.task';

export class HistorySaga extends Saga {
  name = 'HISTORY';

  constructor() {
    super();
    this.createTasks();
    this.linkTasksToFunctions();
  }

  createTasks(): void {
    const taskTempMessage = new Task('Temp Message');
    const taskSelectHistory = new Task('History Selection');
    const taskGetUserBets = new Task('Get User Bets');
    const taskViewHistory = new Task('Show History');

    const taskErrorResponse = new Task('Error Response');

    taskViewHistory.pass(taskViewHistory);
    taskViewHistory.fail(taskErrorResponse);

    taskGetUserBets.pass(taskViewHistory);
    taskGetUserBets.fail(taskErrorResponse);

    taskSelectHistory.pass(taskGetUserBets);
    taskSelectHistory.fail(taskErrorResponse);

    taskTempMessage.pass(taskSelectHistory);

    this.firstTask = taskTempMessage;
  }

  linkTasksToFunctions(): void {
    // Success
    this.addTask('Temp Message', tempMessageTask);
    this.addTask('History Selection', selectHistoryTask);
    this.addTask('Get User Bets', getUserBetsTask);
    this.addTask('Show History', showHistoryTask);

    // Failure
    this.addTask('Error Response', errorResponse);
  }
}
