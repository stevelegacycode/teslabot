export function asyncTimeout<T>(src: Promise<T>, timeout: number): Promise<T> {
    return new Promise((resolve, reject) => {

        // Callbacks
        let timer: any = null;
        function abort(err: any) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            reject(err);
        }
        function complete(value: T) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            resolve(value);
        }

        // Timeout
        timer = setTimeout(() => {
            abort(new Error('Request timeout'));
        }, timeout);

        // Source
        src.then(complete);
        src.catch(abort);
    });
}