import { ITaskData } from './task';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TaskError extends Error {
  private taskInfo;

  constructor(msg: string, taskInfo: ITaskData) {
    super(msg);
    this.taskInfo = taskInfo;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TaskError.prototype);
  }

  getTaskInfo(): ITaskData {
    return this.taskInfo;
  }
}
