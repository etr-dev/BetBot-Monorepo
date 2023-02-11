import { logError } from '@utils/log';
import { TaskError } from './error';
import { Task } from './task';

/* eslint-disable @typescript-eslint/ban-types */
interface ITaskMap {
  [name: string]: Function;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Saga {
  taskMap: ITaskMap = {};

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
        logError('TASK ERROR');
        task.setOutput(err.getTaskInfo());
      } else {
        logError('UNKNOWN ERROR');
        console.log(err);
      }
      task.completeTask('fail');
    }

    const nextTask = task.nextTask();
    if (nextTask) this.start(nextTask);
  }
}
