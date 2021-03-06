export default class Signal<T> {
  private resolve?: (v?: T) => void;
  private reject?: (e: Error) => void;
  private finished: boolean = false;
  private promise: Promise<T>;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  public get done() {
    return this.finished;
  }

  public init = () => {
    if (!this.finished) {
      throw new Error("trying to reinit signal in use");
    }

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.finished = false;
    });
  };

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
