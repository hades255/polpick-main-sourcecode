/* eslint-disable react/no-array-index-key */

import { UserWinRatio, getWinRatioByID } from "@/api/functions/game.api";
import CommonHeader from "@/components/CommonHeader/CommonHeader";
import JackpotTitle from "@/components/JackpotTitle/JackpotTitle";
import WinTable from "@/components/WinTable/WinTable";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import Countdown from "react-countdown";

import { queryClient } from "@/layout/WalletWrapper/WalletWrapper";
import { getTimerText } from "@/lib/functions/_helpers.lib";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import {
  Box,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function WinRatio() {
  const walletSelector = useAppSelector((s) => s.walletSlice);

  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] =
    useState<keyof UserWinRatio>("totalTradesCount");

  const {
    data: winRatioData,
    // refetch: refetchTopWinners,
    isPending: isWinRatioPending
  } = useQuery({
    // enabled: Boolean(walletSelector.wallet),
    queryKey: [
      "winRatioData",
      walletSelector.wallet,
      order, //default
      orderBy
    ], //, startDate,endDate
    queryFn: () =>
      getWinRatioByID({
        walletId: walletSelector.wallet ? walletSelector.wallet : "",
        sort: {
          order, //default
          field: orderBy //default
        }
      })
  });

  const sortTable = (data: keyof UserWinRatio) => {
    setOrder(orderBy === data && order === "asc" ? "desc" : "asc");
    setOrderBy(data);
  };

  return (
    <Box>
      <CommonHeader title="Win Ratio" />
      <JackpotTitle gridSplitNumber={4}>
        <Box className="each_item_otr red_color">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="each_item"
          >
            <Typography variant="h3">Your place</Typography>
            <Box className="rgt_block">
              {winRatioData?.user_data?.rank ? (
                <Typography variant="h4">
                  #{winRatioData?.user_data.rank}
                </Typography>
              ) : (
                <Typography variant="h4">#0</Typography>
              )}
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
            <Typography variant="h3">Daily Trades</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                {winRatioData?.user_data.totalTradesCount}/50
              </Typography>

              {/* {winRatioData?.user_data.totalTradesCount ? (
                <Typography variant="h4">
                  {winRatioData?.user_data.totalTradesCount}/50
                </Typography>
              ) : (
                <Typography variant="h4">0/50</Typography>
              )} */}
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
            <Typography variant="h3">Your Win Ratio</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                {winRatioData?.user_data.winRatio}%
              </Typography>
              {/* {winRatioData?.user_data.winRatio ? (
                <Typography variant="h4">
                  {winRatioData?.user_data.winRatio}%
                </Typography>
              ) : (
                <Typography variant="h4">0%</Typography>
              )} */}
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
            {winRatioData && winRatioData.user_data.endTime ? (
              <Countdown
                // date={Date.now() + 10000}
                date={winRatioData.user_data.endTime * 1000}
                onComplete={() => {
                  queryClient.invalidateQueries({ queryKey: ["winRatioData"] });
                }}
                renderer={(props) => {
                  return (
                    <Box className="rgt_block">
                      <Typography variant="h4">
                        {getTimerText(props.hours)}:
                        {getTimerText(props.minutes)}:
                        {getTimerText(props.seconds)}
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
      {isWinRatioPending ? (
        <HistoryTableWrap>
          <Box className="history_table">
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
                className="playerTable"
              >
                <TableBody className="table_section">
                  {[1, 2, 3, 4].map(() => (
                    <TableRow>
                      <TableCell align="left">
                        <Stack
                          direction="row"
                          alignItems="center"
                          className="rankingnumber"
                          justifyContent="flex-end"
                        >
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", marginRight: "5px" }}
                            width={10}
                            height={20}
                          />

                          <i>
                            <Skeleton
                              variant="rectangular"
                              width={20}
                              height={20}
                            />
                          </i>
                        </Stack>
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          alignItems="center"
                          className="user_details_box"
                          justifyContent="center"
                        >
                          <Box className="userSection">
                            <Skeleton
                              variant="circular"
                              width={50}
                              height={50}
                            />
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", margin: "0 auto" }}
                          width={200}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", margin: "0 auto" }}
                          width={30}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", margin: "0 auto" }}
                          width={30}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography className="turnovertext">
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", margin: "0 auto" }}
                            width={30}
                          />
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ border: "0 !important" }}>
                        <Typography className="prizetext">
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", margin: "0 auto" }}
                            width={50}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { md: "none", xs: "table-cell" } }}
                      >
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "1rem", margin: "0 auto" }}
                          width={50}
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
        <WinTable
          winners={winRatioData?.data || []}
          isLoading={isWinRatioPending}
          sortTable={sortTable}
        />
      )}
    </Box>
  );
}
