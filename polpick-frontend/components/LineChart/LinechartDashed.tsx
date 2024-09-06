/* eslint-disable consistent-return */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */

import { monthsLibrary, weeksLibrary } from "@/config/constants";
import { AffiliateGraphData } from "@/reduxtoolkit/interfaces/interfaces";
import { ChartWrapper } from "@/styles/StyledComponents/ChartWrapper";
import { EachLegendItemWrap } from "@/styles/StyledComponents/DashboardChartSecWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import { poppins } from "@/themes/_muiTheme";
import CloseEye from "@/ui/Icons/CloseEye";
import OpenEye from "@/ui/Icons/OpenEye";
import { Box, List, ListItemBaseProps, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";

interface CustomProps extends ListItemBaseProps {
  color: string;
  text: string;
  handleToggleSeries: (data: string) => void;
}

const EachLegendItem = ({
  color,
  text,
  handleToggleSeries,
  ...others
}: CustomProps) => {
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const handleToggleTooltip = (_seriesName: string) => {
    handleToggleSeries(_seriesName.split(" ").join("_"));
    setTooltipVisible(!isTooltipVisible);
  };

  return (
    <EachLegendItemWrap onClick={() => handleToggleTooltip(text)} {...others}>
      <Typography variant="caption" sx={{ backgroundColor: color }} />
      <Typography>
        {text}
        <i
          style={{
            color: isTooltipVisible
              ? primaryColors?.white
              : primaryColors?.color8f9bbf
          }}
        >
          {isTooltipVisible ? <CloseEye /> : <OpenEye />}
        </i>
      </Typography>
    </EachLegendItemWrap>
  );
};

const legendItems = [
  {
    color: primaryColors?.color23DBBD,
    text: "Clicks"
  },
  {
    color: primaryColors?.colorFB49C0,
    text: "Earnings"
  },
  {
    color: primaryColors?.color4F80FF,
    text: "Connected wallets"
  },
  {
    color: primaryColors?.colorEF8233,
    text: "Bet Volume"
  }
];

interface ChartProps {
  categories: string[];
  height?: string;
  maxOverallValue?: number | string;
  dataset: any;
  graphType: string;
}
interface MetricData {
  name: string;
  data: number[];
}
const LineChartDashed = ({
  height = "100%",
  categories,
  dataset,
  graphType
}: ChartProps) => {
  function generateRandomArray(length: number, min: number, max: number) {
    return Array.from(
      { length },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  }

  const chartRef = useRef<any>(null);

  type ISeriesType = {
    Clicks: boolean;
    Earnings: boolean;
    Connected_wallets: boolean;
    Bet_Volume: boolean;
  };

  type IseriesData = {
    name: string;
    data: number[];
  };

  const [visibleSeries, setVisibleSeries] = useState<ISeriesType>({
    Clicks: true,
    Earnings: true,
    Connected_wallets: true,
    Bet_Volume: true
  });

  const seriesData = [
    {
      name: "Clicks",
      data: generateRandomArray(categories.length, 0, 500)
    },
    {
      name: "Earnings",
      data: generateRandomArray(categories.length, 0, 500)
    },
    {
      name: "Connected_wallets",
      data: generateRandomArray(categories.length, 0, 500)
    },
    {
      name: "Bet_Volume",
      data: generateRandomArray(categories.length, 0, 500)
    }
  ];

  const [mainSeries, setMainSeries] = useState<IseriesData[] | []>([]);
  const [baseSeriesData, setBaseSeriesData] = useState<IseriesData[] | []>([]);
  const [maxYAxis, setMaxYAxis] = useState<number>(0);
  const [maxMirYAxis, setMirMaxYAxis] = useState<number>(0);

  useEffect(() => {
    if (categories) {
      const tempSeriesList: IseriesData[] = baseSeriesData.map((series) => ({
        name: series?.name,
        data: visibleSeries[series.name as keyof ISeriesType] ? series.data : []
      }));
      setMainSeries(tempSeriesList);
    }
  }, [visibleSeries, categories]);

  const handleToggleSeries = useCallback((seriesName: string) => {
    setVisibleSeries((prevVisibleSeries: any) => ({
      ...prevVisibleSeries,
      [seriesName]: !prevVisibleSeries[seriesName]
    }));
  }, []);

  const [xAxisList, setXAxisList] = useState<string[] | []>([]);
  const [yAxisList, setYAxisList] = useState<MetricData[] | []>([]);

  const getXaxisList = (_data: AffiliateGraphData) => {
    const keyList = Object.keys(_data)?.map((nm) => nm);
    return keyList;
    // setXAxisList(keyList);
  };

  const getYAxisData = (_data: AffiliateGraphData) => {
    const keyList = Object.keys(_data);
    // console.log("keyList", keyList);

    const initialMetrics = {
      clicks: [] as number[],
      earnings: [] as number[],
      conn_wallet: [] as number[],
      bet_volume: [] as number[]
    };

    const metrics = keyList.reduce((acc, time) => {
      acc.clicks.push(_data[time].clicks);
      acc.earnings.push(_data[time].earnings);
      acc.conn_wallet.push(_data[time].conn_wallet);
      acc.bet_volume.push(_data[time].bet_volume);
      return acc;
    }, initialMetrics);

    return [
      { name: "Clicks", data: metrics.clicks },
      { name: "Earnings", data: metrics.earnings },
      { name: "Connected_wallets", data: metrics.conn_wallet },
      { name: "Bet_Volume", data: metrics.bet_volume }
    ];
  };

  useEffect(() => {
    // console.log("1dataset", dataset);

    if (Object.keys(dataset)?.length) {
      const keys = getXaxisList(dataset);
      const seriesData = getYAxisData(dataset);
      setXAxisList(keys);
      setYAxisList(seriesData);
      if (keys) {
        const tempSeriesList: IseriesData[] = seriesData.map((series) => ({
          name: series?.name,
          data: visibleSeries[series.name as keyof ISeriesType]
            ? series.data
            : []
        }));
        // console.log("tempSeriesList", tempSeriesList);
        const maxY = Math.max(
          ...tempSeriesList[
            tempSeriesList?.findIndex((s) => s.name === "Connected_wallets")
          ].data
        );
        const maxYMir = Math.max(
          ...tempSeriesList[
            tempSeriesList?.findIndex((s) => s.name === "Earnings")
          ].data
        );
        setMaxYAxis(Number(maxY.toFixed()));
        setMirMaxYAxis(Number(maxYMir.toFixed()));
        setMainSeries(tempSeriesList);
        setBaseSeriesData(tempSeriesList);
      }
    }
  }, [dataset]);

  const getToolTipHeading = (_index: number) => {
    if (graphType === "year") {
      return monthsLibrary[_index];
    }
    if (graphType === "week") {
      return weeksLibrary[_index];
    }

    if (graphType === "month") {
      return moment()
        .day(_index + 1)
        .format("dddd");
    }
    if (graphType === "day") {
      return `${_index + 1}:00`;
    }
    // <h6>07.05.2024</h6>
  };

  const chartData: ApexOptions = {
    series: mainSeries,
    chart: {
      height: 350,
      type: "line",
      id: "dashboard_chart",
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 10,
        left: 0,
        blur: 5,
        color: [
          primaryColors?.color23DBBD,
          primaryColors?.colorFB49C0,
          primaryColors?.color4F80FF,
          primaryColors?.colorEF8233
        ] as any,
        opacity: 0.8
      }
    },
    colors: [
      primaryColors?.color23DBBD,
      primaryColors?.colorFB49C0,
      primaryColors?.color4F80FF,
      primaryColors?.colorEF8233
    ],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 0,
        colorStops: [
          [
            {
              offset: 0,
              color: primaryColors?.color23DBBD,
              opacity: 0.2
            },
            {
              offset: 50,
              color: primaryColors?.color23DBBD,
              opacity: 1
            },

            {
              offset: 100,
              color: primaryColors?.color23DBBD,
              opacity: 0.2
            }
          ],
          [
            {
              offset: 0,
              color: primaryColors?.colorFB49C0,
              opacity: 0.2
            },
            {
              offset: 50,
              color: primaryColors?.colorFB49C0,
              opacity: 1
            },

            {
              offset: 100,
              color: primaryColors?.colorFB49C0,
              opacity: 0.2
            }
          ],
          [
            {
              offset: 0,
              color: primaryColors?.color4F80FF,
              opacity: 0.2
            },
            {
              offset: 50,
              color: primaryColors?.color4F80FF,
              opacity: 1
            },

            {
              offset: 100,
              color: primaryColors?.color4F80FF,
              opacity: 0.2
            }
          ],
          [
            {
              offset: 0,
              color: primaryColors?.colorEF8233,
              opacity: 0.2
            },
            {
              offset: 50,
              color: primaryColors?.colorEF8233,
              opacity: 1
            },

            {
              offset: 100,
              color: primaryColors?.colorEF8233,
              opacity: 0.2
            }
          ]
        ]
      }
    },
    legend: {
      show: false,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "top",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,

        onClick: undefined,
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 5,
        vertical: 0
      },
      onItemClick: {
        toggleDataSeries: true
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      curve: "monotoneCubic",
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
      size: [0, 0],
      colors: [
        "rgba(239, 129, 51, 0.5)",
        "rgba(251, 73, 192, 0.5)",
        "rgba(79, 129, 255, 0.5)",
        "rgba(35, 219, 188, 0.5)"
      ],
      strokeColors: [
        "rgba(239, 129, 51, 0.5)",
        "rgba(251, 73, 192, 0.5)",
        "rgba(79, 129, 255, 0.5)",
        "rgba(35, 219, 188, 0.5)"
      ],
      strokeWidth: 0,
      strokeOpacity: 0.9,
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
        size: 7,
        sizeOffset: 3
      }
    },
    xaxis: {
      categories: xAxisList,
      tooltip: {
        enabled: false,
        // formatter(val: number, opts: any) {
        //     return `${val}...`
        // },
        offsetY: 0,
        style: {
          fontSize: "14px",
          fontFamily: `${poppins.style.fontFamily}`
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
        // width: 6,
        offsetX: 0,
        offsetY: 0
      },
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: "#8F9BBF",
          fontSize: "10px",
          fontFamily: `${poppins.style.fontFamily}`,
          fontWeight: 600,
          cssClass: "apexcharts-xaxis-label"
        },
        offsetX: 0,
        offsetY: 0,
        format: undefined,
        formatter: undefined,
        datetimeUTC: true,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm"
        }
      },
      crosshairs: {
        show: true,
        width: 1.5,
        position: "back",
        opacity: 0.9,
        stroke: {
          color: "rgba(103, 120, 177, 0.497)",
          width: 0,
          dashArray: 0
        },
        fill: {
          type: "gradient",
          color: "#6778B1",
          gradient: {
            colorFrom: "#6778B1",
            colorTo: "#6778B1",
            stops: [0, 100],
            opacityFrom: 1,
            opacityTo: 0.1
          }
        },
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          blur: 1,
          opacity: 0.4
        }
      }
    },
    yaxis: [
      {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        seriesName: "Clicks",
        opposite: false,
        reversed: false,
        logarithmic: false,
        logBase: 10,
        tickAmount: 5,
        min: 0,
        max: maxYAxis, // 500,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: "#8F9BBF",
            fontSize: "10px",
            fontFamily: `${poppins.style.fontFamily}`,
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label"
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value: number, index) =>
            index === 0 ? `${value} users` : `${value}`
        },
        axisBorder: {
          show: false,
          color: "#EDEDED",
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: false,

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
      {
        show: false,
        seriesName: "Earnings"
      },
      {
        show: false,
        seriesName: "Connected_wallets"
      },
      {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        seriesName: "Bet_Volume",
        opposite: true,
        reversed: false,
        logarithmic: false,
        logBase: 10,
        tickAmount: 5,
        min: 0,
        max: maxMirYAxis,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: "#8F9BBF",
            fontSize: "10px",
            fontFamily: `${poppins.style.fontFamily}`,
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-label"
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: (value: number, index) =>
            index === 0 ? `$${value}` : `${value}`
        },
        axisBorder: {
          show: false,
          color: "#EDEDED",
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: false,

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
      }
    ],
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        // console.log(series, seriesIndex, dataPointIndex, w, "apex");
        // heading  <h6>07.05.2024</h6>
        return `
          <div class="custom_tooltip">
            <div class="custom_tooltip_title">
              <h6>${getToolTipHeading(dataPointIndex)}</h6>
            </div>
            <ul>
              ${series
                .map((s: number[], i: number) => {
                  if (s[dataPointIndex] !== undefined)
                    return `<li>
                  <span class="marker_span" style="background-color: ${
                    w?.globals?.colors[i]
                  };"></span>
                  <p>
                    <span class="title_span">${
                      w?.globals?.initialSeries[i]?.name
                    }</span>
                    <span class="value_span"> ${s[dataPointIndex]?.toFixed(
                      2
                    )}</span>
                  </p>
                </li>`;
                })
                .join("")}
            </ul>
          </div>`;
      },
      fillSeriesColor: false,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined
      },
      onDatasetHover: {
        highlightDataSeries: false
      },
      x: {
        show: false,
        formatter: undefined
      },
      y: {
        // show: false,
        formatter(value: number) {
          return `$${value}`;
        },
        title: {
          formatter: () => ""
        }
      },
      z: {
        // show: false,
        formatter: undefined,
        title: "Lorem ipsum dolor sit"
      },
      marker: {
        show: true
      },
      items: {
        display: "flex"
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 10,
        offsetY: 0
      }
    }
  };
  // console.log("chartData", chartData.series);

  return (
    <>
      <Box className="custom_legend">
        <List disablePadding>
          {legendItems?.map((data) => (
            <EachLegendItem
              disablePadding
              {...data}
              key={data?.text}
              handleToggleSeries={handleToggleSeries}
            />
          ))}
        </List>
      </Box>
      <ChartWrapper
        options={chartData}
        series={chartData?.series}
        type="line"
        height={height}
        id="trade_apexchart"
      />
    </>
  );
};

export default LineChartDashed;
