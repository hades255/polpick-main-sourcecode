/* eslint-disable react/no-array-index-key */
import assest from "@/json/assest";
import {
  BenefitCardWrapper,
  BenefitSecWrapper
} from "@/styles/StyledComponents/BenefitSecWrapper";
import BenefitIcon1 from "@/ui/Icons/BenefitIcon1";
import BenefitIcon2 from "@/ui/Icons/BenefitIcon2";
import BenefitIcon3 from "@/ui/Icons/BenefitIcon3";
import BenefitIcon4 from "@/ui/Icons/BenefitIcon4";
import BenefitIcon5 from "@/ui/Icons/BenefitIcon5";
import {
  Box,
  BoxProps,
  Container,
  List,
  ListItem,
  Typography
} from "@mui/material";
import Image from "next/image";
import React from "react";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

interface BenefitProps {
  icon: React.ReactNode;
  description: string;
}

const BenefitCard: React.FC<BenefitProps & BoxProps> = ({
  icon,
  description,
  ...props
}) => {
  return (
    <BenefitCardWrapper {...props}>
      <i>{icon}</i>
      <Typography>{description}</Typography>
    </BenefitCardWrapper>
  );
};

const benefitList: BenefitProps[] = [
  {
    icon: <BenefitIcon1 />,
    description: "Best Win Ratio, 50%+"
  },
  {
    icon: <BenefitIcon2 />,
    description: "No deposit, you control funds!"
  },
  {
    icon: <BenefitIcon3 />,
    description: "Play peer to peer, not against the house!"
  },
  {
    icon: <BenefitIcon4 />,
    description: "Win & go! You get the winnings directly!"
  },
  {
    icon: <BenefitIcon5 />,
    description: "Smart contract that verified by best company - CERTIK!"
  }
];
const BenefitSec = () => {
  return (
    <BenefitSecWrapper className="cmn_gap">
      <CommonHeaderLanding mainTitle="Benefits" subTitle="5 key" />
      <Container fixed>
        <Box className="benefit_content">
          <Box className="benefit_list">
            <List disablePadding>
              {benefitList?.map((data, index) => (
                <ListItem disablePadding key={index}>
                  <BenefitCard {...data} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="benefit_fig">
            <figure>
              <Image
                src={assest?.benefit_image}
                alt="benefit_image"
                width={3600}
                height={2400}
              />
            </figure>
          </Box>
        </Box>
      </Container>
    </BenefitSecWrapper>
  );
};

export default BenefitSec;
