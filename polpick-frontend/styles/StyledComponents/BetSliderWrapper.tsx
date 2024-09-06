import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const BetSliderWrapper = styled(Box)`
  padding: 20px 0;
  .number_btn {
    flex-basis: 118px;
    height: 48px;
    background: rgba(40, 44, 70, 0.3);
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;
    button {
      min-width: auto;
      color: ${primaryColors?.color4F80FF};
      padding: 0;
      font-size: 18px;
    }
    p {
      font-weight: 600;
      font-size: 20px;
      letter-spacing: -0.01em;
      padding: 0 20px;
    }
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
  .number_slider {
    flex-basis: calc(100% - 130px);
    padding-left: 16px;
    .MuiSlider-root {
      &.Mui-disabled {
        color: transparent;
        .MuiSlider-track {
          opacity: 0.25;
        }
      }
      .MuiSlider-rail {
        height: 12px;

        background: #141726;
        border-radius: 20px;
      }
      .MuiSlider-track {
        background: linear-gradient(
          90deg,
          ${primaryColors?.color42cb67} 0%,
          ${primaryColors?.color4F80FF} 100%
        );
        box-shadow: 0px 2px 10px rgba(77, 145, 223, 0.7);
        border-radius: 20px;
        left: 3px !important;
      }
      .MuiSlider-thumb {
        background: ${primaryColors?.color4F80FF};
        box-shadow: 0px 2px 10px rgba(78, 136, 239, 0.6);
        &::before {
          width: 10px;
          height: 12px;
          background: url(${assest?.open_lock_img}) no-repeat center;
          background-size: 100% 100%;
          box-shadow: none;
          border-radius: 0;
        }
        &.Mui-disabled {
          &::before {
            background: url(${assest?.lock_img}) no-repeat center;
          }
        }
      }
      .MuiSlider-valueLabel {
        background-color: transparent;
        padding: 0;
        text-align: center;
        top: 40px;
        .MuiSlider-valueLabelLabel {
          p {
            font-weight: 600;
            font-size: 8px;
            text-align: center;
            letter-spacing: -0.01em;
            color: ${primaryColors?.color8f9bbf};
            margin-bottom: 30px;
          }
          h6 {
            font-weight: 600;
            font-size: 14px;
            line-height: 12px;
            letter-spacing: -0.01em;
            color: ${primaryColors?.textPrimaryColor};
          }
        }
      }
    }
  }
`;
