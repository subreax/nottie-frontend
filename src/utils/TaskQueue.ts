type Task = () => void;

export class TaskQueue {
  #tasks: Task[] = [];
  #busy = false;

  push<T>(task: (() => T) | (() => Promise<T>)): Promise<T> {
    return this.#pushAsync(
      () => Promise.resolve(task())
    );
  }

  #pushAsync<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.#tasks.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        }

        this.#busy = false;
        this.#runNextTask();
      });
      this.#runNextTask();
    });
  }

  #runNextTask() {
    if (this.#busy) {
      return;
    }

    this.#busy = true;
    const task = this.#tasks.shift();
    if (!task) {
      this.#busy = false;
      return;
    }

    queueMicrotask(task);
  }
};
