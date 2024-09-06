import { primaryColors } from "@/themes/_muiPalette";
import { Box, Stack, styled } from "@mui/material";

export const MetMaskWrapper = styled(Box)`
  max-width: 780px;
  .socialdivider {
    margin: 20px 50px 30px;
    border-color: #444c72;
  }
  .radiowrap {
    padding-top: 24px;

    .MuiRadioGroup-root {
      flex-wrap: nowrap;
      flex-direction: row;
      .MuiFormControlLabel-root {
        width: 170px;
        height: 90px;
        position: relative;
        align-items: center;
        justify-content: center;
        border: 1.5px solid rgba(103, 120, 177, 0.2);
        border-radius: 16px;
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
      .MuiTypography-root {
        position: relative;
        z-index: 2;
      }
      .MuiFormControlLabel-label {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p {
          margin-top: 12px;
        }
      }

      .MuiRadio-root {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 16px;

        svg {
          display: none;
        }
        &.Mui-checked {
          background: radial-gradient(
            95.83% 95.83% at 16.67% 4.17%,
            #769bff 0%,
            #326aff 100%
          );
        }
      }
    }
  }
  .link_form {
    p {
      font-weight: 600;
      font-size: 15px;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      span {
        color: ${primaryColors?.color4F80FF};
        display: inline-block;
        margin-left: 10px;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: -0.01em;
      }
    }
  }
  .modallogo {
    margin-top: -130px;
    display: inline-flex;
    width: 100%;
    justify-content: center;
    padding-bottom: 33px;
    position: relative;
    z-index: 2;
    .blurlogo {
      position: absolute;
      width: 299px;
      height: 188px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 1;
      filter: blur(25px);
      @media (max-width: 599px) {
        width: 240px;
        height: 151px;
      }
    }
    .mainlogo {
      width: 299px;
      height: 188px;
      position: relative;
      z-index: 2;
      @media (max-width: 599px) {
        width: 240px;
        height: 151px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .title_stack {
    text-align: center;
    h2 {
      font-weight: 800;
      font-size: 40px;
      line-height: 1;
      text-align: center;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      margin-bottom: 60px;
      @media (max-width: 899px) {
        font-size: 30px;
        margin-bottom: 20px;
      }
    }
  }
  .confirmBtn {
    width: 100%;
    margin-top: 40px;
  }
  .modallogo1 {
    margin-top: -250px;
    display: inline-flex;
    width: 100%;
    justify-content: center;
    padding-bottom: 33px;
    position: relative;
    z-index: 2;
    .blurlogo {
      position: absolute;
      width: 200px;
      height: 238px;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 1;
      filter: blur(50px);
      @media (max-width: 599px) {
        width: 154px;
        height: 184px;
      }
    }
    .mainlogo {
      width: 154px;
      height: 184px;
      position: relative;
      z-index: 2;
      @media (max-width: 599px) {
        width: 240px;
        height: 151px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .MuiFormControl-root {
    width: 100%;
    .MuiFormGroup-root {
      .MuiFormControlLabel-root {
        margin: 0;
        position: relative;

        background-clip: padding-box;
        border: solid 1.5px transparent;
        border-radius: 16px;
        width: 100%;
        .MuiFormControlLabel-label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 25px 25px;
          background: #354072;
          border: 1.5px solid rgba(103, 120, 177, 0.2);
          position: relative;
          z-index: 2;
          border-radius: 16px;
          width: 100%;
          @media (max-width: 899px) {
            padding: 25px 5px;
          }
        }
        .MuiRadio-root {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1;
          margin: -1.5px;
          border-radius: inherit;
          background: transparent;
          &.Mui-checked {
            background: radial-gradient(
              95.83% 95.83% at 16.67% 4.17%,
              #769bff 0%,
              #326aff 100%
            );
          }
          span {
            opacity: 0;
          }
        }
      }
    }
  }
  .footer_Sec {
    text-align: center;
    margin-top: 15px;
    .MuiFormControlLabel-root {
      margin-bottom: 18px;
      p {
        color: ${primaryColors?.textPrimaryColor};
        span {
          font-size: inherit;
          font-weight: inherit;
        }
      }
    }
    button {
      @media (max-width: 599px) {
        width: 100%;
      }
    }
  }
  &.for_auth {
    max-width: 460px;
    .title_stack {
      h2 {
        margin-bottom: 15px;

        @media (max-width: 599px) {
          font-size: 18px;
        }
      }
      p {
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.02em;
        color: ${primaryColors?.color8f9bbf};
        margin-bottom: 20px;
      }
    }
    .MuiFormControl-root {
      .MuiFormGroup-root {
        .MuiFormControlLabel-root {
          .MuiFormControlLabel-label {
            @media (max-width: 899px) {
              padding: 14px 5px;
            }
          }
        }
      }
    }
    .footer_Sec {
      margin-top: 15px;
      .MuiFormControlLabel-root {
        margin-top: 18px;
      }
      > p {
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.02em;
        color: ${primaryColors?.color8f9bbf};
        margin-bottom: 20px;
      }
      button {
        width: 100%;
      }
    }
  }
  .currency_modal_tab {
    .MuiTabs-flexContainer {
      flex-wrap: wrap;

      .MuiTab-root {
        width: 50%;
        font-weight: 600;
        font-size: 13px;
        line-height: 1.5;
        text-align: center;
        letter-spacing: -0.01em;
        color: ${primaryColors?.color8f9bbf};
        min-height: 66px;
        max-width: 50%;
        &.Mui-selected {
          color: ${primaryColors?.textPrimaryColor};
        }
      }
    }

    .MuiTabs-indicator {
      background: radial-gradient(
          95.83% 95.83% at 16.67% 4.17%,
          #769bff 0%,
          #326aff 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
      border-radius: 16px;
    }
  }
`;

export const MetaMaskEachComponentWrapper = styled(Box)`
  i {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 15px;
  }
  p {
    font-weight: 600;
    font-size: 14px;
    letter-spacing: -0.01em;
    @media (max-width: 899px) {
      font-size: 13px;
    }
  }
  &.for_auth_card {
    i {
      width: 20px;
      height: 20px;
    }
  }
`;

export const SwapStack = styled(Stack)`
  padding: 30px 30px;
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 20px;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
  .swap_left,
  .swap_rgt {
    width: 50%;
  }
  .swap_left,
  .swap_rgt {
    p {
      font-weight: 500;
      font-size: 14px;
      letter-spacing: -0.02em;
      color: ${primaryColors?.color8f9bbf};
      margin-bottom: 15px;
    }
  }
  .swap_rgt {
    p {
      text-align: right;
    }
  }
  .select_block {
    .MuiInputBase-root {
      width: 160px;

      .MuiSelect-select {
        padding: 0;
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 32px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        text-shadow: 0px 2px 5px rgba(236, 243, 255, 0.5);
        @media (max-width: 899px) {
          font-size: 20px;
        }
        i {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        &.Mui-disabled {
          -webkit-text-fill-color: ${primaryColors?.textPrimaryColor};
        }
      }
      .MuiIconButton-root {
        padding: 0;
        > * {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      fieldset {
        display: none;
      }
    }
  }
  .swap_rgt {
    .MuiFormControl-root {
      .MuiInputBase-root {
        &.Mui-disabled {
          color: ${primaryColors?.textPrimaryColor};
          input {
            -webkit-text-fill-color: ${primaryColors?.textPrimaryColor};
          }
        }
        input {
          height: 46px;
          text-align: right;
          border: 0;
          padding: 0;
          font-weight: 700;
          font-size: 36px;
          letter-spacing: -0.01em;
          color: ${primaryColors?.textPrimaryColor};
          text-shadow: 0px 2px 5px rgba(236, 243, 255, 0.5);
          &::placeholder {
            color: ${primaryColors?.textPrimaryColor};
            text-shadow: 0px 2px 5px rgba(236, 243, 255, 0.5);
            opacity: 1;
          }
          @media (max-width: 899px) {
            font-size: 20px;
          }
        }
        fieldset {
          display: none;
        }
      }
    }
  }
`;
