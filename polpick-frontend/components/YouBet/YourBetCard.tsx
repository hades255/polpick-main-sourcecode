/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import sounds from "@/json/sounds";
import { getROI } from "@/lib/functions/_helpers.lib";
import { YourBetCardWrapper } from "@/styles/StyledComponents/YourBetCardWrapper";
import { Box, Button, Chip, List, ListItem, Typography } from "@mui/material";
import { Howl } from "howler";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface BetCardInterface {
  selectBetAmt: (amt: string) => void;
  icon: any;
}
const staticBetAmounts = [5, 10, 15, 25, 50, 100, 200];
const game30BetAmounts = [25, 40, 50, 60, 120, 250, 500];

const YourBetCard = ({ selectBetAmt, icon }: BetCardInterface) => {
  const router = useRouter();
  // const account = useAccount();
  const tradeSelector = useAppSelector((state) => state.tradeSlice);
  // const [userTradedUp,setUserTradedUp]=useState<boolean>(true)

  const [selectBetAmnt, setSelectBetAmnt] = useState<number>(
    router.query?.game === "30" ? 40 : 10
  );

  const [betAmtList, setBetAmtList] = useState<number[]>(game30BetAmounts);

  const { isMute } = useAppSelector((s) => s.soundSlice);

  const clickSound = new Howl({
    src: [sounds.clickAmtAudio],
    mute: isMute
  });
  useEffect(() => {
    selectBetAmt(selectBetAmnt.toString());
  }, [selectBetAmnt]);

  useEffect(() => {
    if (router.query?.game === "30") {
      setSelectBetAmnt(40);
    } else {
      setSelectBetAmnt(10);
    }
  }, [router.query?.game]);
  // const getUserBetDetails = () => {
  //   if (
  //     account.address &&
  //     (tradeSelector?.down_array?.length || tradeSelector.up_array)
  //   ) {
  //     const _temp = [...tradeSelector.down_array, ...tradeSelector.up_array];
  //     const fndObject = _temp.filter((s) => s.walletId === account.address)[0];
  //     console.log("_temp", _temp);
  //     console.log("fndObject", fndObject);
  //     if(fndObject){
  //       !fndObject.upOrDown && setUserTradedUp(false)
  //     }

  //   }
  //   // let foundObject=_temp.filter(s=>s.)
  // };
  // useEffect(() => {
  //   getUserBetDetails();
  // }, [tradeSelector?.down_array?.length, tradeSelector?.up_array?.length]);

  useEffect(() => {
    if (Object.keys(router.query).length && router.query?.game === "30") {
      setBetAmtList(game30BetAmounts);
    } else {
      setBetAmtList(staticBetAmounts);
    }
  }, [router.query?.game]);

  return (
    <YourBetCardWrapper>
      <Box className="yourBetMainCard">
        <Chip icon={icon} />
        <Typography variant="h3">Your Bet</Typography>
        <Box className="wrapper_topNum">
          <List disablePadding>
            {betAmtList.map((amt) => (
              <ListItem disablePadding key={amt.toFixed()}>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectBetAmnt(amt);
                    clickSound.play();
                  }}
                  className={selectBetAmnt === amt ? "isActive" : ""}
                >
                  $ {amt}
                </Button>
              </ListItem>
            ))}
            {/* <ListItem disablePadding>
              <Button type="button">custom</Button>
            </ListItem> */}
          </List>
        </Box>
        <Box className="yourBetPrice">
          <Box className="singleBet">
            <Box className="betlistOne">
              <Typography variant="body1">Your Investment</Typography>
              <Typography variant="body1" className="greenText">
                {/* <BetIconGreen /> */}$ 0.0
              </Typography>
            </Box>
            <Box className="betlistOne">
              <Typography variant="body1">Your Investment</Typography>
              <Typography variant="body1" className="redText">
                {/* <BetIconGreen IconColor={primaryColors.colorE85151} /> */}$
                0.0
              </Typography>
            </Box>
          </Box>
          <Box className="singleBet">
            <Box className="betlistOne">
              <Typography variant="body1">Potential return</Typography>
              <Typography variant="body1" className="greenText">
                ${" "}
                {selectBetAmnt
                  ? (
                      selectBetAmnt +
                      getROI(
                        tradeSelector.up_total,
                        // 135,
                        selectBetAmnt,
                        // 120
                        tradeSelector.down_total
                      )
                    ).toFixed(1)
                  : "0.0"}
                {/* 0.0 */}
              </Typography>
            </Box>

            <Box className="betlistOne">
              <Typography variant="body1">Potential return</Typography>
              <Typography variant="body1" className="redText">
                {/* 0.0 */}${" "}
                {selectBetAmnt
                  ? (
                      selectBetAmnt +
                      getROI(
                        tradeSelector.down_total,
                        // 120,
                        selectBetAmnt,
                        // 135
                        tradeSelector.up_total
                      )
                    ).toFixed(1)
                  : "0.0"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </YourBetCardWrapper>
  );
};
export default React.memo(YourBetCard);
