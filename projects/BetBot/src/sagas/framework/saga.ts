import { logError } from '@utils/log';
import { randomUUID } from 'crypto';
import { TaskError } from './error';
import { Task } from './task';
import { v4 as uuidv4 } from 'uuid';

/* eslint-disable @typescript-eslint/ban-types */
interface ITaskMap {
  [name: string]: Function;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Saga {
  taskMap: ITaskMap = {};
  protected sagaId: string; // generate a unique id for each saga

  constructor() {
    this.sagaId = uuidv4();
  }

  addTask(taskName: string, func: Function): void {
    this.taskMap[taskName] = func;
  }

  async start(task: Task): Promise<void> {
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
        logError('UNKNOWN ERROR');
        console.log(err);
      }
      task.completeTask('fail');
    }

    task.logTask();
    const nextTask = task.nextTask();
    if (nextTask) this.start(nextTask);
  }
}
