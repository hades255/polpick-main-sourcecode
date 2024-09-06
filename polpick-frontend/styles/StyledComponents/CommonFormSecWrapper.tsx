import { primaryColors } from "@/themes/_muiPalette";
import { Box, FormControlLabel, styled } from "@mui/material";

export const CommonFormSecWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "noMargin"
})<{ noMargin?: boolean }>`
  .form_sec {
    margin-top: ${({ noMargin }) => (noMargin ? "0px" : "40px")};
    @media (max-width: 899px) {
      margin-top: 20px;
    }
    .MuiButtonBase-root {
      &.MuiButton-containedPrimary {
        min-width: 100%;
      }
    }
  }
`;

export const CustomFormControlLabel = styled(FormControlLabel, {
  shouldForwardProp: (data) => data !== "IconColor" && data !== "mainTextColor"
})<{ IconColor?: string; mainTextColor?: string }>`
  margin: 0;
  .MuiCheckbox-root {
    padding: 0;
    margin-right: 14px;
  }
  p {
    font-weight: 500 !important;
    font-size: 12px !important;
    letter-spacing: -0.01em;
    color: ${({ mainTextColor }) =>
      mainTextColor ? `${mainTextColor}` : `${primaryColors?.color5f667c}`};
    span {
      color: ${({ IconColor }) => `${IconColor || primaryColors?.colorff7424}`};
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
    }
  }
`;
