/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

interface ITaskHistory {
  name: string;
  status: 'pass' | 'fail';
  input: any;
  output: any;
}

interface ITaskInfo {
  input: any;
  output: any;
  history: ITaskHistory[];
}

class Task {
  name: string;

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

  setInput(input: any): void {
    this.taskInfo.input = input;
  }

  setOutput(output: any): void {
    this.taskInfo.output = output;
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
}

const createUser = (username: string): string => {
  console.log(`created ${username}`);
  return 'POGGIE DOGGIE';
};

const wagerModal = (username: string): string => {
  console.log(`wager ${username}`);
  return 'WAGER OUTPUT';
};

const taskCreateUser = new Task('Create User');

const taskErrorResponse = new Task('Error Response');
const taskShowWager = new Task('Wager Modal');

taskCreateUser.pass(taskShowWager);
taskCreateUser.fail(taskErrorResponse);

interface ITaskMap {
  [name: string]: Function;
}

class Saga {
  taskMap: ITaskMap = {};

  addTask(taskName: string, func: Function): void {
    this.taskMap[taskName] = func;
  }

  async start(task: Task): Promise<void> {
    if (!task) return;
    if (!this.taskMap.hasOwnProperty(task.name))
      throw Error(`TASK NOT SUPPORTED: ${task.name}`);

    try {
      task.setOutput(await this.taskMap[task.name](task.input));
      task.completeTask('pass');
    } catch (err) {
      task.completeTask('fail');
    }

    const nextTask = task.nextTask();
    if (nextTask) this.start(nextTask);
  }
}

class BetSaga extends Saga {
  constructor() {
    super();
    this.addTask('Create User', createUser);
    this.addTask('Wager Modal', wagerModal);
  }
}

taskCreateUser.setInput('ELIJAH');

new BetSaga().start(taskCreateUser);
/*
    task('Select Booking').next(Choice('Booking Selected?').when(pass(task(...))
        .fail(task(...))
    

           Create User
        /               \
    Error MSG           
*/
