import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const FAQSecWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "noBlur"
})<{ noBlur?: boolean }>`
  position: relative;
  z-index: 1;
  padding: ${({ noBlur }) => (noBlur ? "0px" : "100px 0")};
  @media (max-width: 899px) {
    padding: ${({ noBlur }) => (noBlur ? "0px" : "50px 0 0 0")};
  }
  .faq_sub_heading {
    h2 {
      color: ${primaryColors?.textPrimaryColor};
      font-size: 40px;
    }
  }
  .faqHead {
    padding-bottom: 20px;
    h1 {
      color: ${primaryColors.textPrimaryColor};
      font-size: 36px;
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    }
  }
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    left: 50%;
    transform: translateX(-100%);
    top: 0;
    background: rgba(52, 209, 106, 0.2);
    filter: blur(150px);
    z-index: -1;
    display: ${({ noBlur }) => (noBlur ? "none" : "block")};
  }
  &::before {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    right: 50%;
    transform: translateX(100%);
    top: 0;
    background: rgba(220, 46, 44, 0.15);
    filter: blur(175px);
    z-index: -1;
    display: ${({ noBlur }) => (noBlur ? "none" : "block")};
  }
  .MuiTextField-root {
    min-width: 300px;
    margin-bottom: 30px;
    .MuiInputBase-root {
      &.MuiOutlinedInput-root {
        padding: 14px 20px;
        border: 0;
        border-radius: 16px;

        input {
          padding: 0 0 0 15px;
          border: 0;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: ${primaryColors?.textPrimaryColor};
          &::placeholder {
            color: ${primaryColors?.textPrimaryColor};
            opacity: 0.3;
          }
        }
        fieldset {
          border-color: rgba(103, 120, 177, 0.2);
          border-width: 1.5px;
        }
        &.Mui-focused {
          fieldset {
            border-color: ${primaryColors?.primary};
          }
        }
      }
    }
  }
  .btn_holder {
    margin-top: 40px;
    button {
      width: 180px;
      height: 60px;
      border: 1px;
      background: rgba(40, 44, 70, 0.15);
      border-radius: 16px;
      position: relative;
    }
  }
`;
