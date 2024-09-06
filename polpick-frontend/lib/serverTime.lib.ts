// /* eslint-disable no-plusplus */
// import dayjs from "dayjs";

// let serverTimeWorker: Worker | null = null;

// if (typeof window !== "undefined" && typeof Worker !== "undefined") {
//   try {
//     serverTimeWorker = new Worker(
//       new URL("../public/serverTimer.worker.ts", import.meta.url),
//       { type: "module" }
//     );
//   } catch (error) {
//     console.error("Error creating serverTimeWorker:", error);
//   }
// }

// console.log("serverTimeWorker", serverTimeWorker);

// let currentServerTime = 0;

// const getCurrentLocalTimeUnix = () => {
//   return dayjs().unix();
// };

// export const getServerTime = () => {
//   if (!currentServerTime) {
//     currentServerTime = getCurrentLocalTimeUnix();
//   }
//   return currentServerTime * 1000;
// };

// export const getServerTimeDayjs = () => {
//   return dayjs(getServerTime());
// };

// serverTimeWorker?.addEventListener("message", (event) => {
//   if (event.data === "tick") {
//     currentServerTime++;
//   }
// });

// const startLocalTimeInterval = () => {
//   // Send a message to start the worker
//   serverTimeWorker?.postMessage("runServerTime");
// };

// export const setServerTime = (key: string | undefined | null) => {
//   return new Promise<number>((resolve) => {
//     let decryptedTime = Number(key) || 0;

//     if (!decryptedTime) {
//       decryptedTime = getCurrentLocalTimeUnix();
//     } else {
//       decryptedTime -= 1;
//     }
//     currentServerTime = decryptedTime;

//     startLocalTimeInterval();
//     resolve(currentServerTime);
//   });
// };
