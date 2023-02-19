import { errorResponse } from '../common/tasks/errorResponse.task';
import { getUsersInGuild } from '../common/tasks/getGuildUsers.task';
import { tempMessageTask } from '../common/tasks/tempMessage.task';
import { Saga } from '../framework/saga';
import { Task } from '../framework/task';
import { showLeaderboardTask } from './tasks/showLeaderboard.task';

export class LeaderboardSaga extends Saga {
  name = 'LEADERBOARD';

  constructor() {
    super();
    this.createTasks();
    this.linkTasksToFunctions();
  }

  createTasks(): void {
    const taskTempMessage = new Task('Temp Message');
    const taskGetGuildUsers = new Task('Get Guild Users');
    const taskShowLeaderBoard = new Task('Show Leaderboard');

    const taskErrorResponse = new Task('Error Response');

    taskShowLeaderBoard.fail(taskErrorResponse);

    taskGetGuildUsers.pass(taskShowLeaderBoard);
    taskGetGuildUsers.fail(taskErrorResponse);

    taskTempMessage.pass(taskGetGuildUsers);

    this.firstTask = taskTempMessage;
  }

  linkTasksToFunctions(): void {
    // Success
    this.addTask('Temp Message', tempMessageTask);
    this.addTask('Get Guild Users', getUsersInGuild);
    this.addTask('Show Leaderboard', showLeaderboardTask);

    // Failure
    this.addTask('Error Response', errorResponse);
  }
}
