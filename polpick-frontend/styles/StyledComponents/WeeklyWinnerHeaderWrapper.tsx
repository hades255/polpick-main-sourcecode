import { primaryColors } from "@/themes/_muiPalette";
import { poppins } from "@/themes/_muiTheme";
import { Stack, styled } from "@mui/material";

export const WeeklyWinnerHeaderWrapper = styled(Stack)`
  margin-bottom: 55px;

  h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 1.5;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${primaryColors?.textPrimaryColor};
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    margin-right: 50px;
    @media (max-width: 899px) {
      width: 100%;
      text-align: left;
      margin: 0 0 20px 0;
    }
    @media (max-width: 599px) {
      font-size: 30px;
    }
  }
  p {
    display: inline-flex;
    align-items: center;
    margin-left: 35px;
    i {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      @media (max-width: 599px) {
        margin-right: 10px;
      }
    }
    a {
      font-weight: 600;
      font-size: 13px;
      line-height: 1.5;
      letter-spacing: -0.01em;
      color: ${primaryColors?.color4F80FF};
      &:hover {
        color: ${primaryColors?.primary1};
      }
    }
    @media (max-width: 599px) {
      margin-left: auto;
    }
  }
  .MuiFormControl-root {
    width: auto;
  }
  .MuiInputAdornment-outlined {
    .ant-picker {
      padding: 0px;
      .ant-picker-input {
        input {
          display: none;
        }
        span {
          margin-left: 0;
        }
      }
      .Mui-focusVisible {
        border: none;
      }
    }
  }
  .ant-picker {
    border: none !important;
    border-radius: 16px;
    background: transparent;
    padding: 12px 20px;
    &.ant-picker-focused {
      border: none;
    }
    .ant-picker-active-bar {
      display: none;
    }
    .ant-picker-suffix {
      margin-left: 80px;
      cursor: pointer;
      pointer-events: all;
      @media (max-width: 899px) {
        margin-left: 0;
      }
    }
    .ant-picker-range-separator {
      padding: 0 10px 0 3px;
      color: ${primaryColors?.textPrimaryColor};
      .ant-picker-separator {
        color: inherit;
      }
    }

    .ant-picker-input {
      input {
        font-family: ${poppins?.style?.fontFamily};
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        &::placeholder {
          color: ${primaryColors?.textPrimaryColor};
        }
      }
    }
    .ant-picker-clear {
      color: ${primaryColors?.textPrimaryColor};
    }
  }
`;
