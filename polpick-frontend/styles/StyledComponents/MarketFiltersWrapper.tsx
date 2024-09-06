import { primaryColors } from "@/themes/_muiPalette";
import { Stack, styled } from "@mui/material";

export const MarketFiltersWrapper = styled(Stack)`
  margin-bottom: 50px;
  @media (max-width: 899px) {
    margin-bottom: 20px;
  }
  .filter_left {
    button {
      width: 100px;
      height: 38px;
      font-weight: 600;
      font-size: 13px;
      text-align: center;
      letter-spacing: -0.01em;
      color: ${primaryColors.color8f9bbf};
      border: 1.5px solid rgba(103, 120, 177, 0.24);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      background: transparent;
      &:hover {
        color: ${primaryColors?.color4F80FF};
      }
      :not(:last-child) {
        margin-right: 14px;
      }
    }
  }
  .market_filter_btn {
    min-width: auto;
    padding: 0;
  }
  .filter_rgt {
    .MuiInputBase-root {
      background: transparent;
      backdrop-filter: blur(16px);
      border-radius: 16px;
      display: flex;
      align-items: center;
      padding: 11px 14px 8px;
      margin-right: 14px;
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
`;
