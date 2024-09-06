/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const MobilePoolBlockWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "status"
})<{ status: "up" | "down" }>`
  /* border-radius: 16px;
  background: rgba(40, 44, 70, 0.6);
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: 77.72px;
    height: 113.25px;
    left: -70px;
    bottom: -40px;
    background: ${({ status }) =>
    status === "down"
      ? `${primaryColors?.colorE85151}`
      : status === "up"
      ? `${primaryColors?.color34d16a}`
      : ``};
    filter: blur(50px);
    transform: matrix(0.99, 0.11, 0.05, -1, 0, 0);
    z-index: -1;
  }
  &::before {
    content: "";
    position: absolute;
    width: 192.28px;
    height: 280.17px;
    right: -176px;
    bottom: -130px;
    background: ${({ status }) =>
    status === "down"
      ? `${primaryColors?.colorE85151}`
      : status === "up"
      ? `${primaryColors?.color34d16a}`
      : ``};
    opacity: 0.2;
    filter: blur(50px);
    transform: matrix(0.99, 0.11, 0.05, -1, 0, 0);

    z-index: -1;
  } */
  .boxInnerPls_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ status }) =>
      status === "up"
        ? `rgba(52, 209, 106, 0.2)`
        : status === "down"
        ? `rgba(232, 81, 81, 0.2)`
        : ``};
    padding: 6px 12px;
    border-radius: 8px;

    .total_ppl,
    .total_pplRt {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 13px;
      line-height: 1;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
      }
    }
  }
  .boxInnerPls_btm {
    /* padding: 18px 16px; */
    button {
      position: relative;
      mix-blend-mode: normal;
      color: ${primaryColors?.textPrimaryColor};
      background: transparent;
      box-shadow: ${({ status }) =>
        status === "up"
          ? `0px 4px 20px rgba(71, 204, 105, 0.5),
      inset 3px 4px 16px rgba(103, 224, 139, 0.2)`
          : status === "down"
          ? ` 0px 4px 20px rgba(247, 101, 81, 0.5), inset 3px 4px 16px rgba(241, 171, 171, 0.2)`
          : ""};

      border-radius: 20px;
      padding: 9px 45px;
      width: 100%;
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
        background: ${({ status }) =>
          status === "up"
            ? `radial-gradient(74.11% 99.91% at 5.89% 5.21%, #AADF81 0%, #2DC762 100%)`
            : status === "down"
            ? `radial-gradient(78.74% 91.96% at 6.26% 8.04%, #FF774D 0%, #EF5454 100%)`
            : ""};
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
        background-color: ${({ status }) =>
          status === "up" ? "#458C58" : status === "down" ? "#CF4841" : ""};
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
        text-shadow: ${({ status }) =>
          status === "up"
            ? "0px 1px 5px #3ba94f"
            : status === "down"
            ? "0px 1px 5px #B6413A"
            : ""};
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
    .investmentPlan {
      ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px 0;
        li {
          display: block;
          &:not(:last-child) {
            margin-bottom: 7px;
          }
          .invstmentListing {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            .invstmentListing_lft {
              width: calc(100% - 50px);
              padding-right: 10px;
              font-weight: 600;
              font-size: 13px;
              letter-spacing: -0.01em;
              color: ${primaryColors?.color8f9bbf};
            }
            .invstmentListing_Rtt {
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-weight: 600;
              font-size: 13px;
              letter-spacing: -0.01em;
              color: ${({ status }) =>
                status === "up"
                  ? `${primaryColors?.color34d16a}`
                  : status === "down"
                  ? `${primaryColors?.colorE85151}`
                  : ``};
              width: 50px;
              .iconsc {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 5px;
                max-width: 9px;
                svg {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                  path {
                    fill: ${({ status }) =>
                      status === "down"
                        ? `${primaryColors?.colorE85151}`
                        : status === "up"
                        ? `${primaryColors?.color34d16a}`
                        : ``};
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
