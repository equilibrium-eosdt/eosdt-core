export default class Signal<T> {
    private resolve?;
    private reject?;
    private finished;
    private promise;
    constructor();
    readonly done: boolean;
    init: () => void;
    wait: () => Promise<T>;
    emit: (v?: T | undefined) => void;
    cancel: (e: Error) => void;
}
