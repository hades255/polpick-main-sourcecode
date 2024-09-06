import { primaryColors } from "@/themes/_muiPalette";
import { Stack, styled } from "@mui/material";

export const FilterStackWrapper = styled(Stack)`
  margin: 100px 0 80px;
  @media (max-width: 1199px) {
    margin: 50px 0;
  }
  @media (max-width: 599px) {
    flex-wrap: wrap;
    > * {
      width: 100% !important;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
  .filter_rgt {
    margin-left: auto;
    .MuiInputBase-root {
      background: transparent;
      border: 0;
      border-radius: 16px;
      display: flex;
      align-items: center;
      padding: 14px 27.5px;
      .MuiSelect-select {
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: ${primaryColors.textPrimaryColor};
      }
      .MuiIconButton-root {
        right: 20px;
      }
      fieldset {
        border-color: rgba(103, 120, 177, 0.2);
        border-width: 1.5px;
      }
      &.Mui-focused {
        fieldset {
          border-color: ${primaryColors?.primary};
        }
      }
    }
  }
  .MuiTextField-root {
    min-width: 300px;
    .MuiInputBase-root {
      &.MuiOutlinedInput-root {
        padding: 14px 20px;
        border: 0;
        border-radius: 16px;

        input {
          padding: 0 0 0 15px;
          border: 0;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: ${primaryColors?.textPrimaryColor};
          &::placeholder {
            color: ${primaryColors?.textPrimaryColor};
            opacity: 0.3;
          }
        }
        fieldset {
          border-color: rgba(103, 120, 177, 0.2);
          border-width: 1.5px;
        }
        &.Mui-focused {
          fieldset {
            border-color: ${primaryColors?.primary};
          }
        }
      }
    }
  }
`;
