/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import {
  EachIcon,
  StepperNavWrapper
} from "@/styles/StyledComponents/StepperSecWrapper";
import ChainIcon from "@/ui/Icons/ChainIcon";
import FileIcon from "@/ui/Icons/FileIcon";
import LogoutIcon from "@/ui/Icons/LogoutIcon";
import TickIcon from "@/ui/Icons/TickIcon";
import { BoxProps, List, ListItem, Typography } from "@mui/material";
import React from "react";

interface Navprops {
  current: number;
}

const StepperNav: React.FC<Navprops & BoxProps> = ({ current, ...props }) => {
  type IStepperListType = {
    icon: React.ReactNode;
  };
  const stepList: IStepperListType[] = [
    {
      icon: <LogoutIcon />
    },
    {
      icon: <FileIcon />
    },
    {
      icon: <ChainIcon />
    }
  ];
  return (
    <StepperNavWrapper {...props}>
      <List disablePadding>
        {stepList?.map((data, index: number) => (
          <ListItem disablePadding key={index}>
            <EachIcon
              className={`stepper${index + 1} ${
                current === index + 1
                  ? "stepper_item_active"
                  : index + 1 < current
                  ? "stepper_item_completed"
                  : ""
              }`}
            >
              {current > index + 1 ? <TickIcon /> : data?.icon}
            </EachIcon>
            <Typography>Step {index + 1}</Typography>
          </ListItem>
        ))}
      </List>
    </StepperNavWrapper>
  );
};

export default StepperNav;
