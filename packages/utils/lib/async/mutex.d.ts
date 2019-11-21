declare type Releaser = (fn?: () => void) => void;
declare class Mutex {
    private pending;
    private queue;
    private dispatchNext;
    isLocked: () => boolean;
    acquire: () => Promise<Releaser>;
}
export default Mutex;
