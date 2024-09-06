/* eslint-disable react/no-array-index-key */
import {
  WinCardWrapper,
  WinRatioSecWrapper
} from "@/styles/StyledComponents/WinRatioSecWrapper";
import { Box, BoxProps, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CommonHeaderLanding, {
  CommonHeaderProps
} from "../CommonHeaderLanding/CommonHeaderLanding";

export interface CustomCardProps {
  cardIcon: string;
  cardIconClone: string;
  title: string;
  count: string;
  themeColor: "blue" | "green" | "orange";
}

const WinCard: React.FC<CustomCardProps & BoxProps> = ({
  themeColor,
  ...props
}) => {
  return (
    <WinCardWrapper themeColor={themeColor} {...props}>
      <Box className="win_card_inner_wrapper" />
      <Box className="card_icon_block">
        <i className="card_icon">
          <Image
            src={props?.cardIcon}
            alt="win_ratio_icon1"
            width={205}
            height={190}
          />
        </i>
        <i className="card_icon_clone">
          <Image
            src={props?.cardIconClone}
            alt="win_ratio_icon1"
            width={205}
            height={190}
          />
        </i>
      </Box>
      <Box className="content">
        <Typography>{props?.title}</Typography>
        <Typography variant="h3">
          {props?.count}
          <Typography variant="caption">
            {props?.title.toLowerCase() === "win ratio" ? "%" : ""}
          </Typography>
        </Typography>
      </Box>
    </WinCardWrapper>
  );
};

interface WinRatioProps extends CommonHeaderProps {
  cardList: CustomCardProps[];
}

const WinRatioSec: React.FC<WinRatioProps & BoxProps> = ({
  cardList,
  ...props
}) => {
  return (
    <WinRatioSecWrapper className="cmn_gap" {...props}>
      <CommonHeaderLanding
        mainTitle={props?.mainTitle}
        subTitle={props?.subTitle}
      />
      <Container fixed>
        <Box className="win_sec">
          <Grid
            container
            columnSpacing={{ lg: 8, md: 4, xs: 3 }}
            rowSpacing={{ lg: 0, md: 0, xs: 3 }}
          >
            {cardList?.map((data, index) => (
              <Grid item md={4} xs={12} key={index + 1}>
                <WinCard {...data} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </WinRatioSecWrapper>
  );
};

export default WinRatioSec;
