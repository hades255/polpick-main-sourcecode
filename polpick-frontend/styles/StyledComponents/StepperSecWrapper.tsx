/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, Stack, styled } from "@mui/material";

export const StepperSecWrapper = styled(Stack)`
  .mobileCmnHeader {
    display: none;
    @media (max-width: 899px) {
      display: block;
    }
    .mobileText_header {
      @media (max-width: 899px) {
        margin-bottom: 10px !important;
      }
    }
  }
`;

export const StepperNavWrapper = styled(Box)`
  padding: 50px 45px;
  width: 148px;
  min-height: 822px;

  background: linear-gradient(180deg, #2f4582 0%, #354072 100%);
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  @media (min-width: 1921px) {
    min-height: calc(100vh - 235px);
  }
  @media (max-width: 1399px) {
    padding: 30px 20px;
    width: 110px;
  }

  @media (max-width: 899px) {
    width: 100%;
    margin-bottom: 20px;
  }

  @media (max-width: 899px) {
    background: transparent;
    padding: 15px 0 10px;
    height: auto;
    min-height: auto;
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    @media (max-width: 899px) {
      flex-direction: row;
      padding: 0;
      height: auto;
      position: relative;
      flex-wrap: wrap;
    }
  }
  li {
    flex-direction: column;
    position: relative;
    @media (max-width: 899px) {
      z-index: 9;
      flex-direction: row;
      width: 33.33%;
      &:nth-child(1) {
        justify-content: flex-start;
        align-items: flex-start;
      }
      &:nth-child(2) {
        justify-content: center;
      }
      &:nth-child(3) {
        justify-content: flex-end;
        align-items: flex-end;
      }
    }
    &::after {
      content: "";
      width: 2px;
      height: 142px;
      background-color: rgba(143, 155, 191, 0.2);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -190px;

      @media (max-width: 899px) {
        bottom: 50%;
        transform: translate(-50%, 0);
        left: inherit;
        right: -82%;
        height: 2px;
        width: 100%;
        background-color: rgba(143, 155, 191, 0.2);
      }
      @media (max-width: 899px) {
        width: 80%;
        right: -64%;
      }
      @media (max-width: 479px) {
        width: 60%;
        right: -45%;
      }
    }
    &:nth-child(2) {
      &::after {
        @media (max-width: 899px) {
          right: -118%;
        }
        @media (max-width: 899px) {
          width: 80%;
          right: -95%;
        }
        @media (max-width: 479px) {
          width: 60%;
          right: -73%;
        }
      }
    }
    &:last-child {
      &::after {
        display: none;
      }
    }
    p {
      font-size: 13px;
      letter-spacing: -0.01em;

      @media (max-width: 899px) {
        display: none;
      }
    }
  }
`;

export const EachIcon = styled("span")`
  width: 56px;
  height: 56px;
  background: linear-gradient(
    131.07deg,
    rgba(40, 44, 70, 0.3) -9.55%,
    rgba(55, 69, 130, 0.3) 81.31%
  );
  color: ${primaryColors?.color8f9bbf};
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  margin-bottom: 10px;
  @media (max-width: 899px) {
    margin-bottom: 0;
  }
  &.stepper_item_active {
    box-shadow: inset 0px 3px 12px rgba(0, 0, 0, 0.15);
    &.stepper1 {
      color: ${primaryColors?.color4F80FF};
      svg {
        filter: drop-shadow(0px 4px 10px ${primaryColors?.color4F80FF});
      }
    }
    &.stepper2 {
      color: ${primaryColors?.color34d16a};
      svg {
        filter: drop-shadow(0px 4px 10px ${primaryColors?.color34d16a});
      }
    }
    &.stepper3 {
      color: ${primaryColors?.colorff7424};
      svg {
        filter: drop-shadow(0px 4px 10px ${primaryColors?.colorff7424});
      }
    }
  }
  &.stepper_item_completed {
    &.stepper1 {
      background: radial-gradient(
          95.83% 95.83% at 16.67% 4.17%,
          ${primaryColors?.color769bff} 0%,
          ${primaryColors?.color326aff} 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
    }
    &.stepper2 {
      background: linear-gradient(
        131.12deg,
        #4fee85 6.3%,
        rgba(81, 232, 123, 0.67) 89.45%
      );
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(2px);
    }
    &.stepper3 {
      background: linear-gradient(
        131.12deg,
        #ff7424 6.3%,
        rgba(255, 116, 36, 0.67) 89.45%
      );
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(2px);
    }
  }
`;

export const StepperBody = styled(Box)`
  width: calc(100% - 148px);
  padding-left: 45px;
  @media (max-width: 1399px) {
    padding-left: 20px;
    width: calc(100% - 110px);
  }
  @media (max-width: 899px) {
    width: 100%;
    padding-left: 0;
  }
  .desktopHeader {
    @media (max-width: 899px) {
      display: none;
    }
  }
`;

export const CommonStepperBtnStack = styled(Stack, {
  shouldForwardProp: (data) => data !== "step"
})<{ step: number }>`
  margin-top: 55px;
  @media (max-width: 899px) {
    margin-top: 20px;
  }
  .MuiButton-containedPrimary {
    width: 130px;
    height: 48px;
    padding: 10px;
    min-width: auto;
    border-radius: 16px;
    margin-left: auto;
    ${({ step }) =>
      step === 1
        ? `
       background: radial-gradient(
        95.83% 95.83% at 16.67% 4.17%,
        #769bff 0%,
        #326aff 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
      -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
      -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
    &:hover {
      background: radial-gradient(
        95.83% 95.83% at 16.67% 4.17%,
        #326aff 0%,
        #769bff 100%
      );
    }
    `
        : step === 2
        ? `

        background: linear-gradient(131.12deg, #4FEE85 6.3%, rgba(81, 232, 123, 0.67) 89.45%);
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
        &:hover {
          background: linear-gradient(131.12deg, rgba(81, 232, 123, 0.67) 6.3%, #4FEE85 89.45%);
        }
        `
        : step === 3
        ? `

      background: linear-gradient(131.12deg, #FF7424 6.3%, rgba(255, 116, 36, 0.67) 89.45%);
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(2px);
      &:hover {
        background: linear-gradient(131.12deg, rgba(255, 116, 36, 0.67) 6.3%, #FF7424 89.45%);
        }

        `
        : ``}
  }
  .MuiButton-outlinedInfo {
    display: ${({ step }) => (step > 1 ? "block" : "none")};
    width: 130px;
    height: 48px;
    padding: 10px;
    min-width: auto;
    background: rgba(40, 44, 70, 0.3);
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 16px;
    color: ${primaryColors?.white} !important;
    &:hover {
      background: ${primaryColors?.primary};
    }
  }
`;

export const StepperBodyCommonWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "current"
})<{ current: number }>`
  position: relative;
  .image_Sec {
    padding: ${({ current }) => (current === 3 ? "22px 40px" : "22px 50px")};
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      130.08deg,
      rgba(40, 44, 70, 0.3) 9.73%,
      rgba(55, 69, 130, 0.3) 95.02%
    );
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 32px;
    margin-bottom: ${({ current }) => (current === 3 ? "0" : "30px")};
    position: relative;
    overflow: hidden;
    width: ${({ current }) => (current === 3 ? "380px" : "100%")};
    /* min-height: ${({ current }) => (current === 3 ? "680px" : "100%")}; */
    @media (max-width: 1499px) {
      padding: ${({ current }) => (current === 3 ? "20px 20px" : "20px 24px")};
      width: ${({ current }) => (current === 3 ? "300px" : "100%")};
    }
    @media (max-width: 1399px) {
      width: ${({ current }) => (current === 3 ? "100%" : "100%")};
    }
    &::after {
      display: ${({ current }) => (current > 1 ? "block" : "none")};
      content: "";
      position: absolute;
      width: 248px;
      height: ${({ current }) =>
        current === 2 ? "248px" : current === 3 ? "425px" : ""};
      left: ${({ current }) =>
        current === 2 ? "50%" : current === 3 ? "auto" : ""};
      right: ${({ current }) =>
        current === 2 ? "auto" : current === 3 ? "-120px" : ""};
      top: 50%;
      transform: ${({ current }) =>
        current === 2
          ? "translate(-50%, -50%)"
          : current === 3
          ? "translateY(-50%)"
          : ""};
      border-radius: 100%;
      background: ${({ current }) =>
        current === 2
          ? `${primaryColors?.greenFadeTwo}`
          : current === 3
          ? `${primaryColors?.orangeFadeTwo}`
          : ""};
      filter: blur(150px);
      z-index: 2;
    }
    &::before {
      display: ${({ current }) => (current > 1 ? "block" : "none")};
      content: "";
      position: absolute;
      width: 171px;
      height: ${({ current }) =>
        current === 2 ? "171px" : current === 3 ? "293px" : ""};
      left: 0;
      top: 0;
      border-radius: 100%;
      background: ${({ current }) =>
        current === 2
          ? `${primaryColors?.color34d16a}`
          : current === 3
          ? `${primaryColors?.colorff7424}`
          : ""};
      filter: blur(150px);
      z-index: 2;
    }
    figure {
      position: relative;
      z-index: 3;
      height: 370px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .content_sec {
    width: ${({ current }) => (current === 3 ? "calc(100% - 380px)" : "100%")};
    padding-left: ${({ current }) => (current === 3 ? "40px" : "0px")};
    @media (max-width: 1499px) {
      width: ${({ current }) =>
        current === 3 ? "calc(100% - 300px)" : "100%"};
      padding-left: ${({ current }) => (current === 3 ? "20px" : "0px")};
    }

    @media (max-width: 1399px) {
      width: ${({ current }) => (current === 3 ? "100%" : "100%")};
      padding: ${({ current }) => (current === 3 ? "30px 0 0 0" : "0px")};
    }
    h6 {
      font-weight: 500;
      font-size: 10px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${primaryColors?.color8f9bbf};
      margin-bottom: 20px;

      @media (max-width: 899px) {
        text-align: center;
      }
    }
    h3 {
      margin-bottom: 25px;
      font-weight: 700;
      font-size: 36px;
      letter-spacing: -0.01em;
      ${({ current }) =>
        current === 1
          ? `

            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
            background: radial-gradient(108.83% 100% at 9.2% 0%, #61D4EB 0%, #326AFF 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);`
          : current === 2
          ? `color: ${primaryColors?.color34d16a};
             text-shadow: 0px 4px 20px ${primaryColors?.greenFadeTwo};`
          : current === 3
          ? `color: ${primaryColors?.colorff7424};
            text-shadow: 0px 4px 20px ${primaryColors?.orangeFadeTwo};`
          : ``}
      @media(max-width: 1499px) {
        font-size: 30px;
      }
      @media (max-width: 899px) {
        text-align: center;
      }
    }
    p {
      font-weight: 500;
      font-size: 18px;
    }
  }
`;
