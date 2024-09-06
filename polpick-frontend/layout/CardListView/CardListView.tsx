import SingleBadge from "@/components/SingleBadge/SingleBadge";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { addElipsisBetweenLength, getFlag } from "@/lib/functions/_helpers.lib";
import { IMakeTrade } from "@/reduxtoolkit/interfaces/interfaces";
import { ListItem, Stack, Typography } from "@mui/material";
import React from "react";

const CardListView = ({ data, index }: { data: IMakeTrade; index: number }) => {
  // const isLargeScreen = useMediaQuery((theme: Theme) =>
  //   theme.breakpoints.down("lg")
  // );
  const walletSelector = useAppSelector((s) => s.walletSlice);

  return (
    <ListItem key={index} disablePadding>
      <SingleBadge
        flagImage={getFlag(data?.countryCode)}
        userImage={data?.avatarUrl}
        className="user-avt"
      />
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-between"
        className="inr-rgt"
      >
        <Typography variant="body1">
          {data?.walletId ? addElipsisBetweenLength(data?.walletId) : "N/A"}
          {/* {data?.walletID} */}
        </Typography>
        <Typography variant="caption">
          {/* <MaticIcon IconHeight="10" IconWidth="12" /> */}
          {/* {data?.countMatic} */}${" "}
          {walletSelector.usd_price
            ? (data.tradeAmount * walletSelector.usd_price).toFixed(3)
            : data.tradeAmount}
        </Typography>
      </Stack>
    </ListItem>
  );
};

export default React.memo(CardListView);
