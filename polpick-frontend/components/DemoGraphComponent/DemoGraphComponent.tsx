/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import SocketEvents from "@/json/events/socketEvents";
import { curveCardinal, curveLinear, curveStep } from "@visx/curve";
// import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { chartSocketDataInterface } from "@/api/functions/game.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import {
  TimerSocketData,
  gameSocketData
} from "@/reduxtoolkit/interfaces/interfaces";
// import GraphBallIcon from "@/ui/Icons/GraphBallIcon";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
// import { MarkerArrow, MarkerCircle } from "@visx/marker";
import {
  Glyph as CustomGlyph,
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphSquare,
  GlyphStar,
  GlyphTriangle,
  GlyphWye
} from "@visx/glyph";
import { extent } from "@visx/vendor/d3-array";
import { AnimatedAreaSeries, AnimatedAxis, Grid, XYChart } from "@visx/xychart";
import { GameSocket, TradeGraphSocket } from "pages/_app";
import { useCallback, useEffect, useState } from "react";

interface ITradeData {
  E: number;
  M: boolean;
  T: number;
  e: string;
  m: boolean;
  p: string;
  q: string;
  s: string;
  t: number;
}

const tradeData: ITradeData[] = [
  {
    E: 1718711391444,
    M: true,
    T: 1718711391443,
    e: "trade",
    m: false,
    p: "65400.7848",
    q: "0.10000000",
    s: "BTCUSDT",
    t: 3641368259
  },
  {
    E: 1718711402555,
    M: false,
    T: 1718711402554,
    e: "trade",
    m: true,
    p: "75000.1234",
    q: "0.20000000",
    s: "BTCUSDT",
    t: 3641368260
  },
  {
    E: 1718711413666,
    M: true,
    T: 1718711413665,
    e: "trade",
    m: false,
    p: "50000.5678",
    q: "0.15000000",
    s: "BTCUSDT",
    t: 3641368261
  },
  {
    E: 1718711424777,
    M: false,
    T: 1718711424776,
    e: "trade",
    m: true,
    p: "85000.6789",
    q: "0.30000000",
    s: "BTCUSDT",
    t: 3641368262
  },
  {
    E: 1718711435888,
    M: true,
    T: 1718711435887,
    e: "trade",
    m: false,
    p: "30000.2345",
    q: "0.25000000",
    s: "BTCUSDT",
    t: 3641368263
  }
];

const Glyphs = [
  GlyphCircle,
  GlyphCross,
  GlyphDiamond,
  GlyphStar,
  GlyphTriangle,
  GlyphSquare,
  GlyphWye,
  ({ left, top }: { left: number; top: number }) => (
    <CustomGlyph left={left} top={top}>
      <circle r={12} fill="red" />
      <text fontSize={16} textAnchor="middle" dy="0.5em">
        💜
      </text>
    </CustomGlyph>
  )
];

const CurrGlyph = Glyphs[0 % Glyphs.length];

export const background = "#f3f3f3";

const defaultMargin = { top: 10, right: 10, bottom: 10, left: 10 };

export type ThresholdProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const DemoGraphComponent = ({
  width = 1000,
  height = 500,
  margin = defaultMargin
}: ThresholdProps) => {
  const gameSelector = useAppSelector((s) => s.gameSlice);
  const [testData, setTestData] = useState<ITradeData[]>([]);

  if (width < 10) return null;
  const dateScaleConfig = { type: "band", paddingInner: 0.3 } as const;
  const temperatureScaleConfig = { type: "linear" } as const;

  // accessors

  const getTime = (d: ITradeData) => new Date(d.T * 1000);
  const getTradedValue = (d: ITradeData) => Number(d.p);

  const tradeValueScale = scaleLinear<number>({
    domain: [
      Math.min(
        ...testData.map((d) => Math.min(getTradedValue(d), getTradedValue(d)))
      ),
      Math.max(
        ...testData.map((d) => Math.max(getTradedValue(d), getTradedValue(d)))
      )
    ],
    nice: true
  });

  const timeScale = scaleTime<number>({
    domain: extent(testData, getTime) as [Date, Date]
  });

  const date = (d: ITradeData) => new Date(d.T * 1000).valueOf();
  const value = (d: ITradeData) => Number(d.p);

  const xScale = scaleTime<number>({
    domain: [Math.min(...tradeData.map(date)), Math.max(...tradeData.map(date))]
  });
  const yScale = scaleLinear<number>({
    domain: [0, Math.max(...tradeData.map(value))]
  });

  // positions
  const getX = (d: ITradeData) => xScale(date(d)) ?? 0;
  const getY = (d: ITradeData) => yScale(value(d)) ?? 0;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // update scale range to match bounds
  xScale.range([0, innerWidth]);
  yScale.range([innerHeight, 0]);

  const yMax = height - margin.top - margin.bottom;

  const config = {
    x: dateScaleConfig,
    y: getTradedValue
  };

  // scales
  const accessors = {
    x: {
      T: getTime
    },
    y: {
      p: getTradedValue
    },
    date: getTime
  };

  const curveType: "linear" | "cardinal" | "step" = "linear";
  const curveTypes = {
    cardinal: curveCardinal,
    step: curveStep,
    linear: curveLinear
  };
  // const curve = curveTypes[curveType];

  const numTicks = 6;

  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [startPrice, setStartPrice] = useState<number>(0);
  const [endPrice, setEndPrice] = useState<number>(0);
  const [graphColor, setGraphColor] = useState<string>("#5D89FF");
  // const plotGraph = (e: any) => {

  //   setTestData((r) => [...r, e]);
  // };
  // const getCurrentState = (e: TimerSocketData) => {
  //   setCurrentPhase(e?.phase);
  //   if (e.phase === "distribution") {
  //     setTestData((prev) => prev.slice(testData.length - 15));
  //   }
  // };

  useEffect(() => {
    let _cPhase: TimerSocketData["phase"] | "" = "";
    let _startPrice = 0;
    let _endPrice = 0;
    let currentTradeData: chartSocketDataInterface | undefined = undefined;
    const getCurrentState = (e: TimerSocketData) => {
      _cPhase = e?.phase;
      setCurrentPhase(e?.phase);
      if (e.phase === "distribution") {
        setTestData((prev) =>
          prev.slice(testData.length - testData.length / 2)
        );
      }
    };

    const plotGraph = (e: chartSocketDataInterface) => {
      // if (_cPhase === "TradeStart") {
      //   setStartPrice(0);
      //   setEndPrice(0);
      //   _startPrice = 0;
      //   _endPrice = 0;
      // }
      // if (_cPhase === "MiningStart") {
      //   setStartPrice(Number(e.p));
      //   _startPrice = Number(e.p);
      // }
      // if (_cPhase === "MiningEnd") {
      //   setEndPrice(Number(e.p));
      //   _endPrice = Number(e.p);
      // }

      currentTradeData = e;
      setTestData((r) => [...r, e]);
    };

    const socketListing = (e: gameSocketData) => {
      if (!currentTradeData) return;
      if (_cPhase === "TradeStart") {
        setStartPrice(0);
        setEndPrice(0);
        _startPrice = 0;
        _endPrice = 0;
      }
      if (_cPhase === "MiningStart") {
        setStartPrice(Number(currentTradeData.p));
        _startPrice = Number(currentTradeData.p);
      }
      if (_cPhase === "MiningEnd") {
        setEndPrice(Number(currentTradeData.p));
        _endPrice = Number(currentTradeData.p);
      }
    };

    if (TradeGraphSocket?.connected) {
      TradeGraphSocket.on(SocketEvents.listen.TradingGraphPlot, plotGraph);
    }
    if (GameSocket?.connected) {
      GameSocket.on(SocketEvents.listen.progressThirty, getCurrentState);
      GameSocket.on(SocketEvents.listen.getGameStageThirty, socketListing);
    }

    // if (Object.keys(router.query)?.length) {
    // GameSocket.off(SocketEvents.listen.getGameStage, socketListing);
    // GameSocket.on(SocketEvents.listen.getGameStageThirty, socketListing);
    // GameSocket.on(SocketEvents.listen.progressThirty, getCurrentState);

    // } else {
    //   GameSocket.on(SocketEvents.listen.getGameStage, socketListing);
    //   GameSocket.off(SocketEvents.listen.getGameStageThirty, socketListing);
    //   GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
    //   GameSocket.on(SocketEvents.listen.progress, getCurrentState);
    // }

    return () => {
      TradeGraphSocket.off(SocketEvents.listen.TradingGraphPlot, plotGraph);
      GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
    };
  }, [TradeGraphSocket?.connected, GameSocket.connected]);
  // console.log("testData", testData);
  console.log("startPrice", startPrice);

  const getAreaFillColor = useCallback(
    (_phase: string, price: number, _sPrice: number) => {
      if (_phase === "MiningStart") return "red";
      else {
        return "#5D89FF";
      }

      // console.log("price", price);
      // // console.log("_sPrice", _sPrice);
      // if (currentPhase === "MiningStart" && _sPrice) {
      //   if (price > _sPrice) {
      //     return "green";
      //   } else {
      //     return "red";
      //   }
      // } else {
      //   return "#5D89FF";
      // }
    },
    [currentPhase]
  );

  return (
    <>
      {/* <svg width={width} height={Math.min(400, height)}>
        <GraphBallIcon id="#marker-circle" size={8} strokeWidth={1} />
        <rect
          width={width}
          height={Math.min(400, height)}
          fill="#efefef"
          rx={14}
          ry={14}
        />
        <Group>
          <LinePath<ITradeData>
            curve={curveLinear}
            data={testData}
            x={(d) => timeScale(getTime(d)) ?? 0}
            y={(d) => tradeValueScale(getTradedValue(d)) ?? 0}
            stroke="#333"
            strokeWidth={2}
            strokeOpacity={1}
            shapeRendering="geometricPrecision"
            // markerMid="url(#marker-circle)"
            markerEnd="url(#marker-circle)"
          />
        </Group>
      </svg> */}
      <XYChart
        xScale={config.x}
        yScale={config.y as any}
        height={Math.min(400, height)}
      >
        <Grid
          key="grid-animationTrajectory" // force animate on update
          rows
          columns={false}
          // animationTrajectory={animationTrajectory}
          numTicks={numTicks}
        />
        <Group>
          <AnimatedAreaSeries
            dataKey="T"
            // data={tradeData}
            data={tradeData?.length ? tradeData : []}
            xAccessor={accessors.x.T}
            yAccessor={accessors.y.p}
            fillOpacity={0.4}
            curve={curveLinear}
            // renderLine={false}
            fill={getAreaFillColor(
              currentPhase,
              Number(tradeData.at(-1)?.p),
              startPrice
            )}
            // markerStart="url(#marker-circle)"
            // markerStart="url(#marker-arrow)"
            // markerEnd="url(#marker-arrow)"
            // markerStart="url(#marker-circle)"
            // markerWidth={5}
            shapeRendering="geometricPrecision"
            // fill={currentPhase === "MiningStart" ? "red" : "#5D89FF"}
            // fill="#5D89FF"
            // stroke="#5D89FF"
            // stroke="#5D89FF"
            // strokeWidth={0}
          />

          <AnimatedAxis
            key="time-axis-center"
            orientation="bottom"
            numTicks={numTicks}
            animationTrajectory="center"
          />
          <AnimatedAxis
            key="temp-axis-center"
            label=""
            orientation="right"
            numTicks={numTicks}
            animationTrajectory="center"
            hideAxisLine
          />
          {/* <MarkerArrow id="marker-arrow" fill="#333" size={6} />
          <MarkerCircle id="marker-circle" fill="#333" size={10} /> */}
          {/* <GlyphCircle
            top={getY(tradeData.at(-1).T)}
            left={getX(tradeData.at(-1).p)}

            // top={tradeValueScale(getTradedValue(tradeData[0])) ?? 0}
            // left={timeScale(getTime(tradeData[0])) ?? 0}
          /> */}
          {/* <svg width={1000} height={1000}>
            <Group left={margin.left} top={margin.top}>
              <LinePath
                data={tradeData}
                x={getX}
                y={getY}
                stroke="blue"
                strokeWidth={2}
                strokeDasharray="2,2"
                curve={curveLinear}
              />

              {tradeData.map((d, i) => {
                const CurrGlyph = Glyphs[i % Glyphs.length];
                const left = getX(d);
                const top = getY(d);
                return (
                  <g key={`line-glyph-${i}`}>
                    <CurrGlyph
                      left={left}
                      top={top}
                      size={110}
                      stroke="red"
                      strokeWidth={10}
                    />
                    <GlyphCircle
                      left={left}
                      top={top}
                      size={110}
                      fill="white"
                      stroke="red"
                      strokeWidth={2}
                    />
                  </g>
                );
              })}
            </Group>
          </svg> */}
        </Group>
        <Group>
          <LinePath
            data={tradeData}
            x={getX}
            y={getY}
            stroke="blue"
            strokeWidth={2}
            strokeDasharray="2,2"
            curve={curveLinear}
          />
          <CurrGlyph
            left={getX(tradeData[tradeData.length - 1])}
            top={getY(tradeData[tradeData.length - 1])}
            size={110}
            fill="white"
            stroke="red"
            strokeWidth={2}
          />
        </Group>
      </XYChart>
    </>
  );
};

export default DemoGraphComponent;
