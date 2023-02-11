/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { errorResponse } from '../common/tasks/errorResponse.task';
import { Saga } from '../framework/saga';
import { Task } from '../framework/task';
import { createUser, selectMatch, UfcApiMessage, wagerTask } from './tasks';
import { betValidation } from './tasks/betValidation.task';
import { placeBetTask } from './tasks/placeBet.task';
import { selectFighter } from './tasks/selectFighter.task';

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

    const taskSelectFighter = new Task('Select Fighter');
    const cancelSelectFighter = new Task('Cancel Select Fighter');

    const taskBetValidation = new Task('Validate Bet');
    const validationFailed = new Task('Validation Failed');

    const taskPlaceBet = new Task('Place Bet');
    const placeBetFailed = new Task('Place Bet Failed');

    taskPlaceBet.fail(placeBetFailed);

    taskBetValidation.pass(taskPlaceBet);
    taskBetValidation.fail(validationFailed);

    taskSelectFighter.pass(taskBetValidation);
    taskSelectFighter.fail(cancelSelectFighter);

    taskSelectMatch.pass(taskSelectFighter);
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
    this.addTask('Select Fighter', selectFighter);
    this.addTask('Validate Bet', betValidation);
    this.addTask('Place Bet', placeBetTask);

    // Failure
    this.addTask('Error Response', errorResponse);
    this.addTask('Invalid Wager', errorResponse);
    this.addTask('API Error', errorResponse);
    this.addTask('Cancel Select Match', errorResponse);
    this.addTask('Cancel Select Fighter', errorResponse);
    this.addTask('Validation Failed', errorResponse);
    this.addTask('Place Bet Failed', errorResponse);
  }

  setInitialInput(input: any): void {
    this.firstTask.setInput({ ...input, sagaId: this.sagaId });
  }

  startSaga(): void {
    this.start(this.firstTask);
  }
}
