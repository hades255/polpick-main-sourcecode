/* eslint-disable import/no-cycle */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */

import SocketEvents from "@/json/events/socketEvents";
import { curveLinear } from "@visx/curve";
// import ParentSize from "@visx/responsive/lib/components/ParentSize";
import {
  chartSocketDataInterface,
  getChartInitialData
} from "@/api/functions/game.api";
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
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { AxisLeft } from "@visx/axis";
// import { localPoint } from "@visx/event";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import {
  sendEndPrice,
  sendEndPrice15,
  sendStartPrice,
  sendStartPrice15
} from "@/lib/functions/sockets.lib";
import { setGameID } from "@/reduxtoolkit/slices/game.slice";
import { primaryColors } from "@/themes/_muiPalette";
import EndFlag from "@/ui/Icons/EndFlag";
import StatusDownRocket from "@/ui/Icons/StatusDownRocket";
import StatusUpRocket from "@/ui/Icons/StatusUpRocket";
import { easings, useSpring } from "@react-spring/web";
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
import anime from "animejs";
import { motion } from "framer-motion";
// import { easeLinear } from "d3";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { GameSocket, TradeGraphSocket } from "pages/_app";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ITradeData {
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
export const accentColor = primaryColors?.color5D89FF;
export const lossColor = primaryColors?.colorF25953;

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
  height: number;
  windowWidth: number;
}

const VisxChart = ({
  margin = defaultMargin,
  height = 250,
  windowWidth
}: ThresholdProps) => {
  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [graphData, setGraphData] = useState<ITradeData[]>([]);

  const getTime = (d: ITradeData) => new Date(d?.T * 1000).valueOf(); //new Date(d?.T * 1000).valueOf();
  const getTradedValue = (d: ITradeData) => Number(d?.p);
  const bisectDate = bisector<ITradeData, Date>((d) => new Date(d.T)).left;

  const eachLastSet = graphData[graphData.length - 1];

  // const _diff =
  //   Math.max(getTradedValue(graphData[0]), getTradedValue(eachLastSet)) -
  //   Math.min(getTradedValue(graphData[0]), getTradedValue(eachLastSet));

  // console.log(_diff, "_diff");

  const tradeValueScale = scaleLinear<number>({
    domain: [
      Math.min(
        ...graphData.map((d) => Math.min(getTradedValue(d), getTradedValue(d)))
      ),
      Math.max(
        ...graphData.map((d) => Math.max(getTradedValue(d), getTradedValue(d)))
      )
    ],
    nice: true
  });

  const timeScale = scaleTime<number>({
    domain: [
      Math.min(...graphData.map(getTime)),
      Math.max(...graphData.map(getTime))
    ]
  });

  // bounds
  const xMax = windowWidth - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  timeScale.range([0, xMax]);
  tradeValueScale.range([yMax, 0]);

  const numTicks = 6;

  const [currentPhase, setCurrentPhase] = useState<TimerSocketData>();
  const [startPrice, setStartPrice] = useState<number>(0);
  const [endPrice, setEndPrice] = useState<number>(0);
  const [graphColor, setGraphColor] = useState<string>(
    primaryColors?.color5D89FF
  );
  const [phaseChangeData, setPhaseChangeData] = useState<IphaseChangeDataType>({
    phaseChangeDataStart: undefined,
    phaseChangeDataEnd: undefined
  });

  const { data: chartInitialData, isLoading } = useQuery({
    queryKey: ["ChartInitialData"],
    queryFn: getChartInitialData
  });

  useEffect(() => {
    if (chartInitialData && chartInitialData.data.length) {
      const _chartInitialData = chartInitialData.data.reverse();
      const _tempList: ITradeData[] = [];
      _chartInitialData?.map((_item, index) => {
        const _temp = {
          E: 0,
          M: false,
          T: _item?.time,
          e: "",
          m: false,
          p: _item?.value.toString(),
          q: "",
          s: "",
          t: 0
        };

        _tempList.push(_temp);
      });

      setGraphData(
        _tempList.slice(
          _chartInitialData.length - 30,
          _chartInitialData.length - 1
        )
      );
    }
  }, [chartInitialData]);

  // console.log(chartInitialData, "chartInitialData");

  // console.log("currentPhase", router?.query?.game);

  // console.log("graphdata", graphData);
  // console.log("phaseChangeData", phaseChangeData);
  // console.log(
  //   "exists",
  //   phaseChangeData &&
  //     graphData?.findIndex(
  //       (s) => s.T === phaseChangeData?.phaseChangeDataStart?.T
  //     )
  // );
  useEffect(() => {
    if (isLoading) return () => {};
    let _cPhase: TimerSocketData["phase"] | "" = "";
    let _startPrice = 0;
    let _endPrice = 0;
    let gameID = "";
    let currentTradeData: chartSocketDataInterface | undefined = undefined;
    const getCurrentState = (e: TimerSocketData) => {
      _cPhase = e?.phase;
      //   setCurrentPhase(e?.phase);
      setCurrentPhase(e);
    };
    let data: ITradeData[] = [];
    const plotGraph = (e: chartSocketDataInterface) => {
      currentTradeData = e;
      // setGraphData((r) => [...r, { ...e, T: Math.floor(e?.T / 1000) }]);

      setGraphData((r) => [...r, e]);
      data = [...data, e];
    };

    const socketListing = (e: gameSocketData) => {
      if (!currentTradeData) return;
      if (e?.game_id) {
        gameID = e.game_id;
        dispatch(setGameID(e.game_id));
      }
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
        if (e?.startTime && e?.startPrice) {
          const _t =
            Math.floor(Date.now() - e?.startTime * 1000) / 1000 -
            (router?.query?.game === "30" ? 30 : 15);

          const _newPhaseData: chartSocketDataInterface = {
            ...currentTradeData,
            T: Date.now() - _t * 1000, //e?.startTime,  Date.now() - 14 * 1000, startTime, starTime - currentTime = 35 sec Mining 30-35= 5
            p: e?.startPrice.toString()
          };

          setPhaseChangeData({
            phaseChangeDataStart: _newPhaseData, //currentTradeData,
            phaseChangeDataEnd: undefined
          });
        } else {
          setPhaseChangeData({
            phaseChangeDataStart: currentTradeData,
            phaseChangeDataEnd: undefined
          });
        }
        const currentStartPrice = e?.startPrice
          ? e?.startPrice
          : Number(currentTradeData.p);
        setStartPrice(currentStartPrice);

        if (gameID !== "" && router.query?.game) {
          sendStartPrice({
            game_id: gameID,
            start_price: currentStartPrice
          });
        } else {
          sendStartPrice15({
            game_id: gameID,
            start_price: currentStartPrice
          });
        }
      }
      if (e?.phase === "MiningEnd") {
        if (e?.endTime && e?.endPrice) {
          const _t =
            Math.floor(Date.now() - e?.endTime * 1000) / 1000 -
            (router?.query?.game === "30" ? 60 : 45);

          const _newPhaseData: chartSocketDataInterface = {
            ...currentTradeData,
            T: Date.now() - _t * 1000, //e?.startTime,  Date.now() - 14 * 1000, startTime, starTime - currentTime = 35 sec Mining 30-35= 5
            p: e?.startPrice.toString()
          };

          // const _newPhaseData: chartSocketDataInterface = {
          //   ...currentTradeData,
          //   T: e?.endTime,
          //   p: e?.endPrice.toString()
          // };

          setPhaseChangeData((data) => ({
            ...data,
            phaseChangeDataEnd: _newPhaseData
          }));
        } else {
          setPhaseChangeData((data) => ({
            ...data,
            phaseChangeDataEnd: currentTradeData
          }));
        }

        const currentEndPrice = e?.endPrice
          ? e?.endPrice
          : Number(currentTradeData.p);

        setEndPrice(currentEndPrice);
        _endPrice = currentEndPrice;

        if (gameID !== "" && router.query?.game) {
          sendEndPrice({
            game_id: gameID,
            end_price: currentEndPrice
          });
        } else {
          sendEndPrice15({
            game_id: gameID,
            end_price: currentEndPrice
          });
        }
      }

      if (e?.phase === "distribution") {
        const _l = (data?.length * 50) / 100;
        // dedecut this - _l;

        const _temp = data.slice(data.length - _l);
        setGraphData(_temp);
        data = [];
        startRateHideTooltip();
      }
    };

    // TradeGraphSocket.off(SocketEvents.listen.TradingGraphPlot, plotGraph);
    // GameSocket.off(SocketEvents.listen.getGameStage, socketListing);
    // GameSocket.off(SocketEvents.listen.getGameStageThirty, socketListing);
    // GameSocket.off(SocketEvents.listen.getCurrentGameData, socketListing);
    // GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
    // GameSocket.off(SocketEvents.listen.progress, getCurrentState);

    setPhaseChangeData({
      phaseChangeDataStart: undefined,
      phaseChangeDataEnd: undefined
    });
    setStartPrice(0);
    setEndPrice(0);
    _startPrice = 0;
    _endPrice = 0;

    if (TradeGraphSocket?.connected) {
      TradeGraphSocket.on(SocketEvents.listen.TradingGraphPlot, plotGraph);
      if (router.query?.game === "30") {
        GameSocket.off(SocketEvents.listen.getGameStage, socketListing);
        GameSocket.on(SocketEvents.listen.getGameStageThirty, socketListing);
        GameSocket.on(SocketEvents.listen.progressThirty, getCurrentState);
      } else {
        GameSocket.on(SocketEvents.listen.getGameStage, socketListing);
        GameSocket.off(SocketEvents.listen.getGameStageThirty, socketListing);
        GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
        GameSocket.on(SocketEvents.listen.progress, getCurrentState);
      }
    }
    GameSocket.on(SocketEvents.listen.getCurrentGameData, socketListing);

    return () => {
      TradeGraphSocket.off(SocketEvents.listen.TradingGraphPlot, plotGraph);
      GameSocket.off(SocketEvents.listen.progressThirty, getCurrentState);
      GameSocket.off(SocketEvents.listen.getGameStage, socketListing);
      GameSocket.off(SocketEvents.listen.progress, getCurrentState);
    };
  }, [
    TradeGraphSocket?.connected,
    GameSocket.connected,
    router.query,
    isLoading
  ]);

  const getAreaFillColor = useCallback(
    (_phase: string, price: number, _sPrice: number) => {
      if (currentPhase?.phase === "MiningStart" && _sPrice) {
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
      if (currentPhase?.phase === "MiningStart" && _sPrice) {
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
    tooltipLeft: timeScale(getTime(eachLastSet)),
    tooltipTop: tradeValueScale(getTradedValue(eachLastSet))
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
      tooltipData: eachLastSet,
      tooltipLeft: timeScale(getTime(eachLastSet)) / 1.7,
      tooltipTop: tradeValueScale(getTradedValue(eachLastSet))
    });
  }, [graphData]);

  useEffect(() => {
    if (phaseChangeData !== undefined) {
      startRateShowTooltip({
        tooltipData: phaseChangeData?.phaseChangeDataStart
      });
    }
  }, [phaseChangeData]);

  // console.log("graphData", graphData.length);
  // console.log(currentPhase?.phase, "currentPhase");
  //   console.log("ss", currentPhase?.leftSecond);

  const transition = {
    duration: 0.5,
    ease: "easeInOut"
  };

  const [lineProps, api] = useSpring(
    () => ({
      config: {
        easing: easings.linear,
        duration: 2000
        // mass: 5000,
        // friction: 120,
        // tension: 120
      }
    }),
    []
  );
  const pathRef = useRef<any>(null);
  const areaRef = useRef<any>(null);

  useEffect(() => {
    const path = pathRef.current;
    const area = areaRef.current;
    if (path && area) {
      const pathLength = path.getTotalLength();
      const areaLength = path.getTotalLength();

      // Set up the path's stroke properties for the animation
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;

      // Set up the path's stroke properties for the animation
      area.style.strokeDasharray = areaLength;
      area.style.strokeDashoffset = areaLength;

      // Animate the stroke-dashoffset to create the drawing effect
      anime({
        targets: path,
        strokeDashoffset: [pathLength, 0],
        duration: 2000,
        easing: "easeInOutSine",
        direction: "alternate"
        // loop: true
      });

      anime({
        targets: path,
        strokeDashoffset: [areaLength, 0],
        duration: 2000,
        easing: "easeInOutSine",
        direction: "alternate"
        // loop: true
      });
    }
  }, []);

  return (
    <GraphWrapper>
      {!isLoading ? (
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
                currentPhase?.phase || "",
                Number(graphData.at(-1)?.p),
                startPrice
              )}
              to={getAreaFillColor(
                currentPhase?.phase || "",
                Number(graphData.at(-1)?.p),
                startPrice
              )}
              fromOpacity={0.3}
              toOpacity={0}
            />
            <Group left={0} top={margin.top}>
              <GridRows
                scale={tradeValueScale}
                width={xMax}
                height={yMax}
                stroke="rgba(103, 120, 177, 0.15)"
                max={1}
              />

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
              <Group left={-windowWidth / 2.5}>
                <AreaClosed
                  data={graphData}
                  yScale={tradeValueScale}
                  x={(d) => timeScale(getTime(d))}
                  y={(d) => tradeValueScale(getTradedValue(d))}
                  fillOpacity={0.4}
                  curve={curveLinear}

                  // fill="url(#area-gradient)"
                >
                  {({ path }) => (
                    // <animated.path
                    //   d={path(graphData) as string}
                    //   fill="url(#area-gradient)"
                    //   strokeWidth={0}
                    //   strokeDasharray="0"
                    //   style={lineProps}
                    // />
                    <motion.path
                      shapeRendering="geometricPrecision"
                      // d={path(testData) as any}
                      key={Math.random()}
                      fill="url(#area-gradient)"
                      // initial={{
                      //   // pathLength: timeScale(
                      //   //   getTime(graphData[graphData.length - 5])
                      //   // ),
                      //   d: path(graphData) as any
                      // }}
                      strokeLinecap="round"
                      initial={false}
                      animate={{
                        // pathLength: timeScale(
                        //   getTime(eachLastSet)
                        // ),
                        d: path(graphData) as any
                      }}
                      transition={transition}
                    />
                  )}
                </AreaClosed>

                <LinePath
                  data={graphData}
                  x={(d) => timeScale(getTime(d)) ?? 0}
                  y={(d) => tradeValueScale(getTradedValue(d)) ?? 0}
                  curve={curveLinear}
                  innerRef={pathRef}
                  strokeWidth={1.5}
                  strokeDasharray="0"
                  stroke={getAreaFillColor(
                    currentPhase?.phase || "",
                    Number(graphData.at(-1)?.p),
                    startPrice
                  )}
                  fill="transparent"
                />
                {/* {({ path }) => (
                    // <animated.path
                    //   d={path(graphData) as string}
                    //   fill="none"
                    //   strokeWidth={1.5}
                    //   strokeDasharray="0"
                    //   stroke={getAreaFillColor(
                    //     currentPhase?.phase || "",
                    //     Number(graphData.at(-1)?.p),
                    //     startPrice
                    //   )}
                    //   style={lineProps}
                    // />
                    <motion.path
                      // d={path(testData) as any}
                      
                      key={Math.random()}
                      // initial={{
                      //   pathLength: timeScale(
                      //     getTime(graphData[graphData.length - 2])
                      //   ),
                      //   d: path([graphData[graphData.length - 2]]) as any
                      // }}
                      // initial={false}
                      // animate={{
                      //   // pathLength: timeScale(
                      //   //   getTime(eachLastSet)
                      //   // ),
                      //   d: path(graphData) as any
                      // }}
                      strokeLinecap="round"
                      shapeRendering="geometricPrecision"
                      initial={false}
                      animate={{
                        pathLength: timeScale(getTime(eachLastSet)),
                        d: path(testData) as any
                      }}
                      transition={transition}
                      strokeWidth={1.5}
                      strokeDasharray="0"
                      stroke={getAreaFillColor(
                        currentPhase?.phase || "",
                        Number(graphData.at(-1)?.p),
                        startPrice
                      )}
                      fill="transparent"
                    />
                  )}
                </LinePath> */}

                <CurrGlyph
                  left={timeScale(getTime(eachLastSet))}
                  top={tradeValueScale(getTradedValue(eachLastSet))}
                  size={110}
                  fill={primaryColors?.textPrimaryColor}
                  stroke={getAreaFillColor(
                    currentPhase?.phase || "",
                    Number(graphData.at(-1)?.p),
                    startPrice
                  )}
                  strokeWidth={5}
                />
              </Group>
              {tooltipData && (
                <g>
                  <Line
                    from={{
                      x: isMdScreen ? tooltipLeft - 15 : tooltipLeft - 5,
                      y: tooltipTop
                    }}
                    to={{ x: xMax - 30, y: tooltipTop }}
                    stroke={primaryColors?.colorFFD912}
                    strokeWidth={1.5}
                    pointerEvents="none"
                    strokeDasharray="5,2"
                  />
                </g>
              )}
              {startRateTooltipData &&
                phaseChangeData?.phaseChangeDataStart && (
                  <g>
                    <Line
                      from={{
                        x:
                          timeScale(
                            getTime(phaseChangeData?.phaseChangeDataStart)
                          ) / (isMdScreen ? 1.9 : 1.7), // / 1.7
                        y: tradeValueScale(
                          getTradedValue(phaseChangeData?.phaseChangeDataStart)
                        )
                      }}
                      to={{
                        x: xMax,
                        y: tradeValueScale(
                          getTradedValue(phaseChangeData?.phaseChangeDataStart)
                        )
                      }}
                      stroke={primaryColors?.textPrimaryColor}
                      strokeWidth={1.5}
                      pointerEvents="none"
                      strokeDasharray="5,2"
                    />
                  </g>
                )}
            </Group>
            <Group>
              {phaseChangeData?.phaseChangeDataStart && (
                <Group>
                  <Bar
                    key={Math.random()}
                    x={
                      timeScale(
                        getTime(phaseChangeData?.phaseChangeDataStart)
                      ) / 2
                    }
                    y={yMax - height + margin.bottom}
                    width={20}
                    height={height}
                    fill="transparent"
                  />

                  <CustomGlyph
                    left={
                      timeScale(
                        getTime(phaseChangeData?.phaseChangeDataStart)
                      ) / 2
                    }
                    top={yMax - height + margin.bottom * 2}
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
                    top={yMax - height + margin.bottom * 2}
                  >
                    <EndFlag />
                  </CustomGlyph>
                </Group>
              )}
            </Group>
          </svg>
          {tooltipData && graphData && (
            <TooltipWithBounds
              key={Math.random()}
              // left={timeScale(getTime(eachLastSet)) + 80}
              left={timeScale(getTime(eachLastSet)) + 80}
              top={tradeValueScale(getTradedValue(eachLastSet)) - 7}
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
              className={isMdScreen ? "reference_tooltip" : ""}
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
              left={timeScale(getTime(eachLastSet)) / 1.72}
              top={tradeValueScale(getTradedValue(eachLastSet))}
              style={tooltipStyles}
            >
              <LiveStatusToolTip
                marketStaus={getStatusUpdate(
                  Number(graphData.at(-1)?.p),
                  startPrice
                )}
              >
                <Typography>
                  <Typography variant="caption">
                    {getStatusUpdate(
                      Number(graphData.at(-1)?.p),
                      startPrice
                    ) === "UP" ? (
                      <StatusUpRocket />
                    ) : (
                      <StatusDownRocket />
                    )}
                  </Typography>
                  {/* 5% */}
                </Typography>
              </LiveStatusToolTip>
            </TooltipWithBounds>
          )}
        </Box>
      ) : (
        <Box className="connecting_block">
          <Typography>Connecting...</Typography>
        </Box>
      )}
    </GraphWrapper>
  );
};

export default VisxChart;
