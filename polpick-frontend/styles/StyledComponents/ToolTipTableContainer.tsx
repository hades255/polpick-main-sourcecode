import { primaryColors } from "@/themes/_muiPalette";
import { TableContainer, styled } from "@mui/material";

export const ToolTipTableContainer = styled(TableContainer)`
  background-color: transparent;
  table {
    thead {
      tr {
        th {
          font-weight: 600;
          font-size: 10px;
          line-height: 1;
          letter-spacing: -0.01em;
          color: #8f9bbf;
          padding: 5px 10px;
          border: 0;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            padding-right: 0;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          border: 0;
          padding: 5px 10px;
          &:first-child {
            padding-left: 0;
          }
          &:last-child {
            padding-right: 0;
          }

          p {
            font-weight: 600;
            font-size: 12px;
            letter-spacing: -0.01em;
            text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
            &.upper {
              color: ${primaryColors?.color34d16a};
              text-shadow: 0px 4px 20px rgba(52, 209, 106, 0.5);
            }
            &.lower {
              color: ${primaryColors?.colorE85151};
              text-shadow: 0px 4px 20px rgba(232, 81, 81, 0.5);
            }
          }
        }
      }
    }
  }
  .controller_stack {
    margin-top: 10px;
    button {
      min-width: auto;
      padding: 0;
      width: 27px;
      height: 20px;
      background: linear-gradient(
        158.43deg,
        rgba(143, 155, 191, 0.08) 13.01%,
        rgba(143, 155, 191, 0) 90.09%
      );
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
      backdrop-filter: blur(7.5px);
      border-radius: 8px;
      .MuiButton-startIcon {
        margin: 0;
      }
    }
    .controller_left {
      button {
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
    .controller_rgt {
      button {
        transform: rotate(180deg);
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
`;
