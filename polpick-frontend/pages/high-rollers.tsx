/* eslint-disable react/no-array-index-key */

import CommonHeader from "@/components/CommonHeader/CommonHeader";
import JackpotTitle from "@/components/JackpotTitle/JackpotTitle";
import { Box, Stack, Typography } from "@mui/material";

import { getHighRollersList } from "@/api/functions/game.api";
import PlayerTable, {
  PlayerTableData
} from "@/components/PlayerTable/PlayerTable";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { queryClient } from "@/layout/WalletWrapper/WalletWrapper";
import { getTimerText } from "@/lib/functions/_helpers.lib";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Countdown from "react-countdown";

export default function Index() {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] =
    useState<keyof PlayerTableData>("totalTurnOver");
  const walletSelector = useAppSelector((state) => state.walletSlice);

  const {
    data: highRollerData,
    isPending: isHighRollerLoading

    // refetch: refetchTopWinners,
    // isLoading: isFetchingNews
  } = useQuery({
    enabled: Boolean(walletSelector.wallet),
    queryKey: ["highRoller", walletSelector.wallet, orderBy, order], //, startDate,endDate
    queryFn: () => {
      // console.log("THIS");

      return getHighRollersList({
        walletId: walletSelector.wallet,
        sort: {
          order, //default
          field: orderBy //default
        }
      });
    }
  });

  const sortTable = (data: keyof PlayerTableData) => {
    setOrder(orderBy === data && order === "asc" ? "desc" : "asc");
    setOrderBy(data);
  };

  // console.log(order, "order", orderBy, "orderBy");

  return (
    <DashboardWrapper>
      <CommonHeader title="High Rollers" />
      <JackpotTitle gridSplitNumber={3}>
        <Box className="each_item_otr red_color">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="each_item"
          >
            <Typography variant="h3">Your place</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                #{highRollerData?.user_data.rank}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box className="each_item_otr green_color">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="each_item"
          >
            <Typography variant="h3">Your Daily Turnover</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                {highRollerData?.user_data.totalTurnOver?.toFixed(2)}
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
            {highRollerData && highRollerData.user_data.endTime ? (
              <Countdown
                // date={Date.now() + 10000}
                date={highRollerData.user_data.endTime * 1000}
                onComplete={() => {
                  queryClient.invalidateQueries({ queryKey: ["highRoller"] });
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
            {/* <Box className="rgt_block">
              <Typography variant="h4">06:28:57</Typography>
            </Box> */}
          </Stack>
        </Box>
      </JackpotTitle>
      {isHighRollerLoading ? (
        <Box>Loading</Box>
      ) : (
        <PlayerTable
          list={highRollerData?.data || []}
          isLoading={isHighRollerLoading}
          sortTable={sortTable}
        />
      )}
    </DashboardWrapper>
  );
}
