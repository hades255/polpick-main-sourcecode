import { primaryColors } from "@/themes/_muiPalette";
import { Box, ListItem, styled } from "@mui/material";

export const DashboardChartSecWrapper = styled(Box)`
  .custom_legend {
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 899px) {
        flex-wrap: wrap;
        margin: -9px;
      }
      li {
        @media (max-width: 899px) {
          width: 50%;
          margin: 0;
          padding: 9px;
        }
      }
    }
  }
  .chart_filter {
    margin-bottom: 40px;
    @media (max-width: 899px) {
      margin-bottom: 20px;
    }
  }
  .export_btn {
    font-weight: 600;
    font-size: 13px;
    letter-spacing: -0.01em;
    color: ${primaryColors?.textPrimaryColor};
  }
  .chart_filter_left {
    > button {
      width: 60px;
      height: 38.02px;
      border: 1.5px solid rgba(103, 120, 177, 0.24);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      font-weight: 600;
      font-size: 13px;
      line-height: 2;
      letter-spacing: -0.01em;
      color: #8f9bbf;
      margin-right: 10px;
      &:hover {
        color: #4f80ff;
      }
    }
    .MuiInputBase-root {
      &.date_select {
        background: transparent;
        backdrop-filter: blur(16px);
        border-radius: 16px;
        display: flex;
        align-items: center;
        padding: 11px 14px 8px;
        margin-right: 14px;
        width: 128px;
        .MuiSelect-select {
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.01em;
          color: ${primaryColors.color8f9bbf};
        }
        .MuiIconButton-root {
          right: 20px;
        }
        fieldset {
          border-color: rgba(103, 120, 177, 0.24);
          border-width: 1.5px;
        }
        &.Mui-focused {
          fieldset {
            border-color: ${primaryColors?.primary};
          }
        }
        :last-child {
          margin-right: 0;
        }
      }
    }
    .graph_datepicker {
      .MuiInputBase-root {
        input,
        fieldset {
          display: none;
        }
        .MuiInputAdornment-root {
          button {
            padding: 0;
            border: 0;
            width: auto;
          }
        }
      }
    }
  }
`;

export const EachLegendItemWrap = styled(ListItem)`
  width: auto;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 50px;
  }
  > span {
    width: 9px;
    height: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-right: 10px;
  }
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: -0.01em;
    color: ${primaryColors?.color8f9bbf};

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8px;
    }
  }
`;
