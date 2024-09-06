import { Tooltip, TooltipProps, styled } from "@mui/material";

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    slotProps={{
      popper: {
        className
      }
    }}
  />
))`
  &.trend_popper {
    .MuiTooltip-tooltip {
      background: rgba(53, 64, 114, 0.8);
      box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 15px 20px;
    }
    .MuiTooltip-arrow {
      &::before {
        background: rgba(53, 64, 114, 0.8);
        backdrop-filter: blur(10px);
      }
    }
  }
`;
