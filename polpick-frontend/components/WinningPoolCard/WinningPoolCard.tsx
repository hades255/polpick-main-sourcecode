/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
import { WinningPoolCardWrapper } from "@/styles/StyledComponents/WinningPoolCardWrapper";
import { Box, BoxProps, Theme, Typography, useMediaQuery } from "@mui/material";
import * as CoinShower from "json/lottie/coinshower.json";
import Lottie from "lottie-react";
import React, { useRef } from "react";

interface PoolCardProps {
  mainTitle: string;
  result: "win" | "lose" | "draw" | "no_win";
  numberOfPlayers: number;
  poolAmount: number | string;
}

const WinningPoolCard: React.FC<PoolCardProps & BoxProps> = ({
  mainTitle,
  result,
  numberOfPlayers,
  poolAmount,
  ...props
}) => {
  const isMdScreen = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down("md");
  });

  const lottieRef = useRef(null);

  return (
    <WinningPoolCardWrapper result={result} {...props}>
      {/* <video className="bgvideo" loop autoPlay playsInline>
        <source src={assest.winning_coins} type="video/webm" />
      </video> */}
      {result === "win" && (
        <Lottie
          loop
          autoPlay
          animationData={CoinShower}
          ref={lottieRef}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice"
          }}
          height={250}
          width={250}
          className="bgvideo"
        />
      )}
      {/* {result === "win" && (
        <>
          <Image
            src={assest?.success_pool_coins_image}
            alt="success_pool_coins_image"
            width={300}
            height={176}
            className="success_pool_coins_image"
          />
          {isMdScreen ? null : (
            <Image
              src={assest?.success_pool_coins_image2}
              alt="success_pool_coins_image2"
              width={400}
              height={161}
              className="success_pool_coins_image2"
            />
          )}
        </>
      )} */}

      <Box className="upper_stack" sx={{ display: { md: "none", xs: "flex" } }}>
        <Typography variant="caption">$ {poolAmount}</Typography>
        {/* <CustomButtonPrimary
          variant="contained"
          color={
            result === "lose"
              ? "error"
              : result === "win"
              ? "success"
              : "primary"
          }
        >
          <i>
            <PoolCryptoIcon />
          </i>
          <Typography variant="caption">$ {poolAmount}.00</Typography>
        </CustomButtonPrimary> */}
      </Box>

      <Box className="inner_wrapper">
        <Box className="pool_card_content">
          <Typography variant="h5">{mainTitle}</Typography>
          <Typography variant="h4">{numberOfPlayers}</Typography>
          <Typography variant="h4">
            {result === "no_win"
              ? "Winners"
              : result === "lose"
              ? "Losers"
              : result === "win"
              ? "Winners"
              : result === "draw"
              ? "Draw"
              : ""}
          </Typography>
        </Box>
        <Box className="btn_stack" sx={{ display: { xs: "none", md: "flex" } }}>
          <Typography variant="caption">$ {poolAmount}</Typography>
          {/* <CustomButtonPrimary
            variant="contained"
            color={
              result === "lose"
                ? "error"
                : result === "win"
                ? "success"
                : "success"
            }
          >
            
            <Typography variant="caption">$ {poolAmount}</Typography>
          </CustomButtonPrimary> */}
        </Box>
      </Box>
    </WinningPoolCardWrapper>
  );
};

export default WinningPoolCard;
