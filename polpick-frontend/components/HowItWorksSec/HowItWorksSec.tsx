import assest from "@/json/assest";
import {
  HowItWorkCardWrapper,
  HowItWorksSecWrapper
} from "@/styles/StyledComponents/HowItWorksSecWrapper";
import { Box, BoxProps, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

export interface HowItWorkCardProps {
  cardIcon: string;
  cardIconClone: string;
  title: string;
  description: string;
  indexNumber?: number;
  themeColor: "blue" | "green" | "orange";
}

export const HowItWorkCard: React.FC<HowItWorkCardProps & BoxProps> = ({
  cardIcon,
  cardIconClone,
  title,
  description,
  indexNumber,
  themeColor,
  ...props
}) => {
  return (
    <HowItWorkCardWrapper themeColor={themeColor} {...props}>
      <Box className="number_block">{indexNumber}</Box>
      <Box className="card_icon_block">
        <i className="card_icon">
          <Image
            src={cardIcon}
            alt="win_ratio_icon1"
            width={205}
            height={190}
          />
        </i>
        <i className="card_icon_clone">
          <Image
            src={cardIconClone}
            alt="win_ratio_icon1"
            width={205}
            height={190}
          />
        </i>
      </Box>
      <Box className="content">
        <Typography variant="h3">{title}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </HowItWorkCardWrapper>
  );
};

const HowItWorkCardList: HowItWorkCardProps[] = [
  {
    cardIcon: assest?.howItWorkIcon1,
    cardIconClone: assest?.howItWorkIcon1,
    title: "Create links",
    description:
      "Fill your contact details and make sure you create different links",
    themeColor: "blue"
  },
  {
    cardIcon: assest?.howItWorkIcon2,
    cardIconClone: assest?.howItWorkIcon2,
    title: "Monitor statistics",
    description: "Monitor statistics on your links and build strategies",
    themeColor: "green"
  },
  {
    cardIcon: assest?.howItWorkIcon3,
    cardIconClone: assest?.howItWorkIcon3,
    title: "Get paid MATIC",
    description:
      "Get paid MATIC directly to you wallet every day 00:00 midnight",
    themeColor: "orange"
  }
];

const HowItWorksSec = () => {
  return (
    <HowItWorksSecWrapper className="cmn_gap">
      <CommonHeaderLanding
        mainTitle="How it works"
        subTitle="Affiliate program "
      />
      <Container fixed>
        <Box className="how_sec">
          <Grid
            container
            columnSpacing={{ lg: 8, md: 4, xs: 3 }}
            rowSpacing={{ lg: 0, md: 0, xs: 3 }}
          >
            {HowItWorkCardList?.map((data, index) => (
              <Grid item md={4} xs={12} key={data?.title}>
                <HowItWorkCard {...data} indexNumber={index + 1} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </HowItWorksSecWrapper>
  );
};

export default HowItWorksSec;
