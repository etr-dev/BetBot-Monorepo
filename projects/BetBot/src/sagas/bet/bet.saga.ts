/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { errorResponse } from '../common/tasks/errorResponse.task';
import { Saga } from '../framework/saga';
import { Task } from '../framework/task';
import { createUser, selectMatch, UfcApiMessage, wagerTask } from './tasks';

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
    this.addTask('Wager Modal', wagerTask);
    this.addTask('Temp Message', UfcApiMessage);
    this.addTask('Select Match', selectMatch);

    // Failure
    this.addTask('Error Response', errorResponse);
    this.addTask('Invalid Wager', errorResponse);
    this.addTask('API Error', errorResponse);
    this.addTask('Cancel Select Match', errorResponse);
  }

  setInitialInput(input: any): void {
    this.firstTask.setInput(input);
  }

  startSaga(): void {
    this.start(this.firstTask);
  }
}
