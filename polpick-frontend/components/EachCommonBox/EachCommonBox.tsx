import { EachCommonBoxWrapper } from "@/styles/StyledComponents/DashboardBodySecWrapper";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface CommonBoxProps {
  count: number;
  icon: string;
  isReverse?: boolean;
  title: string;
  cryptoIcon?: React.ReactNode;
}

const EachCommonBox: React.FC<CommonBoxProps & BoxProps> = ({
  count,
  icon,
  isReverse,
  title,
  cryptoIcon,
  ...props
}) => {
  return (
    <EachCommonBoxWrapper isReverse={isReverse} {...props}>
      <Stack direction="row" alignItems="center">
        <Box className="image_block">
          <figure>
            <Image src={icon} alt="icons" width={300} height={300} />
          </figure>
        </Box>
        <Box className="content">
          <Typography>{title}</Typography>
          <Typography variant="h3">${count}</Typography>
        </Box>
      </Stack>
    </EachCommonBoxWrapper>
  );
};

export default EachCommonBox;
