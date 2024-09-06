import { iJackPotStats } from "@/api/functions/game.api";
import useDashBoardJackPot from "@/hooks/react-query/useDashBoardJackPot";
import SocketEvents from "@/json/events/socketEvents";
import { Box, Theme } from "@mui/material";
import { useMediaQuery } from "@mui/system";
import { GameSocket } from "pages/_app";
import { memo, useCallback, useEffect, useState } from "react";
import JackPortHomeMain from "../JackPortHomeMain/JackPortHomeMain";
import JackPotMobileSec from "../JackPortHomeMain/JackPotMobileSec";

const JackpotBannerSec = () => {
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [jackpotSecHeight, setjackpotSecHeight] = useState(0);
  const jackpotHeightCallback = useCallback((data: number) => {
    setjackpotSecHeight(data);
  }, []);

  const { jackpotstats: jackpotAPIData } = useDashBoardJackPot();

  const [jackpotData, setJackPotData] = useState<iJackPotStats | undefined>(
    jackpotAPIData?.data?.data
  );

  useEffect(() => {
    if (jackpotAPIData?.data?.data) {
      setJackPotData(jackpotAPIData?.data?.data);
    }
  }, [jackpotAPIData]);

  useEffect(() => {
    const getJackpot = (e: iJackPotStats) => {
      setJackPotData(e);
    };
    if (GameSocket.connected) {
      GameSocket.on(SocketEvents.listen.JackpotSocket, getJackpot);
    }
    return () => {
      GameSocket.off(SocketEvents.listen.JackpotSocket, getJackpot);
    };
  }, [GameSocket.connected]);

  return (
    <Box>
      {isXsScreen ? (
        <JackPotMobileSec
          jackpotHeightCallback={jackpotHeightCallback}
          //   data={jackpotAPIData?.data?.data}
          data={jackpotData}
        />
      ) : (
        <JackPortHomeMain
          // data={jackpotAPIData?.data?.data}
          data={jackpotData}
        />
      )}
    </Box>
  );
};

export default memo(JackpotBannerSec);
