import { EachTierBlockWrapper } from "@/styles/StyledComponents/EachTierBlockWrapper";
import CommonCryptoIcon from "@/ui/Icons/CommonCryptoIcon";
import { Box, BoxProps, List, ListItem, Typography } from "@mui/material";
import React from "react";

export interface EachTierProps {
  currentNumber: number;
  totalNumber: number;
  themeColors: "green" | "red" | "yellow";
  indexNumber?: number;
}

const EachTierBlock: React.FC<EachTierProps & BoxProps> = ({
  currentNumber,
  totalNumber,
  themeColors,
  indexNumber,
  ...props
}) => {
  return (
    <EachTierBlockWrapper themeColors={themeColors} {...props}>
      <Typography variant="caption" className="tag_chip">
        {indexNumber}
      </Typography>
      <Typography variant="h4">Friends Tier</Typography>
      <List disablePadding className="tier_list">
        <ListItem disablePadding>
          <i>
            <CommonCryptoIcon />
          </i>
          <Box className="tier_list_content">
            <Typography variant="h3">{currentNumber}</Typography>
            <Typography>Today</Typography>
          </Box>
        </ListItem>
        <ListItem disablePadding>
          <i>
            <CommonCryptoIcon />
          </i>
          <Box className="tier_list_content">
            <Typography variant="h3">{totalNumber}</Typography>
            <Typography>Total (Paid)</Typography>
          </Box>
        </ListItem>
      </List>
    </EachTierBlockWrapper>
  );
};

export default EachTierBlock;
