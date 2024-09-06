import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const YourBetCardWrapper = styled(Box)`
  height: 100%;

  .yourBetMainCard {
    height: 100%;
    position: relative;
    background: rgba(40, 44, 70, 0.3);
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 32px;
    padding: 20px 7px 10px;
    @media (min-width: 1921px) {
      padding: 20px;
    }
    .MuiChip-root {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 0 32px 0 32px;
      background-color: transparent;
      border: 1px solid rgba(103, 120, 177, 0.2);
      border-width: 0 0 1px 1px;
      height: 40px;
      min-width: 60px;
      justify-content: center;
      span {
        display: none;
      }
      .MuiChip-icon {
        position: absolute;
        top: -15px;
        left: -10px;
        width: 70px;
        height: 70px;
      }
      @media (min-width: 1921px) {
        height: 4vh;
        min-width: 8vw;
      }
      @media (max-width: 1399px) {
        min-width: 110px;
      }
    }
    h3 {
      font-weight: 800;
      font-size: 22px;
      letter-spacing: -0.01em;
      color: ${primaryColors.textPrimaryColor};
      padding: 0 6px;
      margin-bottom: 15px;
      @media (min-width: 1921px) {
        font-size: 1.5vw;
        margin-bottom: 2.5vh;
      }
    }
    .wrapper_topNum {
      position: relative;
      padding: 0 4px 0px;
      height: 130px;
      overflow-y: auto;
      margin: 0 -7px 15px;
      scrollbar-width: none;
      -ms-overflow-style: none;

      /* &::-webkit-scrollbar {
        display: none;
      } */

      &:hover {
        scrollbar-width: thin;
        -ms-overflow-style: auto;

        &::-webkit-scrollbar {
          display: block;
          width: 3px;
        }
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 10px;
      }

      @media (min-width: 1921px) {
        height: 15vh;
      }
      @media (max-width: 1699px) {
        height: 80px;
      }

      ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          padding: 0 8px;
          margin-bottom: 8px;
          &:last-child {
            width: 100%;
          }
          button {
            background: rgba(40, 44, 70, 0.3);
            border: 1.5px solid rgba(103, 120, 177, 0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: -0.01em;
            color: ${primaryColors.textPrimaryColor};
            min-height: 28px;
            min-width: auto;
            &:hover,
            &.isActive {
              background: ${primaryColors.primary};
              border-color: "rgba(103, 120, 177, 0.2)";

              background: radial-gradient(
                95.83% 95.83% at 16.67% 4.17%,
                #769bff 0%,
                #326aff 100%
              );
              box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
                -18px 18px 15px rgba(9, 9, 17, 0.04),
                -8px 8px 11px rgba(9, 9, 17, 0.06),
                -2px 2px 6px rgba(9, 9, 17, 0.07),
                0px 0px 0px rgba(9, 9, 17, 0.07);
              /* border-radius: 16px; */
            }
            @media (min-width: 1921px) {
              font-size: 1vw;
            }
          }
        }
      }
    }
    .yourBetPrice {
      position: relative;
      .singleBet {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        /* margin: 0 -13px; */
        &:not(:last-child) {
          margin-bottom: 0px;
          /* margin-bottom: 10px; */
        }
        .betlistOne {
          width: 50%;
          padding: 0 12px;
          p {
            font-weight: 600;
            font-size: 10px;
            letter-spacing: -0.01em;
            color: ${primaryColors.color8f9bbf};
            svg {
              width: 10px;
            }
            @media (min-width: 1921px) {
              font-size: 0.75vw;
            }
          }
          .greenText {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 14px;
            /* font-size: 20px; */
            color: ${primaryColors.color34d16a};
            svg {
              align-items: center;
              display: flex;
              line-height: 0;
              margin-right: 6px;
            }
            @media (min-width: 1921px) {
              font-size: 1vw;
            }
          }
          .redText {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-size: 14px;
            /* font-size: 20px; */
            color: ${primaryColors.colorE85151};
            svg {
              align-items: center;
              display: flex;
              line-height: 0;
              margin-right: 6px;
            }
            @media (min-width: 1921px) {
              font-size: 1vw;
            }
          }
        }
      }
    }
  }
`;
