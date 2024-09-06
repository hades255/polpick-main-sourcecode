import { primaryColors } from "@/themes/_muiPalette";
import { poppins } from "@/themes/_muiTheme";
import { styled } from "@mui/material";
import Chart from "react-apexcharts";

export const ChartWrapper = styled(Chart)`
  .apexcharts-marker {
    pointer-events: inherit !important;

    background: linear-gradient(135deg, #fff2fe 0%, #ffbff6 100%);
    box-shadow: 0px 2px 15px rgba(28, 26, 65, 0.43784);
  }
  .apexcharts-series {
    &.hidden {
      opacity: 0;
    }
  }
  .apexcharts-tooltip {
    background: linear-gradient(
      155.94deg,
      rgba(143, 155, 191, 0.072) 13.88%,
      rgba(143, 155, 191, 0) 107.44%
    ) !important;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
    backdrop-filter: blur(7.5px);
    border-radius: 8px;
    min-width: 177px;
    border: 1px solid #4c5579;
    .custom_tooltip {
      .custom_tooltip_title {
        text-align: center;
        padding: 8px 10px;
        border-bottom: 1px solid #4c5579;
        h6 {
          font-family: ${poppins.style.fontFamily};
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.01em;
          color: #8f9bbf;
        }
      }
      ul {
        padding: 12px 10px;
        li {
          display: flex;
          align-items: center;
          &:not(:last-child) {
            margin-bottom: 5px;
          }
          .marker_span {
            width: 9px;
            height: 9px;
            flex-basis: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 100%;
          }
          p {
            flex-basis: calc(100% - 9px);
            padding-left: 9px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title_span {
              font-family: ${poppins.style.fontFamily};
              font-weight: 500;
              font-size: 11px;
              line-height: 1.5;
              color: #8f9bbf;
              letter-spacing: -0.01em;
            }
            .value_span {
              font-family: ${poppins.style.fontFamily};
              font-weight: 700;
              font-size: 11px;
              text-align: right;
              letter-spacing: -0.01em;
              color: #ecf3ff;
            }
          }
        }
      }
      h6 {
        font-family: ${poppins.style.fontFamily};
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
        color: ${primaryColors?.textPrimaryColor};
      }
    }
  }
`;
