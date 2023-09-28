/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import { TaskError } from './error';
import { ITaskData, Task } from './task';
import { logger } from '@utils/baseLogger';

/* eslint-disable @typescript-eslint/ban-types */
interface ITaskMap {
  [name: string]: Function;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Saga {
  taskMap: ITaskMap = {};

  protected status: 'progress' | 'pass' | 'fail';

  protected name = 'Saga';

  protected username;

  protected sagaId: string; // generate a unique id for each saga

  protected firstTask: Task;

  private defaultInput: any;

  constructor() {
    this.sagaId = uuidv4();
  }

  public setInitialInput(input: ITaskData): void {
    this.username = input.interaction.user.username;
    this.firstTask.setInput({
      ...this.defaultInput,
      ...input,
      sagaId: this.sagaId,
    });
  }

  protected defaultSagaInput(input: any): void {
    this.defaultInput = input;
  }

  protected addTask(taskName: string, func: Function): void {
    this.taskMap[taskName] = func;
  }

  private async startTask(task: Task): Promise<void> {
    if (!task) return;
    // eslint-disable-next-line no-prototype-builtins
    if (!this.taskMap.hasOwnProperty(task.name))
      throw Error(`TASK NOT SUPPORTED: ${task.name}`);

    try {
      task.setOutput(await this.taskMap[task.name](task.taskInfo.input));
      task.completeTask('pass');
    } catch (err) {
      if (err instanceof TaskError) {
        task.setOutput(err.getTaskInfo());
      } else {
        logger.error('UNKNOWN ERROR IN TASK', err);
      }
      this.status = 'fail';
      task.completeTask('fail');
    }

    task.logTask();
    const nextTask = task.nextTask();
    if (nextTask) {
      this.startTask(nextTask);
    } else if (this.status === 'progress') {
      this.status = 'pass';
    }

    if (!nextTask) this.logSaga();
  }

  public startSaga(): void {
    this.status = 'progress';
    this.logSaga();
    this.startTask(this.firstTask);
  }

  protected logSaga(): void {
    let emoji: string;
    switch (this.status) {
      case 'fail':
        emoji = '❌';
        break;
      case 'pass':
        emoji = '🏁';
        break;
      case 'progress':
      default:
        emoji = '🆕';
        break;
    }

    logger.info(`@${this.username} SAGA: ${this.name} - ${this.sagaId}`, emoji);
  }
}
