import { primaryColors } from "@/themes/_muiPalette";
import { Box, BoxProps, Typography, styled } from "@mui/material";
import React from "react";

interface props {
  title: string;
}

const CommonHeaderWrap = styled(Box)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;

    letter-spacing: -0.01em;

    color: ${primaryColors.textPrimaryColor};
    margin-bottom: 0;
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    @media (max-width: 599px) {
      font-size: 30px;
    }
    @media (max-width: 374px) {
      font-size: 25px;
    }
  }
`;

const CommonHeader: React.FC<props & BoxProps> = ({ title, ...props }) => {
  return (
    <CommonHeaderWrap {...props}>
      <Typography variant="h1">{title}</Typography>
      {props?.children}
    </CommonHeaderWrap>
  );
};

export default CommonHeader;
