/* eslint-disable @next/next/no-img-element */
import {
  CommonStepperBtnStack,
  StepperBodyCommonWrapper
} from "@/styles/StyledComponents/StepperSecWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import React from "react";

interface StepperProps {
  mainImage: string;
  title: string;
  current: number;
  handleNext: any;
  handlePrev: any;
  isNextBtnDisabled?: boolean;
}

const StepperBodyCommon: React.FC<StepperProps & BoxProps> = ({
  current,
  handleNext,
  mainImage,
  handlePrev,
  isNextBtnDisabled = false,
  ...props
}) => {
  return (
    <StepperBodyCommonWrapper current={current} {...props}>
      <Stack direction={current === 3 ? "row" : "column"} flexWrap="wrap">
        <Box className="image_Sec">
          <figure>
            <img src={mainImage} alt="stepper_image" />
          </figure>
        </Box>
        <Box className="content_sec">
          <Typography variant="h6">Step {current}</Typography>
          <Typography variant="h3">Join the Program</Typography>
          {props?.children}
        </Box>
      </Stack>
      <CommonStepperBtnStack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        step={current}
      >
        <CustomButtonPrimary
          variant="outlined"
          color="info"
          onClick={handlePrev}
          // onClick={() => {
          //   if (current > 1) {
          //     handlePrev(current - 1);
          //   }
          // }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={isNextBtnDisabled}
        >
          Next
        </CustomButtonPrimary>
      </CommonStepperBtnStack>
    </StepperBodyCommonWrapper>
  );
};

export default StepperBodyCommon;
