import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const DashboardFooterWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "panelOpen"
})<{ panelOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 35px;
  position: fixed;
  right: 20px;
  bottom: 0;
  width: calc(100% - 140px);
  padding: 25px 30px 22px 50px;
  transition: all 0.5s ease;
  margin-right: ${({ panelOpen }) => (panelOpen ? "-200px" : "0px")};
  @media (min-width: 1921px) {
    margin-right: ${({ panelOpen }) => (panelOpen ? "-11vw" : "0px")};
  }
  .menulist_social {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .listFooter {
      display: flex;
      align-items: center;
      margin-left: 0;
      li {
        padding: 0 50px 0 0;
        width: auto;
        &:last-child {
          padding: 0;
        }
        a {
          font-weight: 500;
          font-size: 12px;
          letter-spacing: -0.01em;
          color: ${primaryColors.color8f9bbf};
          &:hover {
            color: ${primaryColors.primary1};
          }
          @media (min-width: 1921px) {
            font-size: 0.75vw;
          }
        }
      }
    }
    .socialIcon {
      position: relative;
      padding-left: 154px;

      ul {
        display: flex;
        align-items: center;
        margin-left: auto;
        li {
          padding: 0 30px 0 0;
          &:last-child {
            padding: 0;
          }
          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            &:hover {
              opacity: 0.7;
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
  .ftr_left {
    p {
      font-weight: 500;
      font-size: 12px;
      letter-spacing: -0.01em;
      color: ${primaryColors.color8f9bbf};
      @media (min-width: 1921px) {
        font-size: 0.75vw;
      }
    }
  }
`;
