/* eslint-disable consistent-return */
import {
  Box,
  BoxProps,
  Grid,
  Theme,
  Typography,
  useMediaQuery
} from "@mui/material";
/* eslint-disable react/no-array-index-key */
import { getTopWinnersByRange } from "@/api/functions/game.api";
// import WeeklyWinnerHeader from "@/components/WeeklyWinnerHeader/WeeklyWinnerHeader";
import { rankWiseWinnerFrames } from "@/config/constants";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { addElipsisBetweenLength, getFlag } from "@/lib/functions/_helpers.lib";
import { TopWinnersByRange } from "@/reduxtoolkit/interfaces/interfaces";
import { WinnerBodyContent } from "@/styles/StyledComponents/WinnerBodyContent";
import { WinnerEachCardWrapper } from "@/styles/StyledComponents/WinnerEachCardWrapper";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";

const WeeklyWinnerHeader = dynamic(
  () => import("@/components/WeeklyWinnerHeader/WeeklyWinnerHeader"),
  { ssr: false }
);

interface CardProps {
  crownIcon: string;
  frame: string;
  avatar: string;
  avatarName?: string;
  description: string;
  point: number;
  flagIcon: string;
  indexNumber: number;
}

export const WinnerEachCard: React.FC<CardProps & BoxProps> = ({
  crownIcon,
  avatar,
  description,
  point,
  flagIcon,
  indexNumber,
  avatarName,
  frame,
  ...others
}) => {
  const walletSelector = useAppSelector((s) => s.walletSlice);
  return (
    <WinnerEachCardWrapper indexNumber={indexNumber} {...others}>
      <Box className="avatarwrap">
        <Image
          src={assest?.winner_backdrop_image}
          alt="winner_backdrop_image"
          className="winner_backdrop_image"
          width={258}
          height={258}
        />

        <Image
          className="winner_frame"
          src={frame}
          alt="frame"
          width={363}
          height={402}
        />
        <i className="crown_icon">
          <Typography variant="caption">{indexNumber}</Typography>
          <Image src={crownIcon} alt="crown icon" width={45} height={40} />
        </i>
        {avatar ? (
          <figure className="avatar_block">
            <Image src={avatar} alt="avatr icon" width={100} height={100} />
            <i className="flag_icon">
              <Image src={flagIcon} alt="flag icon" width={25} height={25} />
            </i>
          </figure>
        ) : (
          <figure className="avatar_block avatar_block_solid ">
            <Typography>{avatarName}</Typography>
            <i className="flag_icon">
              <Image src={flagIcon} alt="flag icon" width={25} height={25} />
            </i>
          </figure>
        )}
        <Typography>{description}</Typography>
      </Box>
      <Typography variant="h3">
        {/* <i>
          <CryptoChainIcon />
        </i> */}
        $
        {(
          point * (walletSelector?.usd_price ? walletSelector.usd_price : 0)
        ).toFixed(4)}
      </Typography>
    </WinnerEachCardWrapper>
  );
};

const WeeklyWinnerComponent = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  // const startDate: number = moment().subtract(1, "week").unix();
  // const endDate: number = moment().unix();

  const { data: topWinnersData, isPending: isJackpotLoading } = useQuery({
    queryKey: ["top_winner_by_range", selectedDate], //, startDate,endDate
    enabled: Boolean(selectedDate),
    queryFn: () =>
      getTopWinnersByRange({
        week_date: selectedDate,
        top_only: true,
        sort: { order: "asc", field: "expected_prize" }
      })
  });

  const getDateRange = (e: dayjs.Dayjs) => {
    setSelectedDate(moment(e.clone().toISOString()).format("YYYY-MM-DD"));
  };
  // console.log("startDate", moment(startDate).format("DD/MM/YYYY"));
  // console.log("endDate", endDate);
  const getRankWisePlayer = (_data: TopWinnersByRange[], rank: number) => {
    if (!_data?.length) {
      <Grid item md={4} xs={12} />;
    }
    const fndObject = _data.find((s) => s.rank === rank);
    const frameProperties = rankWiseWinnerFrames.find((s) => s.rank === rank);

    if (fndObject && frameProperties) {
      return (
        <Grid item md={4} xs={12}>
          <WinnerEachCard
            frame={frameProperties?.frame}
            crownIcon={frameProperties?.crownIcon}
            avatar={fndObject.profile_image}
            description={
              fndObject?.walletId
                ? addElipsisBetweenLength(fndObject?.walletId, 8, 2)
                : ""
            }
            point={Number(fndObject?.expected_prize)}
            flagIcon={getFlag(fndObject?.country)}
            indexNumber={rank}
          />
        </Grid>
      );
    } else {
      return <Grid item md={4} xs={12} />;
    }
  };

  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box>
      <WeeklyWinnerHeader title="Weekly Winners" onDateChange={getDateRange} />
      <WinnerBodyContent>
        <Typography variant="h2" className="weeklysubtitle">
          Weekly Winners
        </Typography>
        {isJackpotLoading ? (
          <Grid container spacing={0}>
            Loading
          </Grid>
        ) : (
          <Grid container spacing={0}>
            {getRankWisePlayer(topWinnersData?.data || [], isMdScreen ? 1 : 2)}
            {getRankWisePlayer(topWinnersData?.data || [], isMdScreen ? 2 : 1)}
            {getRankWisePlayer(topWinnersData?.data || [], 3)}
          </Grid>
        )}
      </WinnerBodyContent>
    </Box>
  );
};

export default WeeklyWinnerComponent;
