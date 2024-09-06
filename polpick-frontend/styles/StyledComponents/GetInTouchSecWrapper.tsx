import { Box, styled } from "@mui/material";

export const GetInTouchSecWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    left: 50%;
    transform: translateX(-100%);
    top: 0;
    background: rgba(52, 209, 106, 0.2);
    filter: blur(150px);
    z-index: -1;
  }
  &::before {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    right: 50%;
    transform: translateX(100%);
    top: 0;
    background: rgba(220, 46, 44, 0.15);
    filter: blur(175px);
    z-index: -1;
  }
  .get_in_touch_sec {
    max-width: 360px;
    margin: 85px auto 0;
    @media (max-width: 899px) {
      margin: 50px auto 0;
    }
    @media (max-width: 599px) {
      margin: 30px auto 0;
    }
  }
`;
