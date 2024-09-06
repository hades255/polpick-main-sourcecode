import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const WrapperStyle = styled(Box)`
  background-color: #040e10;
  min-height: 100vh;
  .main_body {
    min-height: calc(100vh - 96px);
  }
  span {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
`;
