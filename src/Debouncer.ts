export class Debouncer<T> {
  private debounceTimeMs: number;
  private onUpdate: (val: T) => void;

  private timeoutHandle = 0;

  constructor(debounceTimeMs: number, onUpdate: (val: T) => void) {
    this.debounceTimeMs = debounceTimeMs;
    this.onUpdate = onUpdate;
  }

  update(val: T) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => this.onUpdate(val), this.debounceTimeMs);
  }
}
