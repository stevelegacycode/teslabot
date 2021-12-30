export async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function minimumDelay<T>(ms: number, src: Promise<T>) {
    let start = Date.now();
    let r = await src;
    let d = ms - (Date.now() - start);
    console.warn(Date.now() - start);
    if (d > 0) {
        await delay(d);
    }
    return r;
}