import { errorResponse } from '../common/tasks/errorResponse.task';
import { Saga } from '../framework/saga';
import { Task } from '../framework/task';
import { createUser } from './tasks/createUser.task';
import { tempMessageTask } from './tasks/tempMessage.task';
import { showWalletTask } from './tasks/walletMessage.task';

export class WalletSaga extends Saga {
  name = 'WALLET';

  constructor() {
    super();
    this.createTasks();
    this.linkTasksToFunctions();
  }

  createTasks(): void {
    const taskTempMessage = new Task('Temp Message');
    const taskCreateUser = new Task('Create User');
    const taskShowWallet = new Task('Show Wallet');

    const taskErrorResponse = new Task('Error Response');

    taskShowWallet.fail(taskErrorResponse);

    taskCreateUser.pass(taskShowWallet);
    taskCreateUser.fail(taskErrorResponse);

    taskTempMessage.pass(taskCreateUser);

    this.firstTask = taskTempMessage;
  }

  linkTasksToFunctions(): void {
    // Success
    this.addTask('Temp Message', tempMessageTask);
    this.addTask('Create User', createUser);
    this.addTask('Show Wallet', showWalletTask);

    // Failure
    this.addTask('Error Response', errorResponse);
  }
}
