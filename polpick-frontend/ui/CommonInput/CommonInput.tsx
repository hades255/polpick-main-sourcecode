/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
import { primaryColors } from "@/themes/_muiPalette";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// eslint-disable-next-line import/order
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/system";

import { poppins } from "@/themes/_muiTheme";
import { Typography } from "@mui/material";
import React, { forwardRef } from "react";

const InputWrap = styled(TextField as any)`
  &.blue_txt {
    input {
      color: ${primaryColors?.color4F80FF} !important;
    }
  }
  &.MuiFormControl-root {
    .MuiInputBase-root {
      height: auto;
      padding: 9px 16px;
      box-shadow: none;
      min-width: auto;
      background: rgba(40, 44, 70, 0.3);
      border-radius: 16px;

      /* @media (max-width: 600px) {
        padding: 5px 10px;
      } */

      input[type="text"],
      input[type="email"],
      input[type="url"],
      input[type="password"],
      input[type="search"],
      input[type="number"],
      input[type="tel"],
      input[type="range"],
      input[type="date"],
      input[type="month"],
      input[type="week"],
      input[type="time"],
      input[type="datetime"],
      input[type="datetime-local"],
      input[type="color"],
      textarea {
        border: 0;
        padding-left: 0;
        font-family: ${poppins?.style?.fontFamily};
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        @media (max-width: 899px) {
          font-size: 16px;
        }
        &::placeholder {
          color: ${primaryColors?.textPrimaryColor};
          opacity: 0.3;
        }
        &:focus {
          border: 0;
          background: transparent;
        }
      }
      textarea {
        height: 125px !important;
        padding: 20px 10px 20px 51px;
        @media (max-width: 600px) {
          padding: 20px 10px 20px 30px;
        }
      }
      &.Mui-error {
        input[type="text"],
        input[type="email"],
        input[type="url"],
        input[type="password"],
        input[type="search"],
        input[type="number"],
        input[type="tel"],
        input[type="range"],
        input[type="date"],
        input[type="month"],
        input[type="week"],
        input[type="time"],
        input[type="datetime"],
        input[type="datetime-local"],
        input[type="color"],
        textarea {
          border-color: ${primaryColors?.errorMain};
        }
      }
      fieldset {
        border-color: rgba(103, 120, 177, 0.2);
        border-width: 1.5px;
      }
      &.Mui-focused {
        background: #282c46;
        fieldset {
          border-color: rgba(103, 120, 177, 0.5);
        }
      }
      &.Mui-error {
        fieldset {
          border-color: rgba(229, 57, 34, 0.4);
        }
      }
    }
  }
  &.joined_input {
    .MuiInputBase-root {
      padding: 0;
      .MuiInputBase-root {
        padding: 0;
        width: 122px;
        .MuiSelect-select {
          padding: 10px 20px;
          font-weight: 500;
          font-size: 14px;
          line-height: 2;
          letter-spacing: -0.01em;
          color: rgba(236, 243, 255, 0.3);
          @media (max-width: 1499px) {
            padding: 10px;
          }
          @media (max-width: 899px) {
            font-size: 16px;
          }
        }
      }
      input {
        padding-left: 16px !important;
      }
    }
  }
`;

type InputFieldCommonProps = StandardTextFieldProps & {
  isPassword?: boolean;
  adorMentIcon?: JSX.Element;
  errMsg?: string;
};

const InputFieldCommon = forwardRef<HTMLInputElement, InputFieldCommonProps>(
  ({ isPassword = false, adorMentIcon, errMsg, ...others }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };
    return (
      <>
        <InputWrap
          fullWidth
          variant="outlined"
          type={
            isPassword ? (showPassword ? "text" : "password") : others?.type
          }
          InputProps={{
            inputRef: ref,
            endAdornment: isPassword ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  disableRipple
                >
                  {showPassword ? (
                    <VisibilityIcon style={{ color: "#8F9BBF" }} />
                  ) : (
                    <VisibilityOffIcon style={{ color: "#8F9BBF" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null
          }}
          err
          {...others}
        />

        {others.error ? (
          <Typography variant="h6" sx={{ margin: "0 0" }}>
            {errMsg}
          </Typography>
        ) : null}
      </>
    );
  }
);

export default InputFieldCommon;
