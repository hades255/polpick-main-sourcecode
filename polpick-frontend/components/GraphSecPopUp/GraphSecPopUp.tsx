import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { addElipsisBetweenLength } from "@/lib/functions/_helpers.lib";
import { gameSliceInterface } from "@/reduxtoolkit/interfaces/interfaces";
import { timerSliceInterface } from "@/reduxtoolkit/slices/timerSlice";
import { Avatar, Box, Typography } from "@mui/material";
import { memo } from "react";

interface PropType {
  gameSelector: gameSliceInterface;
  timer: timerSliceInterface;
}

const GraphSecPopUp = ({ gameSelector, timer }: PropType) => {
  const walletSelector = useAppSelector((s) => s.walletSlice);
  const topWinner = gameSelector?.winGameDetails?.users?.length
    ? gameSelector?.winGameDetails?.users?.reduce((maxUser, currentUser) => {
        return currentUser.totalReturn > maxUser.totalReturn
          ? currentUser
          : maxUser;
      })
    : undefined;

  const getDisplayMsg = () => {
    if (gameSelector?.winGameDetails && topWinner) {
      return (
        <Box className="winnerblock">
          <Typography variant="h2" className="glow_heading">
            Winner
          </Typography>
          <Box className="userblock">
            <Avatar
              sx={{ width: "25px", height: "25px" }}
              src={topWinner?.profile_image}
            />
            <Typography variant="h2">
              {topWinner?.username?.split("")[0]}
            </Typography>
            <Typography variant="body1">
              {" "}
              {addElipsisBetweenLength(topWinner.walletId)}
            </Typography>
          </Box>
          <Box className="amountblock">
            <Typography variant="h2" className="glow_heading">
              ${(topWinner.tradeAmount * walletSelector.usd_price).toFixed(5)}
            </Typography>
          </Box>
        </Box>
      );
    }
    if (timer.currentGameStatus?.phase === "MiningStart") {
      return (
        <Typography variant="h1" className="no_bet" key="1">
          No More Bets!{" "}
          <Typography variant="caption">Round in Progress</Typography>
        </Typography>
      );
    }

    if (
      timer.currentGameStatus?.phase === "TradeStart" &&
      gameSelector.bettingPhase
    ) {
      return (
        <Typography variant="h1" className="popup_animated" key="2">
          Up Or Down? <Typography variant="caption">Place your bets</Typography>
        </Typography>
      );
    } else {
      return timer?.currentGameStatus?.phase !== "distribution" &&
        timer?.currentGameStatus?.phase !== "MiningEnd" ? (
        <Typography
          variant="h1"
          className="no_bet animated_title"
          key="3"

          // sx={{ display: { xs: "none", md: "block" } }}
        >
          No More Bets
        </Typography>
      ) : (
        <Typography
          variant="h1"
          className="no_bet animated_title"
          // key="4"
          sx={{ opacity: `0 !important` }}
          // sx={{ display: { xs: "none", md: "block" } }}
        >
          Distribution
        </Typography>
      );
    }
  };

  return <>{getDisplayMsg()}</>;
};

export default memo(GraphSecPopUp);
