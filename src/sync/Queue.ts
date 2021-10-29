export class Queue<T> {

    private q: T[] = [];
    private awaiters: ((src: T) => void)[] = [];

    push = (item: T) => {

        // If queue is not empty
        if (this.q.length > 0) {
            this.q.push(item);
            return;
        }

        // If queue is empty and there are awaiters
        if (this.awaiters.length > 0) {
            this.awaiters[0](item);
            return;
        }

        // No awaiters and not empty queue
        this.q.push(item);
    }

    get = async () => {
        if (this.q.length > 0) {
            return this.q.shift()!;
        }
        return await new Promise<T>((resolver) => this.awaiters.push(resolver));
    };

    getOptional = () => {
        if (this.q.length > 0) {
            return this.q.shift()!;
        } else {
            return null;
        }
    }

    get isEmpty() {
        return this.q.length === 0;
    }
}