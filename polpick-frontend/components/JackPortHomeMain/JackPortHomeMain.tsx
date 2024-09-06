/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @next/next/no-img-element */
import { iJackPotStats } from "@/api/functions/game.api";
import assest from "@/json/assest";
import { queryClient } from "@/layout/WalletWrapper/WalletWrapper";
import { getTimerText } from "@/lib/functions/_helpers.lib";
import { JackPortHomeMainWrapper } from "@/styles/StyledComponents/JackPortHomeMainWrapper";
import { Box, Typography } from "@mui/material";
import * as JackPotLottie from "json/lottie/jackpot_web.json";
import Lottie from "lottie-react";

import Countdown from "react-countdown";

interface JackPotHomeInterface {
  data: iJackPotStats | undefined;
}

export default function JackPortHomeMain({ data }: JackPotHomeInterface) {
  const stringifiedJackpotAmt = data?.totalJackpotAmount.toFixed(4);

  return (
    <JackPortHomeMainWrapper>
      <Box className="wrapper_listJackprt">
        {/* <video className="bgImg" loop autoPlay playsInline>
          <source src={assest.jackpotvideo} type="video/webm" />
        </video> */}
        <figure>
          <Lottie
            loop
            autoPlay
            className="jackpot_lottie"
            animationData={JackPotLottie}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice"
            }}
            height={50}
            width={50}
          />
          <img src={assest.jackpot_home_bg_img} alt="" className="bgImg" />
        </figure>

        <Box className="weeklytextwrap">
          <Typography variant="body1" className="weekly">
            Weely
          </Typography>
          <Typography variant="body1">Jackpot</Typography>
        </Box>
        <Box className="allTextWrap">
          <Box className="textFirst">
            <Typography variant="h4">
              {stringifiedJackpotAmt ? stringifiedJackpotAmt.split(".")[0] : 0}
              <Typography variant="caption">
                .
                {stringifiedJackpotAmt
                  ? stringifiedJackpotAmt.split(".")[1]
                  : 0}
              </Typography>
            </Typography>
          </Box>
          {data && data?.endTime ? (
            <Countdown
              date={data.endTime * 1000}
              onComplete={() => {
                queryClient.invalidateQueries({
                  queryKey: ["weeklyjackpotstats"]
                });
              }}
              renderer={(props) => {
                return (
                  <Box className="textScnd">
                    <Typography variant="h4">
                      {getTimerText(props.days)}d:
                      {getTimerText(props.hours)}h:
                      {getTimerText(props.minutes)}m
                    </Typography>
                  </Box>
                );
              }}
            />
          ) : (
            <Box className="textScnd">
              <Typography variant="h4">0d : 0h : 0m</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </JackPortHomeMainWrapper>
  );
}
