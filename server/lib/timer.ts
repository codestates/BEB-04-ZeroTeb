export const setMyInterval = (callback: (index: number) => void, interval: number, limit: number) =>
  new Promise((resove, reject) => {
    let flag = true;

    const tick = (count) => {
      setTimeout(() => {
        if (!flag) return;
        if (count >= limit) {
          resove(true);
          return;
        }

        callback(count);
        tick(count + 1);
      }, interval);
    };
    tick(0);
    return () => {
      flag = false;
    };
  });

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
    resolve(true);
  });
