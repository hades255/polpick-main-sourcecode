import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const CustomTableContainer = styled(Box)`
  overflow-x: auto;
  table {
    border-collapse: separate;
    border-spacing: 0 20px;
    max-width: 830px;
    margin: 0 auto;
    thead {
      tr {
        th {
          border-bottom: none;
          text-align: center;
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          font-size: 14px;
          border-right: 1px solid rgba(143, 155, 191, 0.2) !important;
          border-bottom: none;
        }
        .paid {
          font-size: 14px;
          font-weight: 600;
          color: ${primaryColors.colorFFD912};
        }
        .crown,
        .affiliate {
          p {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 500;

            i {
              display: inline-flex;
              margin-left: 10px;
              width: 14px;
            }
          }
        }
        .people {
          p {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 500;

            i {
              display: inline-flex;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
`;
