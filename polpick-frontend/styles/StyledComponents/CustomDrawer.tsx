import { Drawer, styled } from "@mui/material";

export const CustomDrawer = styled(Drawer)`
  .MuiPaper-root {
    background: linear-gradient(0.06deg, #222844 0.04%, #2b305b 99.95%);
    .logo_sec {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 25px 18px;
    }
    ul {
      li {
        padding: 13px 18px;
        a {
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: #8f9bbf;
        }
      }
    }
  }
`;
