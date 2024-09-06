/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const TimeBlockWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "progress"
})<{ progress: number; ismining: string }>`
  &.time_block {
    width: 100px;
    height: 100px;
    /* background: ${({ progress, ismining }) =>
      ismining === "true"
        ? progress <= 65 && progress >= 35
          ? `rgba(255, 116, 36, 0.15)`
          : progress > 65 && progress < 100
          ? `rgba(232, 81, 81, 0.15)`
          : progress === 100
          ? `linear-gradient(122.28deg, rgba(253, 222, 65, 0.207) 34.06%, rgba(236, 243, 255, 0.072) 73.19%)`
          : `rgba(172, 181, 217, 0.05)`
        : progress <= 65 && progress >= 35
        ? `rgba(255, 116, 36, 0.15)`
        : progress < 35 && progress > 0
        ? `rgba(232, 81, 81, 0.15)`
        : progress === 0
        ? `linear-gradient(122.28deg, rgba(253, 222, 65, 0.207) 34.06%, rgba(236, 243, 255, 0.072) 73.19%)`
        : `rgba(172, 181, 217, 0.05)`}; */

    backdrop-filter: blur(7.5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    position: relative;

    &.orrangleCls {
      background: rgba(255, 116, 36, 0.15);
    }
    &.distributioncolor {
      background: linear-gradient(
        122.28deg,
        rgba(253, 222, 65, 0.207) 34.06%,
        rgba(236, 243, 255, 0.072) 73.19%
      );
    }
    &.redClass {
      background: rgba(232, 81, 81, 0.15);
    }
    &.BlueClass {
      background: rgba(172, 181, 217, 0.051);
    }

    @media (min-width: 1921px) {
      width: 8vw;
      height: 8vw;
    }
    @media (max-width: 599px) {
      width: 88px;
      height: 88px;
    }
    @media (max-width: 379px) {
      width: 75px;
      height: 75px;
    }
    &.mbl {
      @media (max-width: 899px) {
        /* opacity: 0; */
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        pointer-events: none;
        top: 75px;
      }
      @media (max-width: 599px) {
        top: 45px;
      }
    }

    h3 {
      font-weight: 700;
      font-size: 30px;

      letter-spacing: -0.01em;

      /* background: ${({ progress, ismining }) =>
        ismining === "true"
          ? progress <= 35 && progress > 0
            ? `radial-gradient(95.83% 95.83% at 16.67% 4.17%, #769bff 0%, #326aff 100%);
          
          -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          `
            : progress > 35 && progress <= 65
            ? `radial-gradient(55.93% 63.89% at 0% 17.22%, #FF9C63 0%, #E9681F 100%);
          -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          `
            : `radial-gradient(75% 55.56% at 0% 22.22%, #FF8B8B 0%, #E94F4B 100%);
          -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          `
          : progress <= 100 && progress >= 65
          ? `radial-gradient(95.83% 95.83% at 16.67% 4.17%, #769bff 0%, #326aff 100%);
          
          -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          `
          : progress >= 35 && progress < 65
          ? `radial-gradient(55.93% 63.89% at 0% 17.22%, #FF9C63 0%, #E9681F 100%);
          -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          `
          : `radial-gradient(75% 55.56% at 0% 22.22%, #FF8B8B 0%, #E94F4B 100%);
          -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          `}; */
      &.orrangleCls {
        background: radial-gradient(
          55.93% 63.89% at 0% 17.22%,
          #ff9c63 0%,
          #e9681f 100%
        );
        &.distributioncolor {
          background: linear-gradient(
            122.28deg,
            rgba(253, 222, 65, 0.207) 34.06%,
            rgba(236, 243, 255, 0.072) 73.19%
          );
        }
        /* addednew */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
          -18px 18px 15px rgba(9, 9, 17, 0.04),
          -8px 8px 11px rgba(9, 9, 17, 0.06), -2px 2px 6px rgba(9, 9, 17, 0.07),
          0px 0px 0px rgba(9, 9, 17, 0.07);
      }
      &.redClass {
        background: radial-gradient(
          75% 55.56% at 0% 22.22%,
          #ff8b8b 0%,
          #e94f4b 100%
        );
        /* addednew */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
          -18px 18px 15px rgba(9, 9, 17, 0.04),
          -8px 8px 11px rgba(9, 9, 17, 0.06), -2px 2px 6px rgba(9, 9, 17, 0.07),
          0px 0px 0px rgba(9, 9, 17, 0.07);
      }
      &.BlueClass {
        background: radial-gradient(
          95.83% 95.83% at 16.67% 4.17%,
          #769bff 0%,
          #326aff 100%
        );
        /* addednew */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
          -18px 18px 15px rgba(9, 9, 17, 0.04),
          -8px 8px 11px rgba(9, 9, 17, 0.06), -2px 2px 6px rgba(9, 9, 17, 0.07),
          0px 0px 0px rgba(9, 9, 17, 0.07);
      }
      @media (min-width: 1921px) {
        font-size: 3vw;
      }
      @media (max-width: 599px) {
        font-size: 30px;
      }
    }
    p {
      font-weight: 500;
      font-size: 11px;
      letter-spacing: -0.01em;
      text-transform: uppercase;
      color: ${primaryColors?.color8f9bbf};
      @media (min-width: 1921px) {
        font-size: 0.75vw;
      }
      @media (max-width: 599px) {
        font-size: 9px;
      }
    }
    h4 {
      font-weight: 800;
      font-size: 10px;
      line-height: 1.2;
      text-align: center;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
        -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
        -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);

      @media (min-width: 1921px) {
        font-size: 1vw;
      }
    }
    .graph_score_progress {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
      height: 100% !important;
      z-index: 9;
      svg {
        circle {
          stroke-linecap: round;
        }
      }
    }
  }
`;
