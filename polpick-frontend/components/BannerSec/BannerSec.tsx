import { BannerSecWrapper } from "@/styles/StyledComponents/BannerSecWrapper";
import { Box, BoxProps, Container } from "@mui/material";
import Image from "next/image";
import React from "react";
import CommonHeaderLanding, {
  CommonHeaderProps
} from "../CommonHeaderLanding/CommonHeaderLanding";

export interface BannerProps extends CommonHeaderProps {
  bannerImage: string;
}

const BannerSec: React.FC<BannerProps & BoxProps> = ({
  bannerImage,
  ...props
}) => {
  return (
    <BannerSecWrapper {...props}>
      <Box className="banner_fig">
        <figure>
          <Image
            src={bannerImage}
            alt="banner_image"
            width={4000}
            height={2000}
          />
        </figure>
      </Box>
      <Box className="banner_txt">
        <Container fixed>
          <CommonHeaderLanding
            mainTitle={props?.mainTitle}
            subTitle={props?.subTitle}
            mainTitle2={props?.mainTitle2}
            mainHeaderTextFonTSize={props?.mainHeaderTextFonTSize}
          />
          {props?.children}
        </Container>
      </Box>
    </BannerSecWrapper>
  );
};

export default BannerSec;
