import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const GraphWrapper = styled(Box)`
  background: transparent;
  overflow: hidden;
  .svg_draw_group {
    > path {
      /* stroke-dasharray: 1000;
      stroke-dashoffset: 1000; */
      transition: stroke-dashoffset 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  }
  .reference_tooltip {
    margin-left: -110px;
  }
  .connecting_block {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    z-index: 9;
    p {
      font-size: 20px;
      color: #ffff;
    }
    &.opaque {
      opacity: 0;
      z-index: -1;
    }
  }
  .price_block {
  }
`;

export const PriceBlock = styled(Box)`
  width: auto;
  height: 32px;
  background: linear-gradient(
    161.01deg,
    rgba(79, 128, 255, 0.08) 6.82%,
    rgba(79, 128, 255, 0) 95.04%
  );
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
  backdrop-filter: blur(7.5px);
  border-radius: 8px;
  border: 1px solid #d1c90b;
  padding: 2px 10px;

  p {
    font-weight: 500;
    font-size: 10px;
    line-height: 1;
    letter-spacing: -0.01em;
    color: #ffd912;
    text-shadow: 35px 55px 26px rgba(0, 0, 0, 0.01),
      20px 31px 22px rgba(0, 0, 0, 0.04), 9px 14px 16px rgba(0, 0, 0, 0.07),
      2px 3px 9px rgba(0, 0, 0, 0.08), 0px 0px 0px rgba(0, 0, 0, 0.08);
  }
  h6 {
    font-weight: 700;
    font-size: 15px;
    line-height: 1;
    letter-spacing: -0.01em;
    color: #ffd912;
    text-shadow: 35px 55px 26px rgba(0, 0, 0, 0.01),
      20px 31px 22px rgba(0, 0, 0, 0.04), 9px 14px 16px rgba(0, 0, 0, 0.07),
      2px 3px 9px rgba(0, 0, 0, 0.08), 0px 0px 0px rgba(0, 0, 0, 0.08);
  }
  &.start_tooltip {
    /* transform: translateX(-500%); */
    border: 1px solid ${primaryColors?.textPrimaryColor};
    position: relative;
    /* &::after {
      content: "";
      width: 6000px;
      height: 1.5px;
      border: 1.5px dashed ${primaryColors?.textPrimaryColor};
      position: absolute;
      right: -6000px;
      top: 50%;
      transform: translateY(-50%);
    } */
    p,
    h6 {
      color: ${primaryColors?.textPrimaryColor};
    }
  }
`;

export const LiveStatusToolTip = styled(Box, {
  shouldForwardProp: (data) => data !== "marketStaus"
})<{ marketStaus: "UP" | "DOWN" }>`
  width: 44px;
  height: 20px;
  padding-bottom: 2px;
  transform: translateX(-85%) translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: ${({ marketStaus }) =>
    marketStaus === "UP"
      ? `url(${assest?.upper_trade_bg})`
      : `url(${assest?.lower_trade_bg})`};
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: ${primaryColors?.textPrimaryColor};
    span {
      display: flex;
      align-items: center;
      margin-right: 4px;
      /* filter: drop-shadow(0px 1px 8px rgba(182, 65, 58, 0.7)); */
    }
  }
`;
