"use client";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ProgressTimer } from "@/interface/common.interface";
import SocketEvents from "@/json/events/socketEvents";
import sounds from "@/json/sounds";
import { setIsBettingPhase } from "@/reduxtoolkit/slices/game.slice";
import { TimeBlockWrapper } from "@/styles/StyledComponents/TimeBlockWrapper";
import { BoxProps, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GameSocket } from "pages/_app";
import React, { memo, useEffect, useState } from "react";

const TimeBlock: React.FC<BoxProps> = ({ ...props }) => {
  const router = useRouter();

  const { isMute } = useAppSelector((s) => s.soundSlice);

  const dispatch = useAppDispatch();
  const cntDwntoMiningEndAudio = new Howl({
    src: [sounds.countDwnEndAudio],
    mute: isMute
  });

  const cntDwntoMiningStartAudio = new Howl({
    src: [sounds.countDownTimerBeforeEndAudio],
    mute: isMute
  });

  const gameSelector = useAppSelector((state) => state.gameSlice);
  const t2 = useAppSelector((state) => state.timerSlice.currentGameStatus);
  // const [progress, setProgress] = useState(100); // Initial progress (100%)
  const [progressData, setProgressData] = useState<ProgressTimer>({
    leftSecond: 0,
    totalSecond: 30
  });
  const isMiningPhase = t2?.phase === "MiningStart";

  // const Progress = isMiningPhase
  //   ? ((30 - timerSelector + 1) / 30) * 100
  //   : ((timerSelector - 1) / 30) * 100;

  // const ProgressForFifteen = isMiningPhase
  //   ? ((15 - timerSelector + 1) / 15) * 100
  //   : ((timerSelector - 1) / 15) * 100;

  // const NewProgress = isMiningPhase
  //   ? ((50 - timerSelector + 1) / 50) * 100
  //   : ((timerSelector - 1) / 50) * 100;

  useEffect(() => {
    if (t2?.phase !== "TradeStart") {
      gameSelector.bettingPhase && dispatch(setIsBettingPhase(false));
    }
    if (
      t2?.phase === "TradeStart" &&
      progressData.leftSecond &&
      progressData.leftSecond > 5
    ) {
      !gameSelector.bettingPhase && dispatch(setIsBettingPhase(true));
    }

    if (
      progressData?.leftSecond &&
      progressData?.leftSecond <= 5 &&
      t2?.phase === "TradeStart"
    ) {
      cntDwntoMiningStartAudio.play();
      if (gameSelector.bettingPhase) {
        dispatch(setIsBettingPhase(false));
      }
    }
    if (
      progressData?.leftSecond &&
      progressData?.leftSecond <= 5 &&
      t2?.phase === "MiningStart"
    ) {
      cntDwntoMiningEndAudio.play();
    }
  }, [progressData?.leftSecond, router.query?.game]);

  const getmaxLimit = () => {
    if (router.query?.game) {
      if (t2?.phase === "TradeStart") return 30;
      if (t2?.phase === "MiningStart") return 30;
      else return 5; // for dist
    } else {
      if (t2?.phase === "TradeStart") return 30;
      if (t2?.phase === "MiningStart") return 15;
      else return 5; // for dist
    }
  };

  const getProgress = () => {
    if (!progressData) return 0;
    else {
      return isMiningPhase
        ? ((getmaxLimit() - progressData.leftSecond) / getmaxLimit()) * 100
        : (progressData.leftSecond / getmaxLimit()) * 100;
    }
  };

  const getBackgroundClass = () => {
    if (t2?.phase === "distribution") {
      return "distributioncolor";
    }
    if (isMiningPhase) {
      switch (true) {
        case getProgress() <= 65 && getProgress() >= 35:
          return "orrangleCls";
        case getProgress() > 65:
          return "redClass";
        default:
          return "BlueClass";
      }
    } else {
      switch (true) {
        case getProgress() <= 65 && getProgress() >= 35:
          return "orrangleCls";
        case getProgress() < 35:
          return "redClass";
        default:
          return "BlueClass";
      }
    }
  };
  const setTimer = (e: ProgressTimer) => {
    setProgressData(e);
  };

  useEffect(() => {
    if (GameSocket.connected) {
      if (router.query?.game === "30") {
        GameSocket.on(SocketEvents.listen.progressThirty, setTimer);
        GameSocket.off(SocketEvents.listen.progress, setTimer);
      } else {
        GameSocket.on(SocketEvents.listen.progress, setTimer);
        GameSocket.off(SocketEvents.listen.progressThirty, setTimer);
      }
    }
    return () => {
      GameSocket.off(SocketEvents.listen.progress, setTimer);
      GameSocket.off(SocketEvents.listen.progressThirty, setTimer);
    };
  }, [GameSocket.connected, router.query?.game]);

  return (
    <TimeBlockWrapper
      progress={getProgress()}
      // progress={progress}
      ismining={isMiningPhase.toString()}
      className={`${props?.className} ${
        getBackgroundClass()
        // isMiningPhase
        //   ? Progress <= 65 && Progress >= 35
        //     ? "orrangleCls"
        //     : Progress > 65
        //     ? "redClass"
        //     : "BlueClass"
        //   : Progress <= 65 && Progress >= 35
        //   ? "orrangleCls"
        //   : Progress < 35
        //   ? "redClass"
        //   : "BlueClass"
      }`}
    >
      <>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={`${
                  isMiningPhase
                    ? getProgress() <= 65 && getProgress() >= 35
                      ? "#FA7D37"
                      : getProgress() > 65
                      ? "#FA7C7B"
                      : "#769bff"
                    : getProgress() <= 65 && getProgress() >= 35
                    ? "#FA7D37"
                    : getProgress() < 35
                    ? "#FA7C7B"
                    : "#769bff"
                }`}
              />
              <stop
                offset="100%"
                stopColor={`${
                  isMiningPhase
                    ? getProgress() <= 65 && getProgress() >= 35
                      ? "#EF7028"
                      : getProgress() > 65
                      ? "#E94F4B"
                      : "#326aff"
                    : getProgress() <= 65 && getProgress() >= 35
                    ? "#EF7028"
                    : getProgress() < 35
                    ? "#E94F4B"
                    : "#326aff"
                }`}
              />
            </linearGradient>
          </defs>
        </svg>
        {t2?.phase !== "distribution" ? (
          <CircularProgress
            // size={100}
            value={
              // Progress
              getProgress()
            }
            // value={t2?.totalTime ? t2.totalTime * timerSelector * 100 : 60}
            // value={(30 * timerSelector) / 100}
            variant="determinate"
            sx={{
              "svg circle": { stroke: "url(#my_gradient)", strokeWidth: "2px" }
            }}
            className="graph_score_progress"
          />
        ) : null}
      </>

      {t2?.phase && t2.phase === "distribution" ? (
        <>
          <Typography variant="h4" className="animated_title">
            Distributing
          </Typography>
          <Typography variant="h4" className="animated_title">
            Payouts
          </Typography>
        </>
      ) : (
        // <Typography variant="h4">Waiting..</Typography>
        <>
          <Typography
            variant="h3"
            className={`${
              isMiningPhase
                ? getProgress() <= 65 && getProgress() >= 35
                  ? "orrangleCls"
                  : getProgress() > 65
                  ? "redClass"
                  : "BlueClass"
                : getProgress() <= 65 && getProgress() >= 35
                ? "orrangleCls"
                : getProgress() < 35
                ? "redClass"
                : "BlueClass"
            }`}
          >
            {progressData?.leftSecond && progressData?.leftSecond > 9
              ? progressData?.leftSecond
              : `0${progressData?.leftSecond}`}
            {/* {Math.ceil(remainingSeconds)} */}
          </Typography>
          <Typography>sec</Typography>
          {/* <Typography>{t2?.phase}</Typography> */}
        </>
      )}
    </TimeBlockWrapper>
  );
};

export default memo(TimeBlock);
