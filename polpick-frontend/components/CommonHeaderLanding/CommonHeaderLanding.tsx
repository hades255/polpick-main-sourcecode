import { CommonHeaderLandingWrapper } from "@/styles/StyledComponents/CommonHeaderLandingWrapper";
import { Typography } from "@mui/material";

export interface CommonHeaderProps {
  subTitle?: string;
  mainTitle: string;
  mainTitle2?: string;
  mainHeaderTextFonTSize?: string;
  customLinheight?: number;
}

const CommonHeaderLanding = ({
  subTitle,
  mainTitle,
  mainTitle2,
  mainHeaderTextFonTSize,
  customLinheight
}: CommonHeaderProps) => {
  return (
    <CommonHeaderLandingWrapper
      mainHeaderTextFonTSize={mainHeaderTextFonTSize}
      customLinheight={customLinheight}
    >
      <Typography variant="h3">{subTitle}</Typography>
      <Typography variant="h2">{mainTitle}</Typography>
      <Typography variant="h2">{mainTitle2}</Typography>
    </CommonHeaderLandingWrapper>
  );
};

export default CommonHeaderLanding;
