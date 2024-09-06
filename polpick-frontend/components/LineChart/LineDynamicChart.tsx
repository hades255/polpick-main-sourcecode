/* eslint-disable no-plusplus */
import SocketEvents from "@/json/events/socketEvents";
import { dataSeries } from "@/json/mock/demo.mock";
import { primaryColors } from "@/themes/_muiPalette";
import { poppins } from "@/themes/_muiTheme";

import { styled } from "@mui/material";
import { TradeGraphSocket } from "pages/_app";

import React, { useEffect, useRef } from "react";
import Chart from "react-apexcharts";

const ChartWrapper = styled(Chart)`
  .apexcharts-tooltip {
    padding: 8px 13px;
    background: linear-gradient(
      157.1deg,
      rgba(79, 128, 255, 0.08) 10.11%,
      rgba(79, 128, 255, 0) 102.1%
    );
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(7.5px);
    border-radius: 8px;
    border: 2px solid #fdde41;
    .arrow_box {
      h6 {
        font-family: ${poppins.style.fontFamily};
        color: #fdde41;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 0 !important;
      }
      p {
        color: ${primaryColors?.textPrimaryColor};
        font-size: 13px;
        font-weight: 400;
        margin: 0;
        line-height: 1;
      }
    }
  }
  .apexcharts-yaxis-label {
    fill: ${primaryColors?.color8f9bbf};
  }
  .apexcharts-xaxistooltip {
    display: none;
  }
`;

interface ChartProps {
  height?: string;
}

const LineDynamicChart = ({ height }: ChartProps) => {
  const chartRef = useRef<any>(null);
  let ts2 = 1484418600000;

  const dates = [];

  for (let i = 0; i < 120; i++) {
    ts2 += 86400000;
    const innerArr = [ts2, dataSeries[1][i].value];
    dates.push(innerArr);
  }

  // const _t: any[] = [];
  const dataMap = new Map<number, number>();
  useEffect(() => {
    const tradingGraphPlotHandler = (data: any) => {
      // console.log("TradingGraphPlot", data);
      if (data?.p && !Number.isNaN(data?.p)) {
        const price = +data.p;
        const timestamp = data.T; //Date.now();

        if (dataMap.has(timestamp)) {
          dataMap.set(timestamp, price);
        } else {
          dataMap.set(timestamp, price);
        }
        // const dataSeries = Array.from(dataMap.entries());

        // console.log("dataSeries", dataSeries);
        // chartRef.current?.chart?.updateSeries([{ data: dataSeries }]);

        //   // const price = +data.p;
        //   // const timestamp = Date.now();
        //   //
        //   // const dataSeries = Array.from(dataMap.entries());
        //   // chartRef.current?.chart?.updateSeries([{ data: dataSeries }]);
      }
    };

    if (TradeGraphSocket.connected) {
      TradeGraphSocket.on(
        SocketEvents.listen.TradingGraphPlot,
        tradingGraphPlotHandler
      );
      // TradeGraphSocket.on("TradingGraphPlot", (data) => {
      //   // console.log("TradingGraphPlot data", data);
      //   if (data?.p && !Number.isNaN(data?.p)) {
      //     const price = +data.p;
      //     // Check if the current timestamp already exists in _t array
      //     const existingTimestampIndex = _t.findIndex(
      //       (item) => item[0] === Date.now()
      //     );
      //     if (existingTimestampIndex !== -1) {
      //       // If the timestamp exists, update the price value
      //       _t[existingTimestampIndex][1] = price;
      //     } else {
      //       // If the timestamp doesn't exist, add a new data point
      //       if (_t.length > 20) {
      //         _t.shift(); // Remove the oldest data point if array length exceeds 20
      //       }
      //       _t.push([Date.now(), price]);
      //     }
      //     console.log("_T", _t);
      //     // if (_t?.length > 20) {
      //     //   _t.shift();
      //     // }
      //     // _t.push([Date.now(), price]);
      //     // console.log("_T", _t);
      //     chartRef.current?.chart?.updateSeries([
      //       {
      //         data: _t
      //       }
      //     ]);
      //   }
      // });
    }
    return () => {
      TradeGraphSocket.off("TradingGraphPlot", tradingGraphPlotHandler);
    };
  }, [TradeGraphSocket.connected]);

  // console.log("render");
  // console.log("chartRef", chartRef);
  // console.log("dates", dates);
  // console.log("render");

  const data = {
    series: [
      {
        name: "BitCoin Counting",
        data: dates //[]
      }
    ]
  };
  const options = {
    //ApexCharts.ApexOptions
    animations: {
      enabled: false
    },
    chart: {
      type: "line",
      stacked: false,
      height: 350,

      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 10,
        blur: 11,
        color: "#D3CCDA",
        opacity: 1
      }
    },
    colors: ["#5D89FF"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 1,
        opacityTo: 0,
        colorStops: [
          {
            offset: 0,
            color: "#5D89FF",
            opacity: 0.1
          },
          {
            offset: 50,
            color: "#5D89FF",
            opacity: 0.05
          },

          {
            offset: 100,
            color: "#5D89FF",
            opacity: 0
          }
        ]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: "straight",
      lineCap: "butt",
      colors: undefined,
      width: 2,
      dashArray: 0
    },
    title: {
      text: undefined,
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238"
      }
    },
    grid: {
      show: true,
      borderColor: "rgba(103, 120, 177, 0.15)",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      row: {
        colors: undefined,
        opacity: 0.5
      },
      column: {
        colors: undefined,
        opacity: 0.5
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 17,
        left: 17
      }
    },
    markers: {
      size: 0,
      colors: "#fff",
      // colors: "#1B1831",
      strokeColors: "#fff",
      strokeWidth: 1,
      strokeOpacity: 0,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: 5
        // sizeOffset: 10
      }
    },
    yaxis: {
      show: true,
      showAlways: true,
      showForNullSeries: true,
      seriesName: undefined,
      opposite: true,
      reversed: false,
      logarithmic: false,
      logBase: 10,
      tickAmount: 5,
      // min: 66725,
      // max: 66750,
      forceNiceScale: true,
      floating: false,
      decimalsInFloat: undefined,

      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          color: "#8F9BBF",
          fontSize: "10px",
          fontFamily: poppins.style.fontFamily,
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-label"
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter(val: number) {
          return val;
        }
        // formatter(val: number) {
        //   return (val / 1000000).toFixed(0);
        // }
      },
      axisBorder: {
        show: false,
        color: "#EDEDED",
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "#EDEDED",
        width: 6,
        offsetX: 0,
        offsetY: 0
      },
      title: {
        text: undefined,
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "Open Sans",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-title"
        }
      },
      crosshairs: {
        show: false,
        position: "back",
        stroke: {
          color: "#b6b6b6",
          width: 1,
          dashArray: 0
        }
      },
      tooltip: {
        enabled: false,
        offsetX: 0
      }
    },
    xaxis: {
      type: "datetime",
      tooltip: {
        enabled: true,
        // formatter(val: number, opts: any) {
        //     return `${val}...`
        // },
        offsetY: 0,
        style: {
          fontSize: "16.435px",
          fontFamily: "Open Sans"
        }
      },
      axisBorder: {
        show: false,
        color: "#EDEDED",
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: false,
        borderType: "solid",
        color: "#EDEDED",
        width: 6,
        offsetX: 0,
        offsetY: 0
      },
      labels: {
        show: false,

        style: {
          fontSize: "16.261px",
          fontFamily: "Open Sans",
          fontWeight: 500,
          color: "#373D3F"
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0
        // formatter: (value: number) => value,
      }
    },

    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,

      custom: ({ series, seriesIndex, dataPointIndex }: any) => {
        return (
          `<div class="arrow_box">` +
          `<h6>$${(series[seriesIndex][dataPointIndex] / 1000000).toFixed(
            0
          )}</h6>` +
          // `<p>Highest revenue</p>` +
          `</div>`
        );
      },
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: poppins.style.fontFamily
      },
      onDatasetHover: {
        highlightDataSeries: false
      },
      x: {
        show: false,
        // format: 'dd MMM',
        formatter: undefined
      },
      y: {
        show: true,
        formatter(val: number) {
          return (val / 1000000).toFixed(0);
        },
        title: {
          formatter: () => ""
        }
      },
      z: {
        show: false,
        formatter: undefined,
        title: "Lorem ipsum dolor sit"
      },
      marker: {
        show: false
      },
      items: {
        display: "flex"
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0
      }
    }
  };
  return (
    <ChartWrapper
      options={options as any}
      series={data.series}
      type="area"
      height={height}
      className="chart"
      ref={chartRef}
    />
  );
};

export default React.memo(LineDynamicChart);
