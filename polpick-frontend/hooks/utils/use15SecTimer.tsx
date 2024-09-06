/* eslint-disable import/no-cycle */
import SocketEvents from "@/json/events/socketEvents";
import { gameSocketData } from "@/reduxtoolkit/interfaces/interfaces";
import { clearWinGameDetails } from "@/reduxtoolkit/slices/game.slice";
import { setCurrentGameStatus } from "@/reduxtoolkit/slices/timerSlice";
import { store } from "@/reduxtoolkit/store/store";
import { useRouter } from "next/router";
import { GameSocket } from "pages/_app";
import { useEffect, useState } from "react";

const use15SecTimer = () => {
  const router = useRouter();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  // const timerIntervalRef = useRef<NodeJS.Timeout>();
  // const router = useRouter();
  // console.log("router", router.query);

  // let result = JSON.parse(router.query.result);

  useEffect(() => {
    GameSocket.on("connect", () => {
      setSocketConnected(true);
    });
    GameSocket.on("disconnect", () => {
      setSocketConnected(false);
    });
  }, []);

  // const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // const startTimer = () => {
    // if (workerRef.current) {
    //   workerRef.current.terminate();
    // }
    // workerRef.current = new Worker(
    //   new URL("../../workers/time.worker.ts", import.meta.url)
    // );
    // const timerSelector = store.getState().timerSlice; //30
    // workerRef.current.postMessage({
    //   type: "start",
    //   time: timerSelector.smallTimer
    // });
    // workerRef.current.addEventListener("message", (e) => {
    //   console.log(e.data.time, e.data.type, "timer worker");
    //   store.dispatch(setSmallTimer(e.data.time));
    // });

    //   if (timerIntervalRef.current) {
    //     clearInterval(timerIntervalRef.current); // Clear previous interval if exists
    //   }

    //   const interval = setInterval(() => {
    //     const timerSelector = store.getState().timerSlice; //30

    //     if (
    //       timerSelector.smallTimer > 0
    //       // &&         timerSelector.currentGameStatus?.phase
    //     ) {
    //       store.dispatch(setSmallTimer(timerSelector.smallTimer - 1));
    //     } else {
    //       clearInterval(interval);
    //     }
    //   }, 1000);
    //   timerIntervalRef.current = interval;
    //   return () => clearInterval(interval);
    // };

    const currentGame = (data: gameSocketData) => {
      if (data && Object.keys(data).length !== 0) {
        store.dispatch(setCurrentGameStatus(data));
        store.dispatch(clearWinGameDetails());
        // if (data.phase === "MiningEnd") return;
        // else {
        //   store.dispatch(setSmallTimer(data.seconds));
        //   startTimer();
        // }
      }
    };

    if (GameSocket.connected) {
      GameSocket.on(SocketEvents.listen.getCurrentGameData, (e) => {
        currentGame(e);
      }); //manual
      if (router.query?.game === "30") {
        GameSocket.on(SocketEvents.listen.getGameStageThirty, currentGame);
        GameSocket.off(SocketEvents.listen.getGameStage, currentGame);
      } else {
        GameSocket.on(SocketEvents.listen.getGameStage, currentGame);
        GameSocket.off(SocketEvents.listen.getGameStageThirty, currentGame);
      }
    }
    return () => {
      GameSocket.off(SocketEvents.listen.getCurrentGameData, currentGame);
      GameSocket.off(SocketEvents.listen.getGameStage, currentGame);
      GameSocket.off(SocketEvents.listen.getGameStageThirty, currentGame);
    };
  }, [socketConnected, router.query?.game]);
};

export default use15SecTimer;
