/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Stack, styled } from "@mui/material";

export const JackpotTitleWrapper = styled(Stack, {
  shouldForwardProp: (data) => data !== "gridSplitNumber"
})<{ gridSplitNumber: number }>`
  margin: -12px -12px;
  padding-bottom: 35px;
  @media (max-width: 599px) {
    padding-bottom: 0px;
    margin: -10px -10px;
  }
  .each_item_otr {
    width: ${({ gridSplitNumber }) =>
      gridSplitNumber === 3
        ? `calc(100% / ${gridSplitNumber})`
        : gridSplitNumber === 4
        ? `calc((100% - 30%) / ${gridSplitNumber - 1})`
        : ``};
    padding: 12px 12px;
    @media (max-width: 899px) {
      width: ${({ gridSplitNumber }) =>
        gridSplitNumber === 3
          ? `calc(100% / ${gridSplitNumber - 1})`
          : gridSplitNumber === 4
          ? `calc(100% / ${gridSplitNumber - 1})`
          : ``};
    }
    @media (max-width: 599px) {
      padding: 10px 10px;
    }
    &:last-child {
      width: ${({ gridSplitNumber }) =>
        gridSplitNumber === 4 ? `30%` : `calc(100% / ${gridSplitNumber})`};
      @media (max-width: 899px) {
        width: 100%;
      }
      .each_item {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        h3 {
          /* max-width: 100%; */
          margin-bottom: 0;
        }
      }
    }

    .each_item {
      padding: 19px 24px;
      border: 1.5px solid rgba(103, 120, 177, 0.2);
      border-radius: 16px;
      min-height: 88px;
      @media (max-width: 599px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 15px 15px;
      }
      h3 {
        max-width: ${({ gridSplitNumber }) =>
          gridSplitNumber === 4 ? "75px" : "100%"};
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        @media (max-width: 599px) {
          font-size: 15px;
          max-width: 79px;
          margin-bottom: 10px;
        }
      }
      .rgt_block {
        display: flex;
        align-items: center;
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
        }
        h4 {
          font-weight: 700;
          font-size: 36px;
          line-height: 1;
          letter-spacing: -0.01em;
          display: flex;
          align-items: flex-end;
          span {
            font-size: 16px;
          }
          @media (max-width: 1699px) {
            font-size: 28px;
          }
          @media (max-width: 599px) {
            font-size: 26px;
          }
        }
      }
    }

    &.red_color {
      .each_item {
        background: linear-gradient(
          130.08deg,
          rgba(40, 44, 70, 0.3) 9.73%,
          rgba(109, 75, 24, 0.3) 95.02%
        );
      }
      .rgt_block {
        h4 {
          background: radial-gradient(
              95.83% 95.83% at 16.67% 4.17%,
              #b06db0 0%,
              #ff7424 100%
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 4px 20px rgba(255, 116, 36, 0.5);
        }
      }
    }
    &.yellow_color {
      .each_item {
        background: linear-gradient(
          149.06deg,
          rgba(72, 79, 123, 0.3) 18.74%,
          rgba(78, 72, 40, 0.3) 100%
        );
      }
      .rgt_block {
        h4 {
          color: ${primaryColors?.colorFFD912};
          text-shadow: 0px 4px 20px rgba(255, 217, 18, 0.5);
          span {
            color: ${primaryColors?.colorFFD912};
            text-shadow: 0px 4px 20px rgba(255, 217, 18, 0.5);
          }
        }
      }
    }
    &.green_color {
      .each_item {
        background: linear-gradient(
          149.06deg,
          rgba(72, 79, 123, 0.3) 18.74%,
          rgba(47, 94, 63, 0.3) 100%
        );
      }

      .rgt_block {
        h4 {
          color: ${primaryColors?.color34d16a};
          text-shadow: 0px 4px 20px rgba(52, 209, 106, 0.5);
          span {
            color: ${primaryColors?.color34d16a};
            text-shadow: 0px 4px 20px rgba(52, 209, 106, 0.5);
          }
        }
      }
    }
    &.blue_color {
      .each_item {
        background: linear-gradient(
          131.07deg,
          rgba(40, 44, 70, 0.3) -9.55%,
          rgba(55, 69, 130, 0.3) 81.31%
        );
      }
      .rgt_block {
        h4 {
          background: radial-gradient(
              108.83% 100% at 9.2% 0%,
              #61d4eb 0%,
              #326aff 100%
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);
          span {
            background: radial-gradient(
                108.83% 100% at 9.2% 0%,
                #61d4eb 0%,
                #326aff 100%
              )
              /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);
          }
        }
      }
    }
  }
`;
