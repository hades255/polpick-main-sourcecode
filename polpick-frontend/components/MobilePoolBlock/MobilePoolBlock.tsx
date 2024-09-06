/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useUserBetDetails from "@/hooks/utils/useUserBetDetails";
import { getROI } from "@/lib/functions/_helpers.lib";
import { MobilePoolBlockWrapper } from "@/styles/StyledComponents/MobilePoolBlockWrapper";
import DownPoolIcon from "@/ui/Icons/DownPoolIcon";
import PeopleIcon from "@/ui/Icons/PeopleIcon";
import UpPoolIcon from "@/ui/Icons/UpPoolIcon";

import {
  Box,
  BoxProps,
  Button,
  List,
  ListItem,
  Typography
} from "@mui/material";
import { memo } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export interface InvestmentData {
  price?: string;
  totalPeople?: string;
  status: "up" | "down";
  makeTrade?: (type: "UP" | "DOWN") => void;
  betAmt: number;
}

const MobilePoolBlock: React.FC<InvestmentData & BoxProps> = ({
  price = "0",
  totalPeople = "0",
  status,
  makeTrade = () => {},
  betAmt = 0,
  ...props
}) => {
  const gameSelector = useAppSelector((s) => s.gameSlice);
  const tradeSelector = useAppSelector((state) => state.tradeSlice);
  const account = useAccount();
  const { userBet } = useUserBetDetails(account, tradeSelector);
  const timerSelector = useAppSelector((state) => state.timerSlice);

  const isMiningStage = () => {
    return (
      timerSelector?.currentGameStatus?.phase === "MiningStart" ||
      timerSelector?.currentGameStatus?.phase === "MiningEnd"
    );
  };
  return (
    <MobilePoolBlockWrapper status={status} {...props}>
      <Box className="boxInnerPls">
        <Box className="boxInnerPls_top">
          <Box className="total_ppl cmTop">$ {price}</Box>
          <Box className="total_pplRt cmTop">
            <i>
              {" "}
              <PeopleIcon />
            </i>
            {totalPeople}
          </Box>
        </Box>
        <Box className="boxInnerPls_btm">
          <Box className="investmentPlan">
            <List disablePadding>
              <ListItem disablePadding>
                <Box className="invstmentListing">
                  <Box className="invstmentListing_lft">Your Investment</Box>
                  <Box className="invstmentListing_Rtt">
                    $ {/* {investment} */}
                    {betAmt}
                  </Box>
                </Box>
              </ListItem>
              <ListItem disablePadding>
                <Box className="invstmentListing">
                  <Box className="invstmentListing_lft">Potential return</Box>
                  <Box className="invstmentListing_Rtt">
                    {/* <i className="iconsc">
                      {" "}
                      <BetIconGreen />
                    </i> */}
                    {/* {returnAmount} */}${" "}
                    {betAmt
                      ? (
                          betAmt +
                          getROI(
                            tradeSelector.up_total,
                            // 135,
                            betAmt,
                            // 120
                            tradeSelector.down_total
                          )
                        ).toFixed(1)
                      : "0.0"}
                  </Box>
                </Box>
              </ListItem>
            </List>
          </Box>
          <Button
            variant="contained"
            className="upDwnSpn"
            disabled={isMiningStage()}
            onClick={() => {
              if (!userBet) {
                makeTrade(status === "up" ? "UP" : "DOWN");
              } else {
                toast.info("You have already placed a bet");
              }

              // makeTrade(status === "up" ? "UP" : "DOWN")
            }}
          >
            {status === "up" ? (
              <>
                <i>
                  <UpPoolIcon />
                </i>
                <Typography variant="caption">Up</Typography>
              </>
            ) : (
              <>
                <i>
                  <DownPoolIcon />
                </i>
                <Typography variant="caption">Down</Typography>
              </>
            )}
          </Button>
        </Box>
      </Box>
    </MobilePoolBlockWrapper>
  );
};

export default memo(MobilePoolBlock);
