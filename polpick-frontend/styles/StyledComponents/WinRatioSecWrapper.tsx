/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const WinRatioSecWrapper = styled(Box)`
  /* padding-top: 0 !important; */
  padding: 130px 0;

  @media (max-width: 1199px) {
    margin-top: -50px;
  }
  @media (max-width: 899px) {
    margin-top: 120px;
  }
  @media (max-width: 599px) {
    margin-top: 250px;
  }
  .win_sec {
    margin-top: 240px;
    @media (max-width: 1199px) {
      margin-top: 130px;
    }
    @media (max-width: 899px) {
      margin-top: 50px;
    }
    @media (max-width: 599px) {
      margin-top: 30px;
    }
  }
  &.why_sec_sec {
    margin-top: -500px;
    @media (max-width: 1799px) {
      margin-top: -350px;
    }
    @media (max-width: 1699px) {
      margin-top: -150px;
    }
    @media (max-width: 1399px) {
      margin-top: -50px;
    }
    @media (max-width: 1199px) {
      margin-top: 50px;
    }
  }
`;

export const WinCardWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "themeColor"
})<{
  themeColor: "blue" | "green" | "orange";
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 20px;
  background: linear-gradient(
    130.08deg,
    rgba(40, 44, 70, 0.3) 9.73%,
    rgba(55, 69, 130, 0.3) 95.02%
  );
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 32px;
  position: relative;
  z-index: 2;
  @media (max-width: 599px) {
    padding: 20px 20px;
  }
  .win_card_inner_wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    border-radius: 32px;
    z-index: 3;
    &::after {
      content: "";
      position: absolute;
      width: 190.33px;
      height: 190.33px;
      right: -35%;
      bottom: 30px;
      background: ${({ themeColor }) =>
        themeColor === "blue"
          ? `${primaryColors?.color4e86ff}`
          : themeColor === "green"
          ? `${primaryColors?.color34d16a}`
          : themeColor === "orange"
          ? `${primaryColors?.colorff7424}`
          : ""};
      filter: blur(150px);
      z-index: 1;
    }
    &::before {
      content: "";
      position: absolute;
      width: 131.23px;
      height: 131.23px;
      left: -10px;
      top: 10px;
      background: ${({ themeColor }) =>
        themeColor === "blue"
          ? `${primaryColors?.color4e86ff}`
          : themeColor === "green"
          ? `${primaryColors?.color34d16a}`
          : themeColor === "orange"
          ? `${primaryColors?.colorff7424}`
          : ""};
      filter: blur(150px);
      z-index: 1;
    }
  }

  .card_icon_block {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: ${({ themeColor }) =>
      themeColor === "orange" ? "-185px" : "-185px"};
    margin-bottom: 30px;
    position: relative;
    z-index: 10;
    @media (max-width: 1199px) {
      margin-top: -130px;
    }
    @media (max-width: 899px) {
      margin-top: 0;
    }
    .card_icon,
    .card_icon_clone {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-width: ${({ themeColor }) =>
        themeColor === "blue"
          ? "160px"
          : themeColor === "green"
          ? "200px"
          : themeColor === "orange"
          ? "135px"
          : ""};
      height: 200px;
      @media (max-width: 1199px) {
        height: 150px;
      }
      @media (max-width: 599px) {
        height: 100px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .card_icon_clone {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(10px, -10px);
      z-index: -1;
      img {
        opacity: 0.5;
        filter: blur(25px);
        transform: rotate(0.02deg);
      }
    }
  }
  .content {
    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 1.5;
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      margin-bottom: 20px;
      @media (max-width: 599px) {
        margin-bottom: 10px;
        font-size: 14px;
      }
    }
    h3 {
      font-weight: 700;
      font-size: 50px;
      line-height: 1.2;
      letter-spacing: -0.01em;
      ${({ themeColor }) =>
        themeColor === "blue"
          ? `
      background: radial-gradient(
          174.04% 152.78% at 0% -44.53%,
          #61d4eb 0%,
          #326aff 100%
        );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);`
          : themeColor === "green"
          ? `

        color: ${primaryColors?.color34d16a};

        text-shadow: 0px 4px 20px rgba(52, 209, 106, 0.5);`
          : themeColor === "orange"
          ? `
        color: ${primaryColors?.colorff7424};

        text-shadow: 0px 4px 20px rgba(255, 116, 36, 0.5);`
          : `color:${primaryColors?.textPrimaryColor}`}

      @media (max-width:1199px) {
        font-size: 36px;
      }
      @media (max-width: 599px) {
        font-size: 26px;
      }
    }
  }
`;
