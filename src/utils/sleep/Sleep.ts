
/*
* sleep 기능은 await/ async 에서만 사용가능
* example
*
* async () => {
*   await sleep(3)      // 3초동안 멈춘다
* }
* */
export const sleep = (seconds: number): Promise<null> => {
    return new Promise<null>(resolve => setTimeout(resolve, seconds * 1000));
};


