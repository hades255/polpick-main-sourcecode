import { iJackPotStats } from "@/api/functions/game.api";
import assest from "@/json/assest";
import { queryClient } from "@/layout/WalletWrapper/WalletWrapper";
import { getTimerText } from "@/lib/functions/_helpers.lib";
import { JackPotMobileSecWrapper } from "@/styles/StyledComponents/JackPotMobileSecWrapper";
import { Box, BoxProps, Container, Typography } from "@mui/material";
import * as JackPotLottie from "json/lottie/jackpot_mobile.json";
import Lottie from "lottie-react";
import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";

interface JackpotProps {
  jackpotHeightCallback?: any;
  data: iJackPotStats | undefined;
}

const JackPotMobileSec: React.FC<JackpotProps & BoxProps> = ({
  jackpotHeightCallback,
  data,
  ...props
}) => {
  const JackpotRef = useRef<HTMLDivElement>(null);
  const [secHeight, setsecHeight] = useState<number | undefined>(0);

  useEffect(() => {
    if (JackpotRef?.current) {
      setsecHeight(JackpotRef?.current?.clientHeight);
    }
    window.addEventListener("resize", () => {
      return setsecHeight(JackpotRef?.current?.clientHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        return setsecHeight(JackpotRef?.current?.clientHeight);
      });
    };
  }, [JackpotRef?.current]);

  useEffect(() => {
    if (secHeight) {
      if (jackpotHeightCallback !== undefined) {
        jackpotHeightCallback(secHeight);
      }
    }
  }, [secHeight]);

  const stringifiedJackpotAmt = data?.totalJackpotAmount.toFixed(2);

  return (
    <JackPotMobileSecWrapper
      //   sx={{ backgroundImage: `url(${assest?.jackpot_mobile_bg})` }}
      ref={JackpotRef}
      {...props}
    >
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
        <Image
          src={assest?.mobile_bg_jackpot}
          alt="bg_image"
          width={900}
          height={900}
        />
      </figure>

      <Box className="content">
        <Container fixed>
          <Typography variant="h6">Weekly</Typography>
          <Typography variant="h5">Jackpot</Typography>
          <Typography variant="h3">
            {stringifiedJackpotAmt ? stringifiedJackpotAmt.split(".")[0] : 0}.
            <Typography variant="caption">
              {" "}
              {stringifiedJackpotAmt ? stringifiedJackpotAmt.split(".")[1] : 0}
            </Typography>
          </Typography>
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
                  <Typography>
                    {" "}
                    {getTimerText(props.days)}d:
                    {getTimerText(props.hours)}h:
                    {getTimerText(props.minutes)}m
                  </Typography>
                );
              }}
            />
          ) : (
            <Typography>0d:0h:0m</Typography>
          )}
        </Container>
      </Box>
    </JackPotMobileSecWrapper>
  );
};

export default JackPotMobileSec;
