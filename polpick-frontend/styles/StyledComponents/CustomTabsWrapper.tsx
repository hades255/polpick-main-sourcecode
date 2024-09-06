import { primaryColors } from "@/themes/_muiPalette";
import { Tabs, styled } from "@mui/material";

export const CustomTabsWrapper = styled(Tabs)`
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(103, 120, 177, 0.15);
  .MuiButtonBase-root {
    font-weight: 600;
    font-size: 13px;
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${primaryColors?.color8f9bbf};
    padding: 20px 50px;
    @media (max-width: 599px) {
      padding: 20px 20px;
    }
    &.Mui-selected {
      color: ${primaryColors?.textPrimaryColor};
    }
  }
  .MuiTabs-indicator {
    height: 3px;
    background: radial-gradient(
        95.83% 95.83% at 16.67% 4.17%,
        #769bff 0%,
        #326aff 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
      -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
      -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
    border-radius: 16px;
  }
`;
