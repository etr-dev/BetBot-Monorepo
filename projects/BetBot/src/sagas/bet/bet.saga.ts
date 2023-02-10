/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Saga } from '../framework/saga';
import { Task } from '../framework/task';

const createUser = (username: string): string => {
  console.log(`created ${username}`);
  return 'POGGIE DOGGIE';
};

const wagerModal = (username: string): string => {
  console.log(`wager ${username}`);
  return 'WAGER OUTPUT';
};

const defaultFunction = (input: any): string => {
  console.log(input);
  return input + Math.floor(Math.random() * 9);
};

export class BetSaga extends Saga {
  private firstTask: Task;

  constructor() {
    super();
    this.createTasks();
    this.linkTasksToFunctions();
  }

  createTasks(): void {
    const taskCreateUser = new Task('Create User');
    const taskErrorResponse = new Task('Error Response');

    const taskShowWager = new Task('Wager Modal');
    const taskInvalidWager = new Task('Invalid Wager');

    const taskTempMessage = new Task('Temp Message');
    const taskApiError = new Task('API Error');

    const taskSelectMatch = new Task('Select Match');
    const cancelSelectMatch = new Task('Cancel Select Match');

    taskSelectMatch.fail(cancelSelectMatch);

    taskTempMessage.pass(taskSelectMatch);
    taskTempMessage.fail(taskApiError);

    taskShowWager.pass(taskTempMessage);
    taskShowWager.fail(taskInvalidWager);

    taskCreateUser.pass(taskShowWager);
    taskCreateUser.fail(taskErrorResponse);

    this.firstTask = taskCreateUser;
  }

  linkTasksToFunctions(): void {
    // Success
    this.addTask('Create User', createUser);
    this.addTask('Wager Modal', wagerModal);
    this.addTask('Temp Message', defaultFunction);
    this.addTask('Select Match', defaultFunction);

    // Failure
    this.addTask('Error Response', defaultFunction);
    this.addTask('Invalid Wager', defaultFunction);
    this.addTask('API Error', defaultFunction);
    this.addTask('Cancel Select Match', defaultFunction);
  }

  setInitialInput(input: any): void {
    this.firstTask.setInput(input);
  }

  startSaga(): void {
    this.start(this.firstTask);
  }
}
