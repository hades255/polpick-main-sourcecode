import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const ComparisonSecWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    left: 50%;
    transform: translateX(-150%);
    top: 0;
    background: rgba(52, 209, 106, 0.2);
    filter: blur(150px);
    z-index: -1;
  }
  &::before {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    right: 50%;
    transform: translateX(150%);
    top: 0;
    background: rgba(220, 46, 44, 0.15);
    filter: blur(175px);
    z-index: -1;
  }
  .comparison_sec {
    max-width: 1330px;
    margin: 100px auto 0;
    @media (max-width: 1199px) {
      flex-wrap: nowrap;
      margin: 40px auto 0;
    }
  }
  .option_part {
    width: 330px;
    margin-top: 65px;
    @media (max-width: 899px) {
      width: 220px;
    }
    @media (max-width: 599px) {
      width: 150px;
      margin-top: 105px;
    }
    ul {
      li {
        width: 100%;
        font-weight: 500;
        font-size: 20px;
        text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
        &:not(:last-child) {
          margin-bottom: 65px;
          @media (max-width: 899px) {
            margin-bottom: 35px;
          }
        }
        @media (max-width: 899px) {
          font-size: 16px;
        }
        @media (max-width: 599px) {
          font-size: 12px;
        }
      }
    }
  }
  .list_part {
    width: calc(100% - 330px);
    margin: 0 -20px;
    @media (max-width: 1199px) {
      overflow-x: auto;
      padding: 30px 0 10px 0;
      > .MuiStack-root {
        min-width: 950px;
      }
    }
    @media (max-width: 899px) {
      width: calc(100% - 220px);
      > .MuiStack-root {
        min-width: 650px;
      }
    }
    @media (max-width: 599px) {
      width: calc(100% - 150px);
    }
    .each_list {
      width: calc(100% / 3);
      padding: 0 20px;
    }
  }
`;

export const EachOptionBlockWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "indexNumber"
})<{ indexNumber?: number }>`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px 25px;
  background: linear-gradient(
    130.08deg,
    rgba(40, 44, 70, 0.3) 9.73%,
    rgba(4, 14, 16, 0.3) 46.77%,
    rgba(55, 69, 130, 0.3) 95.02%
  );
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 32px;
  min-height: 100%;
  .check_list {
    margin-top: 50px;
    li {
      justify-content: center;
      width: auto;
      &:not(:last-child) {
        margin-bottom: 65px;
        @media (max-width: 899px) {
          margin-bottom: 35px;
        }
      }
      &.checked {
        svg {
          filter: drop-shadow(0px 4px 20px #34d16a);
        }
      }
      &.not_checked {
        svg {
          filter: drop-shadow(0px 4px 20px #f54b35);
        }
      }
    }
  }
  h4 {
    font-weight: 700;
    font-size: 20px;
    color: ${primaryColors?.textPrimaryColor};
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    margin-bottom: 10px;
    @media (max-width: 899px) {
      font-size: 16px;
    }
  }
  h3 {
    font-weight: 700;
    font-size: 70px;
    color: ${primaryColors?.textPrimaryColor};
    text-shadow: ${({ indexNumber }) =>
      indexNumber === 2
        ? "0px 4px 20px rgba(89, 134, 255, 0.5)"
        : "0px 4px 20px rgba(236, 243, 255, 0.5)"};
    margin-bottom: 10px;
    letter-spacing: -0.01em;
    ${({ indexNumber }) =>
      indexNumber === 2
        ? `background: radial-gradient(174.04% 152.78% at 0% -44.53%, #61D4EB 0%, #326AFF 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
text-fill-color: transparent;`
        : ""}
    @media (max-width: 899px) {
      font-size: 40px;
    }
  }
  p {
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(236, 243, 255, 0.5);
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    @media (max-width: 899px) {
      font-size: 12px;
    }
  }
  .option_label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -29px;
    display: ${({ indexNumber }) =>
      indexNumber === 2 ? "inline-flex" : "none"};
    background: linear-gradient(
      92.16deg,
      #44d8c8 -1.75%,
      #34d16a 30.24%,
      #e78721 77.1%,
      #e85151 110.27%
    );
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: ${primaryColors?.color040E10};
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    width: 195px;
    height: 29px;
    border-radius: 16px 16px 0 0;
    @media (max-width: 899px) {
      top: -26px;
      font-size: 13px;
      width: 115px;
      height: 25px;
    }
  }
  .btn_stack {
    margin-top: 65px;
    display: ${({ indexNumber }) => (indexNumber === 2 ? "flex" : "none")};
    @media (max-width: 899px) {
      margin-top: 30px;
    }
    button {
      @media (max-width: 899px) {
        font-size: 12px;
        padding: 15px 20px;
        min-width: 100%;
      }
    }
  }
`;
