/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unstable-nested-components */

import {
  getAffiliateDayWiseGraphData,
  getAffiliateHalfYearlyGraphData,
  getAffiliateMonthlyGraphData,
  getAffiliateWeeklyGraphData,
  getAffiliateYearlyGraphData
} from "@/api/functions/game.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import {
  convertHourlyAffiliateData,
  convertMonthlyAffiliateData,
  convertWeeklyAffiliateData,
  convertYearlyAffiliateData,
  switchDataset
} from "@/lib/functions/_helpers.lib";
import { AffiliateGraphData } from "@/reduxtoolkit/interfaces/interfaces";
import { DashboardChartSecWrapper } from "@/styles/StyledComponents/DashboardChartSecWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import CalendarIcon from "@/ui/Icons/CalendarIcon";
import ExportIcon from "@/ui/Icons/ExportIcon";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Skeleton,
  Stack,
  useMediaQuery
} from "@mui/material";
import {
  DEFAULT_DESKTOP_MODE_MEDIA_QUERY,
  LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import * as _ from "lodash";
import moment from "moment";
import dynamic from "next/dynamic";
import { memo, useEffect, useState } from "react";

const LineChartDashed = dynamic(() => import("../LineChart/LinechartDashed"), {
  ssr: false
});

const formatData = [
  {
    name: "All",
    value: "All"
  },
  {
    name: "1d",
    value: "1d"
  },
  {
    name: "1w",
    value: "1w"
  },
  {
    name: "1mo",
    value: "1mo"
  },
  {
    name: "6mo",
    value: "6mo"
  },
  {
    name: "Today",
    value: "Today"
  }
];

export type filterType =
  | "all"
  | "1d"
  | "1w"
  | "1mo"
  | "6mo"
  // | "today"
  | "custom";

export type graphType = "month" | "week" | "year" | "day";
const DashboardChartSec = () => {
  const walletSelector = useAppSelector((s) => s.walletSlice);
  const [graphData, setGraphData] = useState<AffiliateGraphData | undefined>(
    undefined
  );
  const [graphType, setGraphType] = useState<graphType>("year");
  const [filterDataSet, setFilterDataSet] = useState<string[]>(
    switchDataset("all")
  );
  const { mutate: getYearlyAffiliateGraph, isPending: loadingYearlyGraph } =
    useMutation({
      mutationKey: ["getAffiliateYearlyGraphData"],
      mutationFn: getAffiliateYearlyGraphData,
      onSuccess: (res) => {
        // console.log("yearly graph", res);
        const yearlyData = convertYearlyAffiliateData(res.data);
        // console.log("yearlyData", yearlyData);
        setGraphData(yearlyData);
        setGraphType("year");
      }
    });

  const { mutate: getWeeklyAffiliateGraph, isPending: loadingWeeklyGraph } =
    useMutation({
      mutationKey: ["getAffiliateWeeklyGraphData"],
      mutationFn: getAffiliateWeeklyGraphData,
      onSuccess: (res) => {
        const weeklyData = convertWeeklyAffiliateData(res.data);
        setGraphData(weeklyData);
        setGraphType("week");
      }
    });

  const {
    mutate: getHalfYearlyAffiliateGraph,
    isPending: loadingHalfYearGraph
  } = useMutation({
    mutationKey: ["getAffiliateHalfYearlyGraphData"],
    mutationFn: getAffiliateHalfYearlyGraphData,
    onSuccess: (res) => {
      const yearlyData = convertYearlyAffiliateData(res.data);
      setGraphData(yearlyData);
      setGraphType("year");
    }
  });

  const { mutate: getMonthlygraphData, isPending: loadingMonthyGraph } =
    useMutation({
      mutationKey: ["getAffiliateMonthlyGraphData"],
      mutationFn: getAffiliateMonthlyGraphData,
      onSuccess: (res) => {
        const monthlyData = convertMonthlyAffiliateData(
          res.data,
          moment().month() + 1,
          moment().year()
        );

        setGraphData(monthlyData);
        setGraphType("month");
      }
    });

  const { mutate: getDayWiseGraphData, isPending: loadingDayWise } =
    useMutation({
      mutationKey: ["getAffiliateDayWiseGraphData"],
      mutationFn: getAffiliateDayWiseGraphData,
      onSuccess: (res) => {
        const dayWiseData = convertHourlyAffiliateData(res.data);
        setGraphData(dayWiseData);
        setGraphType("day");
      }
    });

  const handelFilterValue = (data: filterType) => {
    if (walletSelector?.wallet) {
      switch (data) {
        case "all":
          getYearlyAffiliateGraph({
            walletId: walletSelector?.wallet,
            year: Number(moment().format("YYYY"))
          });
          break;

        case "1w":
          getWeeklyAffiliateGraph({
            walletId: walletSelector?.wallet,
            date: moment().format("MM-DD-YYYY")
          });
          break;

        case "6mo":
          getHalfYearlyAffiliateGraph({
            walletId: walletSelector?.wallet,
            year: Number(moment().format("YYYY"))
          });
          break;
        case "1mo":
          getMonthlygraphData({
            walletId: walletSelector?.wallet,
            year: Number(moment().format("YYYY")),
            month: moment().month() + 1
          });
          break;
        case "1d":
          getDayWiseGraphData({
            walletId: walletSelector?.wallet,
            year: Number(moment().format("YYYY")),
            month: moment().month() + 1,
            date: moment().date()
          });
          break;

        default:
          break;
      }
    }
  };

  const [pickDate, setPickdate] = useState<Dayjs | null>(dayjs());

  const handelDateChange = (selectedDate: Dayjs | null) => {
    if (selectedDate && walletSelector?.wallet) {
      getDayWiseGraphData({
        date: Number(dayjs(selectedDate).format("DD")),
        month: Number(dayjs(selectedDate).format("MM")),
        year: Number(dayjs(selectedDate).format("YYYY")),
        walletId: walletSelector?.wallet
      });
      setFilterDataSet(switchDataset("custom"));
    }
  };
  const isDesktop = useMediaQuery(DEFAULT_DESKTOP_MODE_MEDIA_QUERY, {
    defaultMatches: true
  });

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleCustomClick = (e: MouseEvent) => {
      const excludedClicks = ["svg", "button", "path"];
      if (
        excludedClicks.includes(
          (e.target as HTMLElement).tagName.toLowerCase()
        ) ||
        !isDesktop
      ) {
        return;
      }
      inputRef?.blur();
      inputRef?.parentElement
        ?.getElementsByClassName("MuiInputAdornment-root")?.[0]
        ?.getElementsByTagName("button")?.[0]
        ?.click();
    };
    inputRef?.parentElement?.addEventListener("click", handleCustomClick);
    return () => {
      inputRef?.parentElement?.removeEventListener("click", handleCustomClick);
    };
  }, [inputRef, isDesktop]);

  useEffect(() => {
    if (walletSelector?.wallet) {
      getYearlyAffiliateGraph({
        walletId: walletSelector?.wallet,
        year: Number(moment().format("YYYY"))
      });
    }
  }, [walletSelector?.wallet]);

  // console.log(filterDataSet, "filterDataSet");
  return (
    <DashboardChartSecWrapper>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        className="chart_filter"
      >
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          className="chart_filter_left"
          sx={{ display: { md: "none", xs: "flex" } }}
        >
          <CustomSelect
            initialValue="All"
            className="date_select"
            MenuProps={{
              PaperProps: {
                className: "date_select"
              }
            }}
          >
            {formatData?.map((data) => (
              <MenuItem value={data?.value} key={data?.value}>
                {data?.name}
              </MenuItem>
            ))}
          </CustomSelect>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="graph_datepicker"
              label=""
              slots={{
                openPickerButton: (props) => (
                  <IconButton {...props}>
                    <CalendarIcon />
                  </IconButton>
                )
              }}
              slotProps={{
                mobilePaper: {
                  className: "custom_datepicker"
                },

                inputAdornment: {
                  position: "end"
                },
                textField: {
                  InputProps: !isDesktop
                    ? {
                        endAdornment: <CalendarIcon />
                      }
                    : undefined
                }
              }}
              value={pickDate}
              onChange={handelDateChange}
              inputRef={setInputRef}
            />
          </LocalizationProvider>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          className="chart_filter_left"
          sx={{ display: { md: "flex", xs: "none" } }}
        >
          <Button onClick={() => handelFilterValue("all")}>All</Button>
          <Button onClick={() => handelFilterValue("1d")}>1d</Button>
          <Button onClick={() => handelFilterValue("1w")}>1w</Button>
          <Button onClick={() => handelFilterValue("1mo")}>1mo</Button>
          <Button onClick={() => handelFilterValue("6mo")}>6 mo</Button>
          {/* <Button onClick={() => handelFilterValue("today")}>Today</Button> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="graph_datepicker"
              label=""
              slots={{
                openPickerButton: (props) => (
                  <IconButton {...props}>
                    <CalendarIcon />
                  </IconButton>
                )
              }}
              slotProps={{
                desktopPaper: {
                  className: "custom_datepicker"
                }
              }}
              value={pickDate}
              onChange={handelDateChange}
            />
          </LocalizationProvider>
        </Stack>
        <Button
          className="export_btn"
          startIcon={<ExportIcon />}
          sx={{ display: { md: "flex", xs: "none" } }}
        >
          Export Data
        </Button>
        <Button
          className="export_btn"
          startIcon={<ExportIcon />}
          sx={{
            display: { md: "none", xs: "flex" },
            minWidth: "auto !important",
            padding: "0px !important"
          }}
        />
      </Stack>
      {!_.isEmpty(graphData) ? (
        <LineChartDashed
          height="320px"
          categories={filterDataSet}
          dataset={graphData} //dummyAffilateGraphDataAll
          graphType={graphType}
        />
      ) : (
        <Box>
          <Skeleton
            variant="rectangular"
            height={320}
            width="100%"
            animation="wave"
          />
        </Box>
      )}
    </DashboardChartSecWrapper>
  );
};

export default memo(DashboardChartSec);
