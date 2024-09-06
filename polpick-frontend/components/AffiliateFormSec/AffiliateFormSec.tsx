/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */

import { CustomIconProps } from "@/interface/icons.interface";
import {
  CommonFormSecWrapper,
  CustomFormControlLabel
} from "@/styles/StyledComponents/CommonFormSecWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomSelect from "@/ui/Filter/CustomSelect";
import DropDownSmallIcon from "@/ui/Icons/DropDownSmallIcon";
import FileIcon from "@/ui/Icons/FileIcon";
import RadioCheckedIcon from "@/ui/Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "@/ui/Icons/RadioUncheckedIcon";
import {
  Box,
  BoxProps,
  Checkbox,
  Grid,
  IconButton,
  MenuItem,
  Typography
} from "@mui/material";
import React from "react";
import PhoneInputCustom from "../PhoneInputCustom/PhoneInputCustom";

interface CommonFormProps extends CustomIconProps {
  isBtn?: boolean;
  noMargin?: boolean;
}

const AffiliateFormSec: React.FC<CommonFormProps & BoxProps> = ({
  isBtn,
  noMargin,
  ...props
}) => {
  return (
    <CommonFormSecWrapper noMargin={noMargin} {...props}>
      <Box className="form_sec" component="form">
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <InputFieldCommon placeholder="Enter name" />
          </Grid>
          <Grid item xs={12}>
            <InputFieldCommon placeholder="Enter email" />
          </Grid>
          <Grid item xs={12}>
            <PhoneInputCustom
              drpDownValue="123"
              inputValue="12312412"
              onDrpDownChange={() => {}}
              onInputValueChange={() => {}}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFieldCommon
              className="joined_input"
              placeholder="@username"
              InputProps={{
                startAdornment: (
                  <CustomSelect
                    initialValue="demo"
                    IconComponent={(props) => (
                      <IconButton {...props}>
                        <DropDownSmallIcon />
                      </IconButton>
                    )}
                  >
                    <MenuItem value="demo1">Demo1</MenuItem>
                    <MenuItem value="demo2">Demo2</MenuItem>
                    <MenuItem value="demo3">Demo3</MenuItem>
                  </CustomSelect>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFieldCommon
              placeholder="Enter Code"
              value="0x5435436456d3f7...8c"
              InputProps={{
                endAdornment: <FileIcon />
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormControlLabel
              IconColor={props?.IconColor}
              control={
                <Checkbox
                  defaultChecked
                  icon={<RadioUncheckedIcon IconColor={props?.IconColor} />}
                  checkedIcon={
                    <RadioCheckedIcon IconColor={props?.IconColor} />
                  }
                  disableRipple
                />
              }
              label={
                <Typography>
                  I accept the{" "}
                  <Typography variant="caption">terms & conditions</Typography>
                </Typography>
              }
            />
          </Grid>
          {isBtn && (
            <Grid item xs={12}>
              <CustomButtonPrimary variant="contained" color="primary">
                Become an affiliate
              </CustomButtonPrimary>
            </Grid>
          )}
        </Grid>
      </Box>
    </CommonFormSecWrapper>
  );
};

export default AffiliateFormSec;
