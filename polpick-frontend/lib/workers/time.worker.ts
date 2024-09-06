let currentTime = 0;
let interval: ReturnType<typeof setInterval> | null = null;

function clearThisInterval() {
  if (interval) {
    clearInterval(interval);
  }
}
onmessage = (e) => {
  if (e.data.type === "reset") {
    clearThisInterval();
  }

  if (e.data.type === "start") {
    clearThisInterval();
    currentTime = e.data.time;
    interval = setInterval(() => {
      if (currentTime > 0) {
        currentTime -= 1;
        //post message time updated
        postMessage({
          time: currentTime,
          type: "updated"
        });
      } else {
        //post message done
        postMessage({
          time: currentTime,
          type: "finished"
        });
        clearThisInterval();
      }
    }, 1000);
  }
};
