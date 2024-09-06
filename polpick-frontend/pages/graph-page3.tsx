/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */

import SocketEvents from "@/json/events/socketEvents";
import { curveLinear } from "@visx/curve";
// import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { chartSocketDataInterface } from "@/api/functions/game.api";
import {
  TimerSocketData,
  gameSocketData
} from "@/reduxtoolkit/interfaces/interfaces";
// import GraphBallIcon from "@/ui/Icons/GraphBallIcon";
import {
  GraphWrapper,
  LiveStatusToolTip,
  PriceBlock
} from "@/styles/StyledComponents/GraphWrapper";
import GraphBallIcon from "@/ui/Icons/GraphBallIcon";
import StartFlag from "@/ui/Icons/StartFlag";
import { Box, Typography } from "@mui/material";
import { AxisLeft } from "@visx/axis";
// import { localPoint } from "@visx/event";
import { primaryColors } from "@/themes/_muiPalette";
import EndFlag from "@/ui/Icons/EndFlag";
import StatusDownRocket from "@/ui/Icons/StatusDownRocket";
import StatusUpRocket from "@/ui/Icons/StatusUpRocket";
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
import { LinearGradient } from "@visx/gradient";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AreaClosed, Bar, Line, LinePath } from "@visx/shape";
import {
  TooltipWithBounds,
  defaultStyles,
  useTooltip,
  useTooltipInPortal
} from "@visx/tooltip";
import { bisector } from "@visx/vendor/d3-array";
import { useCallback, useEffect, useState } from "react";
import { GameSocket, TradeGraphSocket } from "./_app";

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
type IphaseChangeDataType = {
  phaseChangeDataStart: ITradeData | undefined;
  phaseChangeDataEnd: ITradeData | undefined;
};

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
      <GraphBallIcon />
    </CustomGlyph>
  )
];

const CurrGlyph = GlyphCircle; // Glyphs[0 % Glyphs.length];

export const background = "transparent";
export const accentColor = "#5D89FF";
export const lossColor = "#F25953";

const tooltipStyles = {
  ...defaultStyles,
  background: "transparent",
  border: "none",
  color: "inherit",
  padding: "0px",
  borderRadius: "0px"
};

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };

export interface ThresholdProps {
  margin?: { top: number; right: number; bottom: number; left: number };
}

const Index = ({ margin = defaultMargin }: ThresholdProps) => {
  const height = 300;

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check if window object is available
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Set initial width
      setWindowWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    return () => {};
  }, []);

  const [testData, setTestData] = useState<ITradeData[]>([]);

  const getTime = (d: ITradeData) => new Date(d?.T * 1000).valueOf();
  const getTradedValue = (d: ITradeData) => Number(d?.p);
  const bisectDate = bisector<ITradeData, Date>((d) => new Date(d.T)).left;

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
    domain: [
      Math.min(...testData.map(getTime)),
      Math.max(...testData.map(getTime))
    ]
  });

  // bounds
  const xMax = windowWidth - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  tradeValueScale.range([yMax, 0]);

  const numTicks = 6;

  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [startPrice, setStartPrice] = useState<number>(0);
  const [endPrice, setEndPrice] = useState<number>(0);
  const [graphColor, setGraphColor] = useState<string>("#5D89FF");
  const [phaseChangeData, setPhaseChangeData] = useState<IphaseChangeDataType>({
    phaseChangeDataStart: undefined,
    phaseChangeDataEnd: undefined
  });

  useEffect(() => {
    let _cPhase: TimerSocketData["phase"] | "" = "";
    let _startPrice = 0;
    let _endPrice = 0;
    let currentTradeData: chartSocketDataInterface | undefined = undefined;
    const getCurrentState = (e: TimerSocketData) => {
      _cPhase = e?.phase;
      setCurrentPhase(e?.phase);
    };
    let data: ITradeData[] = [];
    const plotGraph = (e: chartSocketDataInterface) => {
      currentTradeData = e;
      setTestData((r) => [...r, e]);
      data = [...data, e];
    };

    const socketListing = (e: gameSocketData) => {
      if (!currentTradeData) return;
      if (e?.phase === "TradeStart") {
        setPhaseChangeData({
          phaseChangeDataStart: undefined,
          phaseChangeDataEnd: undefined
        });
        setStartPrice(0);
        setEndPrice(0);
        _startPrice = 0;
        _endPrice = 0;
      }
      if (e?.phase === "MiningStart") {
        setPhaseChangeData({
          phaseChangeDataStart: currentTradeData,
          phaseChangeDataEnd: undefined
        });

        setStartPrice(Number(currentTradeData.p));
        _startPrice = Number(currentTradeData.p);
      }
      if (e?.phase === "MiningEnd") {
        setPhaseChangeData((data) => ({
          ...data,
          phaseChangeDataEnd: currentTradeData
        }));
        setEndPrice(Number(currentTradeData.p));
        _endPrice = Number(currentTradeData.p);
      }
      if (e?.phase === "distribution") {
        let _temp = data.slice(data.length - 5);

        setTestData(_temp);
        data = [];
        startRateHideTooltip();
      }
    };

    if (TradeGraphSocket?.connected) {
      TradeGraphSocket.on(SocketEvents.listen.TradingGraphPlot, plotGraph);
    }
    if (GameSocket?.connected) {
      GameSocket.on(SocketEvents.listen.progressThirty, getCurrentState); // per sec
      GameSocket.on(SocketEvents.listen.getGameStageThirty, socketListing); // on stage change
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

  const getAreaFillColor = useCallback(
    (_phase: string, price: number, _sPrice: number) => {
      if (currentPhase === "MiningStart" && _sPrice) {
        if (price > _sPrice) {
          return primaryColors?.color34d16a;
        } else {
          return primaryColors?.colorF45E53;
        }
      } else {
        return "#5D89FF";
      }
    },
    [currentPhase]
  );

  const getStatusUpdate = useCallback(
    (price: number, _sPrice: number) => {
      if (currentPhase === "MiningStart" && _sPrice) {
        if (price > _sPrice) {
          return "UP";
        } else {
          return "DOWN";
        }
      } else {
        return "UP";
      }
    },
    [currentPhase]
  );

  type TooltipData = ITradeData;

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0
  } = useTooltip<TooltipData>({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: timeScale(getTime(testData[testData.length - 1])),
    tooltipTop: tradeValueScale(getTradedValue(testData[testData.length - 1]))
  });

  const {
    showTooltip: startRateShowTooltip,
    hideTooltip: startRateHideTooltip,
    tooltipOpen: startRateOpenTooltip,
    tooltipData: startRateTooltipData,
    tooltipLeft: startRateTooltipLeft = 0,
    tooltipTop: startRateTooltipTop = 0
  } = useTooltip<TooltipData>();

  const { containerRef, containerBounds, TooltipInPortal } = useTooltipInPortal(
    {
      scroll: true,
      detectBounds: true
    }
  );

  useEffect(() => {
    showTooltip({
      tooltipData: testData[testData.length - 1],
      tooltipLeft: timeScale(getTime(testData[testData.length - 1])) / 1.7,
      tooltipTop: tradeValueScale(getTradedValue(testData[testData.length - 1]))
    });
  }, [testData]);

  useEffect(() => {
    if (phaseChangeData !== undefined) {
      startRateShowTooltip({
        tooltipData: phaseChangeData?.phaseChangeDataStart
      });
    }
  }, [phaseChangeData]);

  // console.log("testData", testData.length);
  // console.log(currentPhase, "currentPhase");

  return (
    <GraphWrapper>
      {true ? (
        <Box>
          <svg width={windowWidth} height={height}>
            <rect
              x={0}
              y={0}
              width={windowWidth}
              height={height}
              fill={background}
              rx={14}
            />
            <LinearGradient
              id="area-gradient"
              from={getAreaFillColor(
                currentPhase,
                Number(testData.at(-1)?.p),
                startPrice
              )}
              to={getAreaFillColor(
                currentPhase,
                Number(testData.at(-1)?.p),
                startPrice
              )}
              toOpacity={0.1}
            />
            <Group left={0} top={margin.top}>
              <GridRows
                scale={tradeValueScale}
                width={xMax}
                height={yMax}
                stroke="rgba(103, 120, 177, 0.15)"
              />
              {/* <line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke="#e0e0e0" /> */}
              <AxisLeft
                scale={tradeValueScale}
                left={windowWidth - margin.right}
                tickLabelProps={() => ({
                  fill: primaryColors?.color8f9bbf,
                  fontSize: 10,
                  fontWeight: 600,
                  textAnchor: "end",
                  verticalAnchor: "middle",
                  x: 10
                })}
                hideAxisLine
                numTicks={6}
              />
              {/* <AnimatedAxis
                key="temp-axis-center"
                label=""
                orientation="right"
                numTicks={numTicks}
                animationTrajectory="center"
                hideAxisLine
              /> */}
              <Group left={-windowWidth / 2.5}>
                <AreaClosed
                  data={testData}
                  yScale={tradeValueScale}
                  x={(d) => timeScale(getTime(d))}
                  y={(d) => tradeValueScale(getTradedValue(d))}
                  fillOpacity={0.4}
                  fill="url(#area-gradient)"
                  // onTouchStart={handleTooltip}
                  // onTouchMove={handleTooltip}
                  // onMouseMove={handleTooltip}
                  // onPointerMove={handleTooltip}
                  // onMouseLeave={() => hideTooltip()}
                />
                <LinePath
                  data={testData}
                  x={(d) => timeScale(getTime(d)) ?? 0}
                  y={(d) => tradeValueScale(getTradedValue(d)) ?? 0}
                  stroke={getAreaFillColor(
                    currentPhase,
                    Number(testData.at(-1)?.p),
                    startPrice
                  )}
                  strokeWidth={1.5}
                  strokeDasharray="0"
                  curve={curveLinear}
                />
                {/* {phaseChangeData && (
                  <CustomGlyph
                    left={timeScale(getTime(phaseChangeData))}
                    top={tradeValueScale(getTradedValue(phaseChangeData))}
                  >
                    <StartFlag />
                  </CustomGlyph>
                )} */}
                <CurrGlyph
                  left={timeScale(getTime(testData[testData.length - 1]))}
                  top={tradeValueScale(
                    getTradedValue(testData[testData.length - 1])
                  )}
                  size={110}
                  fill={primaryColors?.textPrimaryColor}
                  stroke={getAreaFillColor(
                    currentPhase,

                    Number(testData.at(-1)?.p),
                    startPrice
                  )}
                  strokeWidth={5}
                />
              </Group>
              {tooltipData && (
                <g>
                  <Line
                    from={{ x: tooltipLeft, y: tooltipTop }}
                    to={{ x: xMax + tooltipLeft, y: tooltipTop }}
                    stroke={primaryColors?.colorFFD912}
                    strokeWidth={1.5}
                    pointerEvents="none"
                    strokeDasharray="5,2"
                  />
                </g>
              )}
              {/* {startRateTooltipData && phaseChangeData && (
                <g>
                  <Line
                    from={{
                      x: timeScale(getTime(phaseChangeData)) / 1.7,
                      y: tradeValueScale(getTradedValue(phaseChangeData))
                    }}
                    to={{
                      x: xMax + timeScale(getTime(phaseChangeData)) / 1.7,
                      y: tradeValueScale(getTradedValue(phaseChangeData))
                    }}
                    stroke={primaryColors?.colorFFD912}
                    strokeWidth={1.5}
                    pointerEvents="none"
                    strokeDasharray="5,2"
                  />
                </g>
              )} */}
            </Group>
            <Group left={-windowWidth / 2.5}>
              {phaseChangeData?.phaseChangeDataStart && (
                <Group>
                  <Bar
                    key={Math.random()}
                    x={timeScale(
                      getTime(phaseChangeData?.phaseChangeDataStart)
                    )}
                    y={yMax - height + margin.bottom}
                    width={20}
                    height={height}
                    fill="transparent"
                  />

                  <CustomGlyph
                    left={timeScale(
                      getTime(phaseChangeData?.phaseChangeDataStart)
                    )}
                    top={yMax - height + margin.bottom * 4}
                  >
                    <StartFlag />
                  </CustomGlyph>
                </Group>
              )}
            </Group>
            <Group left={-windowWidth / 2.5}>
              {phaseChangeData?.phaseChangeDataEnd && (
                <Group>
                  <Bar
                    key={Math.random()}
                    x={timeScale(getTime(phaseChangeData?.phaseChangeDataEnd))}
                    y={yMax - height + margin.bottom}
                    width={20}
                    height={height}
                    fill="transparent"
                  />

                  <CustomGlyph
                    left={timeScale(
                      getTime(phaseChangeData?.phaseChangeDataEnd)
                    )}
                    top={yMax - height + margin.bottom * 4}
                  >
                    <EndFlag />
                  </CustomGlyph>
                </Group>
              )}
            </Group>
          </svg>
          {tooltipData && testData && (
            <TooltipWithBounds
              key={Math.random()}
              left={timeScale(getTime(testData[testData.length - 1])) + 80}
              top={
                tradeValueScale(getTradedValue(testData[testData.length - 1])) -
                15
              }
              style={tooltipStyles}
            >
              <PriceBlock>
                <Typography>Live Price</Typography>
                <Typography variant="h6">
                  {getTradedValue(tooltipData)}
                </Typography>
              </PriceBlock>
            </TooltipWithBounds>
          )}

          {startRateTooltipData && phaseChangeData?.phaseChangeDataStart && (
            <TooltipWithBounds
              key={Math.random()}
              left={
                timeScale(getTime(phaseChangeData?.phaseChangeDataStart)) / 2
              }
              top={tradeValueScale(
                getTradedValue(phaseChangeData?.phaseChangeDataStart)
              )}
              style={tooltipStyles}
            >
              <PriceBlock className="start_tooltip">
                <Typography>Start Rate</Typography>
                <Typography variant="h6">
                  {phaseChangeData?.phaseChangeDataStart?.p}
                </Typography>
              </PriceBlock>
            </TooltipWithBounds>
          )}
          {startRateTooltipData && (
            <TooltipWithBounds
              key={Math.random()}
              left={timeScale(getTime(testData[testData.length - 1])) / 1.7}
              top={tradeValueScale(
                getTradedValue(testData[testData.length - 1])
              )}
              style={tooltipStyles}
            >
              <LiveStatusToolTip
                marketStaus={getStatusUpdate(
                  Number(testData.at(-1)?.p),
                  startPrice
                )}
              >
                <Typography>
                  <Typography variant="caption">
                    {getStatusUpdate(Number(testData.at(-1)?.p), startPrice) ===
                    "UP" ? (
                      <StatusUpRocket />
                    ) : (
                      <StatusDownRocket />
                    )}
                  </Typography>
                  5%
                </Typography>
              </LiveStatusToolTip>
            </TooltipWithBounds>
          )}
        </Box>
      ) : null}

      {/* <Box
        className={
          testData.length >= 6 ? "connecting_block opaque" : "connecting_block"
        }
      >
        <Typography>Connecting...</Typography>
      </Box> */}
    </GraphWrapper>
  );
};

export default Index;
