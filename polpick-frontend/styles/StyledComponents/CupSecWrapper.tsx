import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const CupSecWrapper = styled(Box)`
  padding: 16px 16px;
  background: rgba(40, 44, 70, 0.3);
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 24px;
  > .MuiStack-root {
    margin: 0 -12px;
  }
  .cup_sec_left {
    width: 60%;
    padding: 0 12px;
    ul {
      li {
        &:not(:last-child) {
          margin-bottom: 10px;
        }
        i {
          width: 16px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        p {
          width: calc(100% - 16px);
          padding-left: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            font-weight: 600;
            font-size: 11px;
            line-height: 1.5;
            letter-spacing: -0.01em;
            color: ${primaryColors?.color8f9bbf};
          }
          .amount {
            font-weight: 600;
            font-size: 11px;
            line-height: 1.5;
            letter-spacing: -0.01em;
            color: ${primaryColors?.textPrimaryColor};
          }
        }
      }
    }
  }
  .cup_sec_rgt {
    width: 40%;
    padding: 0 12px;
    button {
      width: 40px;
      height: 40px;
      min-width: auto;
      padding: 5px;
      border: 1.5px solid rgba(103, 120, 177, 0.2);
      border-radius: 16px;
      @media (max-width: 479px) {
        border-radius: 10px;
      }
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`;
