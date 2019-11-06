export default class Signal<T> {
    private resolve?;
    private reject?;
    private finished;
    private promise;
    wait: () => Promise<T>;
    emit: (v?: T | undefined) => void;
    cancel: (e: Error) => void;
}
