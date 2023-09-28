import { logger } from '@utils/baseLogger';
import {
  ChatInputCommandInteraction,
  CommandInteraction,
  MessageComponentInteraction,
  ModalSubmitInteraction,
} from 'discord.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITaskData {
  interaction?:
    | ChatInputCommandInteraction
    | MessageComponentInteraction
    | CommandInteraction
    | ModalSubmitInteraction;
  [name: string]: any;
}

interface ITaskHistory {
  name: string;
  status: 'pass' | 'fail';
  input: ITaskData;
  output: ITaskData;
}

interface ITaskInfo {
  input: ITaskData;
  output: ITaskData;
  history: ITaskHistory[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Task {
  name: string;

  protected username: string;

  private passTask: Task;

  private failTask: Task;

  private status: 'pass' | 'fail';

  taskInfo: ITaskInfo = {
    input: undefined,
    output: undefined,
    history: [],
  };

  constructor(name: string) {
    this.name = name;
  }

  completeTask(status: 'pass' | 'fail'): void {
    this.status = status;
  }

  pass(passTask: Task): void {
    this.passTask = passTask;
  }

  fail(failTask: Task): void {
    this.failTask = failTask;
  }

  setInput(input: ITaskData): void {
    this.username = input.interaction.user.username;
    this.taskInfo.input = input;
  }

  setOutput(output: ITaskData, addToInput = true): void {
    if (addToInput) {
      this.taskInfo.output = { ...this.taskInfo.input, ...output };
    } else {
      this.taskInfo.output = output;
    }
  }

  private taskToHistory(): ITaskHistory {
    return {
      name: this.name,
      status: this.status,
      input: this.taskInfo.input,
      output: this.taskInfo.output,
    };
  }

  addHistory(task: Task): void {
    this.taskInfo.history = task.taskInfo.history;
    this.taskInfo.history.push(task.taskToHistory());
  }

  nextTask(): Task | undefined {
    // FAILURE TASK
    if (this.status === 'fail') {
      if (!this.failTask) return undefined;
      this.failTask.setInput(this.taskInfo.output);
      this.failTask.addHistory(this);
      return this.failTask;
    }

    // SUCCESS TASK
    if (this.status === 'pass') {
      if (!this.passTask) return undefined;
      this.passTask.setInput(this.taskInfo.output); // SET THE INPUT TO THE NEXT TASK AS THE OUTPUT FROM PREVIOUS
      this.passTask.addHistory(this);
      return this.passTask;
    }
    throw Error(`TASK INCOMPLETE: ${this.name}`);
  }

  logTask(): void {
    let emoji = this.status === 'pass' ? '✅' : '⛔';
    if (!this.status) emoji = undefined;
    logger.info(
      `@${this.username} TASK: ${this.name} - ${this.taskInfo.input.sagaId}`,
      emoji,
    );
  }
}
