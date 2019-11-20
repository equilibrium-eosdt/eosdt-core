export default class Signal<T> {
  private resolve?: (v?: T) => void;
  private reject?: (e: Error) => void;
  private finished: boolean = false;

  public get done() {
    return this.finished;
  }

  private promise: Promise<T> = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });

  public wait = (): Promise<T> => this.promise;

  public emit = (v?: T) => {
    if (this.finished) {
      throw new Error("Signal already finished");
    }

    this.finished = true;
    this.resolve!(v);
  };

  public cancel = (e: Error) => {
    if (this.finished) {
      throw new Error("Signal already finished");
    }

    this.reject!(e);
  };
}
