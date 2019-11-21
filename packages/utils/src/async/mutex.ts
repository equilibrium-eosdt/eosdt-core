type Releaser = (fn?: () => void) => void;

class Mutex {
  private pending: boolean = false;
  private queue: Releaser[] = [];

  private dispatchNext = () => {
    if (this.queue.length) {
      this.pending = true;
      this.queue.shift()!(this.dispatchNext);
    } else {
      this.pending = false;
    }
  };

  public isLocked = () => this.pending;

  public acquire = () => {
    const ticket = new Promise<Releaser>((resolve) => this.queue.push(resolve));

    if (!this.pending) {
      this.dispatchNext();
    }

    return ticket;
  };
}

export default Mutex;
