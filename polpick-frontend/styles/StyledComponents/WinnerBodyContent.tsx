import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const WinnerBodyContent = styled(Box)`
  .weeklysubtitle {
    color: ${primaryColors.textPrimaryColor};
    text-align: center;
    font-size: 36px;
    margin-bottom: 0px;
    @media (max-width: 899px) {
      margin-bottom: 0px;
    }
  }
`;
