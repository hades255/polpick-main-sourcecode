/* eslint-disable react/no-array-index-key */

import { getJackpot, iJackpotList } from "@/api/functions/game.api";
import CommonHeader from "@/components/CommonHeader/CommonHeader";
import { CustomTabPanel } from "@/components/CommonTabs/CommonTabs";
import JackpotListTable from "@/components/JackpotListTable/JackpotListTable";
import JackpotTitle from "@/components/JackpotTitle/JackpotTitle";
import { a11yProps } from "@/components/RightUserSec/RightUserSec";
import WeeklyWinnerComponent from "@/components/WeeklyWinnerComponent/WeeklyWinnerComponent";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { queryClient } from "@/layout/WalletWrapper/WalletWrapper";
import { getTimerText } from "@/lib/functions/_helpers.lib";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import WeeklyStatusCrown from "@/ui/Icons/WeeklyStatusCrown";
import {
  Box,
  Skeleton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Countdown from "react-countdown";

export default function Index() {
  const walletSelector = useAppSelector((s) => s.walletSlice);

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof iJackpotList>(
    "total_tickets_count"
  );

  const { data: JackPotData, isPending: isJackpotLoading } = useQuery({
    queryKey: ["jackpotdata", walletSelector.wallet, order, orderBy],
    queryFn: () =>
      getJackpot({
        walletId: walletSelector.wallet || "",
        sort: {
          order,
          field: orderBy
        }
      })
  });

  const sortTable = (data: keyof iJackpotList) => {
    setOrder(orderBy === data && order === "asc" ? "desc" : "asc");
    setOrderBy(data);
  };

  // console.log(JackPotData?.data[0], "JackPotData");

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DashboardWrapper headerTitle="">
      <Box className="cmn_tab cmn_tab_page">
        <Box className="tab_hdr">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Weekly Jackpot" {...a11yProps(0)} />
            <Tab label="Weekly Winners" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <CommonHeader title="Weekly Jackpot" />
          <JackpotTitle gridSplitNumber={4}>
            <Box className="each_item_otr red_color">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="each_item"
              >
                <Typography variant="h3">Weekly Status</Typography>
                <Box className="rgt_block">
                  <i>
                    <WeeklyStatusCrown />
                  </i>
                  <Typography variant="h4">
                    {JackPotData?.user_data.rank}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box className="each_item_otr yellow_color">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="each_item"
              >
                <Typography variant="h3">Weekly Tickets</Typography>
                <Box className="rgt_block">
                  <Typography variant="h4">
                    {JackPotData?.user_data.weeklyTicketsCount}
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box className="each_item_otr green_color">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="each_item "
              >
                <Typography variant="h3">Jackpot Prizes</Typography>
                <Box className="rgt_block">
                  <Typography variant="h4">
                    {JackPotData?.user_data.totalJackpotPrize
                      ? `${JackPotData.user_data.totalJackpotPrize}`.split(
                          "."
                        )[0]
                      : 0}

                    <Typography variant="caption">
                      {JackPotData?.user_data.totalJackpotPrize
                        ? `${JackPotData.user_data.totalJackpotPrize.toFixed(
                            5
                          )}`.split(".")[1]
                        : 0}
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Box className="each_item_otr blue_color">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className="each_item"
              >
                <Typography variant="h3">End Time</Typography>
                {JackPotData && JackPotData.user_data.endTime ? (
                  <Countdown
                    // date={Date.now() + 10000}
                    date={JackPotData.user_data.endTime * 1000}
                    onComplete={() => {
                      queryClient.invalidateQueries({
                        queryKey: ["winRatioData"]
                      });
                    }}
                    renderer={(props) => {
                      return (
                        <Box className="rgt_block">
                          <Typography variant="h4">
                            {getTimerText(props.days)}:
                            {getTimerText(props.hours)}:
                            {getTimerText(props.minutes)}
                          </Typography>
                        </Box>
                      );
                    }}
                  />
                ) : (
                  <Box className="rgt_block">
                    <Typography variant="h4">00:00:00</Typography>
                  </Box>
                )}
              </Stack>
            </Box>
          </JackpotTitle>

          {/* <HistoryTable /> */}
          {isJackpotLoading ? (
            <HistoryTableWrap>
              <Box className="history_table">
                <TableContainer>
                  <Table
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                  >
                    <TableBody>
                      {[1, 2, 3, 4].map(() => (
                        <TableRow hover>
                          <TableCell align="center" width="10%">
                            <Skeleton
                              variant="rectangular"
                              width={60}
                              height={60}
                              sx={{ marginLeft: "50px" }}
                            />
                          </TableCell>
                          <TableCell align="center" width="10%">
                            <Box className="user_img">
                              <i>
                                <Skeleton
                                  variant="circular"
                                  width={50}
                                  height={50}
                                />
                              </i>
                            </Box>
                          </TableCell>
                          <TableCell align="center" width="26%">
                            {" "}
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem", margin: "0 auto" }}
                              width={200}
                            />
                          </TableCell>
                          <TableCell align="center" width="26%">
                            {" "}
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem", margin: "0 auto" }}
                              width={50}
                            />
                          </TableCell>
                          <TableCell align="center" width="26%">
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem", margin: "0 auto" }}
                              width={100}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </HistoryTableWrap>
          ) : (
            <JackpotListTable
              jackpotListdata={JackPotData?.data || []}
              sortTable={sortTable}
            />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <WeeklyWinnerComponent />
        </CustomTabPanel>
      </Box>
    </DashboardWrapper>
  );
}
