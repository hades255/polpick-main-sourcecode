import { Box, styled } from "@mui/material";

export const TopWinnerSecWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    left: 50%;
    transform: translateX(-150%);
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
    transform: translateX(150%);
    top: 0;
    background: rgba(220, 46, 44, 0.15);
    filter: blur(175px);
    z-index: -1;
  }
  .btn_stack {
    button {
      min-width: 200px;
      margin-top: 70px;
      @media (max-width: 899px) {
        margin-top: 30px;
      }
    }
  }

  .history_table {
    height: 630px !important;
    @media (max-width: 899px) {
      height: 400px !important;
      overflow-y: auto !important;
    }
  }
`;
