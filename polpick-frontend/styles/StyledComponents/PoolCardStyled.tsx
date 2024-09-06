import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const PoolCardWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "cardBgColor"
})<{ cardBgColor?: boolean }>`
  background-image: ${({ cardBgColor }) =>
    cardBgColor ? `url(${assest.upPoolbg})` : `url(${assest.downPoolbg})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  padding: 20px 30px;
  /* height: 100%; */

  .MuiChip-root {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 32px 0 32px;
    background-color: ${({ cardBgColor }) =>
      cardBgColor ? `${primaryColors.greenFade}` : `${primaryColors.redFade}`};
    height: 40px;
    min-width: 130px;
    @media (min-width: 1921px) {
      height: 4vh;
      min-width: 8vw;
    }
    @media (max-width: 1399px) {
      min-width: 110px;
    }

    .MuiChip-label {
      padding-right: 0;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: ${primaryColors.textPrimaryColor};
      @media (min-width: 1921px) {
        font-size: 1vw;
      }
    }
  }

  .card-head {
    @media (min-width: 1921px) {
      margin-bottom: 2.5vh;
    }
    h3 {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: ${primaryColors.textPrimaryColor};
      margin-right: 20px;
      @media (min-width: 1921px) {
        font-size: 1.5vw;
      }
    }

    .cnt-pl {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: ${primaryColors.textPrimaryColor};
      margin-left: 10px;
      @media (min-width: 1921px) {
        font-size: 0.75vw;
      }
    }
  }

  .pool-list {
    overflow: auto;
    height: 155px;
    margin: 20px -30px 0;
    @media (min-width: 1921px) {
      height: 20vh;
    }
    @media (max-width: 1699px) {
      height: 105px;
    }

    li {
      margin-bottom: 16px;
      padding: 0 30px;
      transition: all 0.5s ease;
      transform: translate3d(0, 100px, 0);
      opacity: 0;
      transition-property: opacity, transform;
      transition-duration: 1s;
      /* transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); */
      &.animate {
        opacity: 1;
        transform: translateZ(0);
      }
    }

    .user-avt {
      margin-right: 16px;
    }

    .inr-rgt {
      width: calc(100% - 48px);

      .MuiTypography-caption {
        color: ${({ cardBgColor }) =>
          cardBgColor
            ? `${primaryColors.color34d16a}`
            : `${primaryColors.colorE85151}`};

        svg {
          margin-right: 7px;
          path {
            fill: ${({ cardBgColor }) =>
              cardBgColor
                ? `${primaryColors.color34d16a}`
                : `${primaryColors.colorE85151}`};
          }
        }
      }
    }
  }

  .pl-btn {
    position: relative;
    mix-blend-mode: normal;
    color: ${primaryColors?.textPrimaryColor};
    background: transparent;
    box-shadow: ${({ cardBgColor }) =>
      cardBgColor
        ? `0px 4px 20px rgba(71, 204, 105, 0.5),
      inset 3px 4px 16px rgba(103, 224, 139, 0.2)`
        : `
        0px 4px 20px rgba(247, 101, 81, 0.5), inset 3px 4px 16px rgba(241, 171, 171, 0.2)
      `};

    border-radius: 20px;
    padding: 13px 45px;
    transition: all 0.4s ease;
    @media (min-width: 1921px) {
      padding: 2vh 3vw;
    }
    &.Mui-disabled {
      border: 0;
      box-shadow: none;
      color: ${primaryColors.color2A334D};
      &::after,
      &::before {
        opacity: 0.2;
      }
      .MuiTypography-caption {
        color: ${primaryColors.color2A334D};
        text-shadow: none;
      }
    }
    &:hover {
      background: transparent;
      box-shadow: none;
      .MuiTypography-caption {
        color: ${primaryColors.textPrimaryColor};
      }

      svg {
        margin-right: 8px;
        @media (min-width: 1921px) {
          width: 2vw;
          height: 1.5vh;
        }
      }
    }
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: ${({ cardBgColor }) =>
        cardBgColor
          ? `radial-gradient(74.11% 99.91% at 5.89% 5.21%, #AADF81 0%, #2DC762 100%)`
          : `radial-gradient(78.74% 91.96% at 6.26% 8.04%, #FF774D 0%, #EF5454 100%)`};
      border-radius: 20px;
      z-index: -1;
    }
    &::before {
      content: "";
      position: absolute;
      top: 1.5px;
      right: 1.5px;
      bottom: -4.5px;
      left: 1.5px;
      mix-blend-mode: normal;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background-color: ${({ cardBgColor }) =>
        cardBgColor ? "#458C58" : "#CF4841"};
      border-radius: 20px;
      z-index: -2;
    }

    .MuiTypography-caption {
      position: relative;
      z-index: 1;
      font-weight: 800;
      font-size: 14px;

      letter-spacing: 0.02em;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: ${({ cardBgColor }) =>
        cardBgColor ? "0px 1px 5px #3ba94f" : "0px 1px 5px #B6413A"};
      @media (min-width: 1921px) {
        font-size: 1vw;
      }
    }

    svg {
      position: relative;
      z-index: 1;
      margin-right: 8px;
    }
  }

  .btn-overlay {
    position: relative;
    z-index: 9;
    box-shadow: ${({ cardBgColor }) =>
      cardBgColor
        ? `0px -17px 19px 12px rgba(40, 67, 80, 0.922)`
        : `0px -17px 19px 12px #3e2e47`};
    border-radius: 15px;
    button {
      height: 51px;
      /* svg {
        position: absolute;
        left: 36%;
        &.rckt_up_btn {
          left: 39%;
        }
        @media (min-width: 900px) and (max-width: 1599px) {
          left: 32%;

          &.rckt_up_btn {
            left: 35%;
          }
        }
      } */
    }
    .btnlottie {
      position: absolute;
      top: 50%;
      left: 44%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      pointer-events: none;
      &.up {
        left: 47%;
      }
      svg {
        margin: 0;
        position: relative;
      }
    }
  }
  .opacityShow {
    opacity: 0.1;
  }
`;
