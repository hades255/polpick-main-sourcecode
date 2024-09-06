import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const BetPointSecWrapper = styled(Box)`
  padding: 25px 0;
  position: relative;
  &::after {
    content: "";
    width: 50px;
    height: 100%;
    position: absolute;
    left: -10px;
    top: 0;
    background: linear-gradient(
      90deg,
      #212743 15.56%,
      rgba(40, 47, 81, 0) 100%
    );
    z-index: 9;
  }
  &::before {
    content: "";
    width: 50px;
    height: 100%;
    position: absolute;
    right: -10px;
    top: 0;
    background: linear-gradient(
      90deg,
      #1c2139 15.56%,
      rgba(28, 33, 57, 0) 100%
    );
    transform: matrix(-1, 0, 0, 1, 0, 0);
    z-index: 9;
  }
  .slider_btn_stack {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    z-index: 10;
    pointer-events: none;
    button {
      pointer-events: all;
      min-width: auto;
    }
  }
  .slick-slider {
    .slick-list {
      margin: 0 -7.5px;
    }
    .slick-slide {
      padding: 0 7.5px;
      &.slick-center {
        &.slick-current {
          .each_slide {
            /* button {
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
              border-radius: 16px;
              border: 1.5px solid transparent;
            } */
          }
        }
      }
    }
  }
  .each_slide {
    button {
      min-height: 40px;
      padding: 10px 18px;
      /* min-width: 100%; */
      background: rgba(40, 44, 70, 0.3);
      border: 1.5px solid rgba(103, 120, 177, 0.2);
      border-radius: 16px;
      min-width: 100%;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      transition: all 0.5s ease;
      @media (max-width: 599px) {
        padding: 10px 18px;
      }
      &.isActive {
        background: radial-gradient(
            95.83% 95.83% at 16.67% 4.17%,
            #769bff 0%,
            #326aff 100%
          )
          /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
        box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
          -18px 18px 15px rgba(9, 9, 17, 0.04),
          -8px 8px 11px rgba(9, 9, 17, 0.06), -2px 2px 6px rgba(9, 9, 17, 0.07),
          0px 0px 0px rgba(9, 9, 17, 0.07);
        border-radius: 16px;
        border: 1.5px solid transparent;
      }
    }
  }
`;
