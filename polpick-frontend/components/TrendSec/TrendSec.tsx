/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { recentGameData } from "@/api/functions/game.api";
import SocketEvents from "@/json/events/socketEvents";
import { fetchGameActivity } from "@/lib/functions/sockets.lib";

import { recentGameSocketResponse } from "@/interface/socket.interfaces";
import { CustomTooltip } from "@/styles/StyledComponents/CustomToolTip";
import { TrendSecWrapper } from "@/styles/StyledComponents/TrendSecWrapper";
import LowerCircuitIcon from "@/ui/Icons/LowerCircuitIcon";
import UpperCircuitIcon from "@/ui/Icons/UpperCircuitIcon";
import {
  Box,
  List,
  ListItem,
  Skeleton,
  Stack,
  Theme,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useRouter } from "next/router";
import { GlobalSocket } from "pages/_app";
import { memo, useEffect, useState } from "react";
import ToolTipTable from "../ToolTipTable/ToolTipTable";

export interface ITrendList {
  circuit: "lower" | "upper";
  start: number | string;
  end: number | string;
  time: string;
  players: number | string;
}

const TrendSec = () => {
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const router = useRouter();
  const gameType: "15" | "30" = (router?.query?.game as "15" | "30") || "15";
  const [showableList, setShowableList] = useState<recentGameData[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [recentGameData, setRecentGameData] = useState<
    recentGameSocketResponse | undefined
  >();
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [livePlayersCount, setLivePlayersCount] = useState<number>(0);

  const recordLimit = isXsScreen ? 5 : 10;

  useEffect(() => {
    const getGameTrendHistory = (e: recentGameSocketResponse) => {
      setRecentGameData(e);
      setShowableList(e.gamesHistory);
    };
    if (GlobalSocket.connected) {
      GlobalSocket.on(SocketEvents.listen.GameActivity, getGameTrendHistory);
    }
    return () => {
      GlobalSocket.off(SocketEvents.listen.GameActivity, getGameTrendHistory);
    };
  }, [GlobalSocket.connected]);

  useEffect(() => {
    if (GlobalSocket.connected) {
      fetchGameActivity(gameType, pageNumber, recordLimit);
    }
  }, [pageNumber, GlobalSocket.connected]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  const prevPage = () => {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };
  const gotoFirstPage = () => {
    setPageNumber(1);
  };

  const gotoLastPage = () => {
    if (recentGameData?.gamesHistory?.length) {
      setPageNumber(recentGameData.totalGamesHistoryPages);
    }
  };

  useEffect(() => {
    // first
    const getLivePlayersCount = (e: { livePlayersCount: number }) => {
      setLivePlayersCount(e.livePlayersCount);
    };
    GlobalSocket.on(SocketEvents.listen.LivePlayers, getLivePlayersCount);
    return () => {
      // second
      GlobalSocket.off(SocketEvents.listen.LivePlayers, getLivePlayersCount);
    };
  }, []);

  return (
    <TrendSecWrapper>
      <Box className="trends_otr">
        <Box className="trends_inner">
          <Stack
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            className="trend_stack"
          >
            <Box className="each_block frst_block">
              <Typography variant="h6">All time</Typography>
              <Typography>
                {/* 468,006,240 */}
                {recentGameData?.allTimePlayersCount
                  ? recentGameData?.allTimePlayersCount > 999999
                    ? `999,999+`
                    : recentGameData?.allTimePlayersCount.toLocaleString()
                  : 0}
                {/* { (468006240).toLocaleString()} */}
              </Typography>
            </Box>
            <Box className="each_block scnd_block">
              <Typography variant="h6">Live Players</Typography>
              <Typography> {livePlayersCount || 0}</Typography>
            </Box>
            <CustomTooltip
              className="trend_popper"
              placement="top"
              arrow
              open={toolTipOpen}
              title={
                <ToolTipTable
                  data={showableList}
                  incrPage={nextPage}
                  decrPage={prevPage}
                  firstPage={gotoFirstPage}
                  lastPage={gotoLastPage}
                />
              }
            >
              <Box className="each_block list_block">
                <List disablePadding>
                  {showableList.length ? (
                    showableList?.map((data, index) => (
                      <ListItem
                        disablePadding
                        key={index}
                        onClick={() => setToolTipOpen(!toolTipOpen)}
                      >
                        {data?.result === "up" ? (
                          <UpperCircuitIcon />
                        ) : data?.result === "down" ? (
                          <LowerCircuitIcon />
                        ) : null}
                      </ListItem>
                    ))
                  ) : (
                    <List disablePadding>
                      {Array.from({ length: 10 }, (_, index) => index + 1).map(
                        (_, index) => (
                          <ListItem
                            disablePadding
                            key={index}
                            sx={{ marginRight: "10px" }}
                          >
                            <Skeleton
                              variant="circular"
                              animation="wave"
                              width={10}
                              height={10}
                            />
                          </ListItem>
                        )
                      )}
                    </List>
                  )}
                  {/* {trendList?.map((data, index) => (
                    <ListItem disablePadding key={index}>
                      {data?.circuit === "upper" ? (
                        <UpperCircuitIcon />
                      ) : data?.circuit === "lower" ? (
                        <LowerCircuitIcon />
                      ) : null}
                    </ListItem>
                  ))} */}
                </List>
              </Box>
            </CustomTooltip>
          </Stack>
        </Box>
      </Box>
    </TrendSecWrapper>
  );
};

export default memo(TrendSec);
