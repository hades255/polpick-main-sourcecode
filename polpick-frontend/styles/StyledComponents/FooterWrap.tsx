import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const FooterWrap = styled(Box)`
  padding: 50px 0;
  transition: all 0.5s ease;
  border-top: 1px solid rgba(103, 120, 177, 0.2);
  @media (max-width: 1199px) {
    padding: 20px 0;
  }
  .ftr_stack_main {
    @media (max-width: 899px) {
      flex-direction: column;
    }
  }
  .menulist_social {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @media (max-width: 899px) {
      flex-direction: column;
    }
    .listFooter {
      display: flex;
      align-items: center;
      margin-left: 0;
      @media (max-width: 899px) {
        margin-top: 20px;
      }
      @media (max-width: 599px) {
        flex-direction: column;
      }
      li {
        padding: 0 50px 0 0;
        width: auto;
        @media (max-width: 599px) {
          padding: 0;
          margin: 0 0 10px 0;
        }
        &:last-child {
          padding: 0;
          @media (max-width: 599px) {
            margin: 0;
          }
        }
        a {
          font-weight: 500;
          font-size: 12px;
          letter-spacing: -0.01em;
          color: ${primaryColors.color8f9bbf};
          &:hover {
            color: ${primaryColors.color769bff};
          }
          @media (min-width: 1921px) {
            font-size: 0.75vw;
          }
        }
      }
    }
    .socialIcon {
      position: relative;
      margin-left: 245px;
      @media (max-width: 1199px) {
        margin-left: 50px;
      }
      @media (max-width: 899px) {
        margin-left: 0;
        margin-top: 20px;
      }
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
