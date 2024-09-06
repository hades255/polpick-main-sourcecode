import {
  chartSocketDataInterface,
  getChartInitialData
} from "@/api/functions/game.api";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import SocketEvents from "@/json/events/socketEvents";
import {
  sendEndPrice,
  sendEndPrice15,
  sendStartPrice,
  sendStartPrice15
} from "@/lib/functions/sockets.lib";
import { gameSocketData } from "@/reduxtoolkit/interfaces/interfaces";
import { setGameID } from "@/reduxtoolkit/slices/game.slice";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GameSocket, GlobalSocket, TradeGraphSocket } from "pages/_app";
import { memo, useEffect, useRef, useState } from "react";
import realtimeChart from "./chart";

const RealTimeChart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const svgContainer = useRef<any>(null);

  const behindTenSeconds = () => {
    const tenSeconds = new Date();
    tenSeconds.setMilliseconds(0);
    // tenSeconds.setSeconds(tenSeconds.getSeconds() - 10);
    tenSeconds.setSeconds(tenSeconds.getSeconds() - 35);
    return tenSeconds.getTime();
  };

  const forwardTwoSeconds = () => {
    const elapsedTwoSeconds = new Date();
    elapsedTwoSeconds.setMilliseconds(0);
    // elapsedTwoSeconds.setSeconds(elapsedTwoSeconds.getSeconds() + 2);
    elapsedTwoSeconds.setSeconds(elapsedTwoSeconds.getSeconds() + 5);

    return elapsedTwoSeconds;
  };
  let { startValue, endValue } = { startValue: 0, endValue: 0 };
  // console.log("gameSelector", gameSelector);

  const __chartInit = (
    chart: any,
    data: any,
    e: any,
    meta: {
      start: Date | false;
      end: Date | false;
      width: number;
      height: number;
      isMiningEnd: boolean;
    },
    currentPhase: string
  ) => {
    // console.log("meta", meta);
    // console.log("e", e);
    // console.log("data", data);

    const { start, end, width, height, isMiningEnd } = meta;
    if (
      !startValue &&
      start !== false &&
      new Date(start).setMilliseconds(new Date(e.T).getMilliseconds()) <= e.T
    ) {
      startValue = Number(e.p);
    }

    if (
      !endValue &&
      end !== false &&
      end.setMilliseconds(new Date(e.T).getMilliseconds()) === e.T
    ) {
      endValue = Number(e.p);
    }
    const props = {
      size: [width, height],
      data,
      start: {
        time: start,
        value: startValue
      },
      end: {
        time: end,
        value: endValue
      },
      isMiningEnd,
      currentPhase
    };

    chart.update(props);
  };

  useEffect(() => {
    GlobalSocket.on("connect", () => {
      setSocketConnected(true);
    });
    GlobalSocket.on("disconnect", () => {
      setSocketConnected(false);
    });
  }, []);

  const { data: chartInitialData } = useQuery({
    queryKey: ["ChartInitialData"],
    queryFn: getChartInitialData
  });

  const [chart, setChart] = useState(undefined);

  useEffect(() => {
    if (chartInitialData && chartInitialData.data.length && !chart) {
      const width = (svgContainer.current as HTMLElement).clientWidth || 1152;
      const height = (svgContainer.current as HTMLElement).clientHeight || 235;
      const _chartInitialData = chartInitialData.data.reverse();
      if (_chartInitialData) {
        const chart = realtimeChart({
          size: [width, height],
          xDomain: [behindTenSeconds(), forwardTwoSeconds()],
          yDomain: [0, 0],
          initalData: _chartInitialData.slice(
            _chartInitialData.length - 60,
            _chartInitialData.length - 1
          )
        });
        setChart(chart);
      }
    }
  }, [chartInitialData]);

  useEffect(() => {
    // if(socketConnected){}

    if (TradeGraphSocket.connected && chart) {
      // console.log("REAL TIME");
      // setTimeout(() => {
      //   console.log(socketConnected, "socketConnected");
      // }, 1000);
      setSocketConnected(true);

      const width = (svgContainer.current as HTMLElement).clientWidth || 1152;
      const height = (svgContainer.current as HTMLElement).clientHeight || 235;
      let start: Date | false = false;
      let end: Date | false = false;

      let gameID = "";
      let currentPhase = "";
      let isMiningEnd = false;
      const socketListing = (e: gameSocketData) => {
        if (e?.game_id) {
          gameID = e.game_id;
          dispatch(setGameID(e.game_id));
        }
        isMiningEnd = e?.phase ? e.phase === "MiningEnd" : false;

        currentPhase = e?.phase;
        if (e?.phase === "TradeStart") {
          // const timeOut = setTimeout(() => {
          isMiningEnd = false;
          startValue = 0;
          endValue = 0;
          // const _st = new Date(e.startTime * 1000);
          start = new Date(e.startTime * 1000); //new Date(_st.setSeconds(_st.getSeconds() + 30));
          end = new Date(e.endTime * 1000);
          // console.log(end, "endingTime 1");
          // clearTimeout(timeOut);
          // }, 5 * 1000);
        }

        if (e?.phase === "MiningStart") {
          endValue = 0;
          startValue = e.startPrice;
          // const _st = new Date(e.startTime * 1000);
          start = new Date(e.startTime * 1000); //new Date(_st.setSeconds(_st.getSeconds() + 30));
          end = new Date(e.endTime * 1000);
        }
        if (e?.phase === "MiningEnd") {
          startValue = e.startPrice;
          endValue = e.endPrice;
          isMiningEnd = true;
          end = false;
          start = false;
        }
      };
      let _phase = "";
      const getCurrentState = (e: {
        leftSecond: number;
        totalSecond: number;
        phase: string;
        start_price: string;
        end_price: number;
      }) => {
        _phase = e?.phase;
      };

      TradeGraphSocket.off(SocketEvents.listen.TradingGraphPlot);
      GameSocket.off(SocketEvents.listen.getGameStage, socketListing);
      GameSocket.off(SocketEvents.listen.getGameStageThirty, socketListing);
      GameSocket.off(SocketEvents.listen.getCurrentGameData, socketListing);
      GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
      GameSocket.off(SocketEvents.listen.progress, getCurrentState);

      // if (!chart) {
      //   const chart = realtimeChart({
      //     size: [width, height],
      //     xDomain: [behindTenSeconds(), forwardTwoSeconds()],
      //     yDomain: [0, 0],
      //     meta: { end, start }
      //   });
      //   setChart(chart);
      //   // console.log(chart, "chart");
      // }

      if (Object.keys(router.query)?.length) {
        GameSocket.off(SocketEvents.listen.getGameStage, socketListing);
        GameSocket.on(SocketEvents.listen.getGameStageThirty, socketListing);
        GameSocket.on(SocketEvents.listen.progressThirty, getCurrentState);
        GameSocket.off(SocketEvents.listen.progress, getCurrentState);
      } else {
        GameSocket.on(SocketEvents.listen.getGameStage, socketListing);
        GameSocket.off(SocketEvents.listen.getGameStageThirty, socketListing);
        GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
        GameSocket.on(SocketEvents.listen.progress, getCurrentState);
      }

      GameSocket.on(SocketEvents.listen.getCurrentGameData, socketListing);

      TradeGraphSocket.on(
        SocketEvents.listen.TradingGraphPlot,
        (e: chartSocketDataInterface) => {
          if (e && e?.p) {
            __chartInit(
              chart,
              { time: new Date().getTime(), value: Number(e.p) },
              e,
              {
                start,
                end,
                width,
                height,
                isMiningEnd
              },
              _phase
            );
          }

          if (gameID !== "" && currentPhase === "MiningStart") {
            if (router.query?.game) {
              sendStartPrice({
                game_id: gameID,
                start_price: Number(e.p)
              });
            } else {
              sendStartPrice15({
                game_id: gameID,
                start_price: Number(e.p)
              });
            }

            startValue = Number(e.p); //(._.')

            currentPhase = "";
          }
          if (gameID !== "" && currentPhase === "MiningEnd") {
            if (router.query?.game) {
              sendEndPrice({
                game_id: gameID,
                end_price: Number(e.p)
              });
            } else {
              sendEndPrice15({
                game_id: gameID,
                end_price: Number(e.p)
              });
            }

            endValue = Number(e.p); //(._.')

            currentPhase = "";
          }

          // data.push({ time: new Date(), value: Number(e.p) });
          // isMiningEnd && tempData.push({ time: new Date(), value: Number(e.p) });

          // if (new Date() < new Date(new Date(end).setSeconds(end.getSeconds()))) {
        }
      );
    } else {
      TradeGraphSocket.off(SocketEvents.listen.TradingGraphPlot);
    }
    return () => {
      TradeGraphSocket.off(SocketEvents.listen.TradingGraphPlot);
    };
  }, [socketConnected, router.query, chart]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "100%",
        marginTop: "0px",
        // border: "solid 1px #fff",
        height: 250,
        overflow: "hidden",
        paddingTop: "23px"
      }}
      ref={svgContainer}
      className="hello"
    >
      {!socketConnected && (
        <div
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            top: "0px",
            bottom: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto"
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, .7)",
              padding: "5px 10px",
              borderRadius: "10px"
            }}
          >
            Connecting Server...
          </div>
        </div>
      )}

      <svg
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        id="chart"
      />
    </Box>
  );
};

export default memo(RealTimeChart);
