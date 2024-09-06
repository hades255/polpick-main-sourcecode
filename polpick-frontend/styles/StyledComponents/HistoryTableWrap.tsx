import { primaryColors } from "@/themes/_muiPalette";
import { poppins } from "@/themes/_muiTheme";
import { Box, styled } from "@mui/material";

export const HistoryTableWrap = styled(Box)`
  .history_table {
    overflow-y: auto;
    height: calc(100vh - 380px);
    padding-right: 12px;
    @media (max-width: 899px) {
      height: 100%;
      overflow: inherit;
      padding: 0;
    }
    ::-webkit-scrollbar {
      width: 3px;
      background: transparent;
      border-radius: 44px;
    }

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0);
    }

    ::-webkit-scrollbar-thumb {
      width: 3px;
      background: #354072;
      border-radius: 44px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #354072;
    }
    table {
      border-spacing: 0px 16px;
      border-collapse: separate;
      &.playerTable {
        border-spacing: 0px 36px;
        @media (max-width: 899px) {
          border-spacing: 0px 20px;
        }
      }
    }
    th {
      border: 0;
      padding: 0 45px;
      text-align: center;
      color: ${primaryColors.color8f9bbf};
      text-transform: uppercase;
      @media (max-width: 599px) {
        padding: 0 3px;
        font-size: 10px;
      }
      @media (max-width: 374px) {
        font-size: 7px;
      }
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        /* padding-right: 0; */
        /* padding-left: 55px; */
      }
      svg {
        margin-left: 10px;
        margin-bottom: -2px;
      }
      .MuiTableSortLabel-root {
        display: inline-block;
        line-height: 0;
        margin: 0;
        font-size: 0;
        color: rgba(143, 155, 191, 1);
        .MuiTableSortLabel-iconDirectionDesc {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 0 7px;
          padding: 5px;

          svg {
            margin: 0;
          }
        }
        .MuiTableSortLabel-iconDirectionAsc {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 0 7px;
          padding: 5px;
          svg {
            margin: 0;
          }
        }
      }
    }
    td {
      vertical-align: middle;
      padding: 15px 10px;
      text-align: center;
      border: 0;
      border-top: 1px solid rgba(103, 120, 177, 0.2);
      border-bottom: 1px solid rgba(103, 120, 177, 0.2);
      &:first-child {
        border-left: 1px solid rgba(103, 120, 177, 0.2);
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
      }
      &:last-child {
        border-right: 1px solid rgba(103, 120, 177, 0.2);
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      p {
        font-size: 14px;
        font-weight: 500;
        color: ${primaryColors.white};
        @media (max-width: 374px) {
          font-size: 11px;
        }
      }
      .expand_block {
        padding: 13px 20px;
        background: rgba(40, 44, 70, 0.3);
        border: 1.5px solid rgba(103, 120, 177, 0.2);
        border-radius: 16px;
        ul {
          li {
            justify-content: space-between;
            &:not(:last-child) {
              margin-bottom: 10px;
            }
            p {
              font-weight: 600;
              font-size: 11px;
              letter-spacing: -0.01em;
              &.title {
                color: ${primaryColors?.color8f9bbf};
              }
              &.description {
                color: ${primaryColors?.textPrimaryColor};
              }
            }
          }
        }
      }
    }
    tbody {
      tr {
        border-radius: 16px;
        &:first-child {
          background: linear-gradient(
            294.32deg,
            rgba(72, 79, 123, 0.3) 23.96%,
            rgba(255, 217, 18, 0.027) 105.34%
          );

          .prize_link {
            color: ${primaryColors.colorFFD912};
            &:hover {
              color: ${primaryColors.white};
            }
          }
        }
        &:nth-child(3) {
          background: linear-gradient(
            294.32deg,
            rgba(72, 79, 123, 0.3) 23.96%,
            rgba(192, 136, 85, 0.078) 105.34%
          );

          .prize_link {
            color: ${primaryColors.colorC08855};
            &:hover {
              color: ${primaryColors.white};
            }
          }
        }
        &:nth-child(2) {
          background: linear-gradient(
            294.32deg,
            rgba(72, 79, 123, 0.3) 23.96%,
            rgba(223, 223, 223, 0.15) 105.34%
          );

          .prize_link {
            color: ${primaryColors.white};
            &:hover {
              color: ${primaryColors.white};
            }
          }
        }
      }
      &.table_section {
        tr {
          border-radius: 0;
          background: transparent;
          &.expanded_row {
            display: none;
            &.isActive {
              display: table-row;
            }
            td {
              padding: 0;
            }
          }
          td {
            border: 0;
            padding: 4px 40px;
            border-right: 1px solid rgba(143, 155, 191, 0.2);
            @media (max-width: 899px) {
              border: 0;
            }
            @media (max-width: 599px) {
              padding: 4px 10px;
            }
            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              /* padding-right: 0; */
              border-right: 0;
              @media (max-width: 899px) {
                padding: 5px 15px;
                width: 30px;
              }
            }
            .name_link {
              color: ${primaryColors?.color4F80FF};
              font-weight: 600;
              font-size: 14px;
              text-decoration: underline !important;
              &:hover {
                color: ${primaryColors?.colorE85151};
              }
            }
            .rankingnumber {
              p {
                margin-right: 10px;
                font-family: ${poppins.style.fontFamily};
                font-size: 13px;
                font-weight: 600;
                line-height: 1;
                letter-spacing: -0.01em;
                color: ${primaryColors.textPrimaryColor};
              }
              i {
                line-height: 0;
                font-size: 0;
                display: inline-block;
              }
            }
            .user_details_box {
              .tranding_bar {
                position: relative;
                z-index: 2;
                line-height: 0;
                font-size: 0;
                width: 24px;
                height: 22px;
                margin-right: -6px;
                box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.07);
                border-radius: 8px;
                background: linear-gradient(
                  156.26deg,
                  rgba(40, 196, 93, 0.08) 12.61%,
                  rgba(40, 196, 93, 0) 87.31%
                );
                backdrop-filter: blur(5px);

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .userSection {
                position: relative;
                z-index: 1;
                line-height: 0;
                font-size: 0;
                figure {
                  line-height: 0;
                  font-size: 0;
                  display: inline-block;
                  width: 32px;
                  height: 32px;
                  border-radius: 100%;
                  overflow: hidden;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
                .flagIcon {
                  position: absolute;
                  top: -5px;
                  right: -5px;
                  border-radius: 100%;
                  display: inline-block;
                  line-height: 0;
                  font-size: 0;
                  width: 16px;
                  height: 16px;
                  border: 2px solid rgba(56, 63, 106, 1);
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                }
              }
            }
            p {
              &.turnovertext {
                color: ${primaryColors.color34d16a};
              }
              &.prizetext {
                color: ${primaryColors.colorFFD912};
              }
            }
          }
        }
      }
    }
  }
  .prize_link {
    font-size: 14px;
    font-weight: 600;
    color: ${primaryColors.color8f9bbf};
    &:hover {
      color: ${primaryColors.white};
    }
  }
  .user_img {
    line-height: 0;
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      margin: 0 auto;
      img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      @media (max-width: 899px) {
        max-width: 30px;
        height: 30px;
      }
    }
    p {
      white-space: nowrap; /* Prevents text from wrapping */
      overflow: hidden; /* Hides any overflowing text */
      text-overflow: ellipsis;
      width: 50px;
      margin-left: 12px;
    }
    @media (max-width: 899px) {
      display: flex;
      align-items: center;
    }
  }
  .number_img {
    position: relative;
    .abs_number {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      font-weight: 600;
      font-size: 13px;
      color: ${primaryColors?.textPrimaryColor};
      &.text_black {
        color: ${primaryColors?.color252c4b};
      }
    }
    @media (max-width: 899px) {
      max-width: 34px;
    }
  }
`;
