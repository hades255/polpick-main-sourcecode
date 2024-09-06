import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const DashboardSidebarWrapper = styled(Box, {
  shouldForwardProp: (data) =>
    data !== "listHeight" && data !== "logoutSecHeight" && data !== "panelOpen"
})<{
  listHeight: number | undefined;
  logoutSecHeight: number | undefined;
  panelOpen: boolean;
}>`
  width: ${({ panelOpen }) => (panelOpen ? "300px" : "100px")};
  flex-basis: ${({ panelOpen }) => (panelOpen ? "300px" : "100px")};
  position: fixed;
  left: 20px;
  top: 20px;
  /* height: calc(100vh - 48px);
    overflow-y: auto; */
  z-index: 5;
  background: linear-gradient(0.06deg, #222844 0.04%, #2b305b 99.95%);
  padding: 24px 0px;
  border-radius: 40px 40px 0 0;
  transition: all 0.5s ease;
  height: calc(100vh - 20px);
  @media (min-width: 1921px) {
    width: ${({ panelOpen }) => (panelOpen ? "15vw" : "100px")};
    flex-basis: ${({ panelOpen }) => (panelOpen ? "15vw" : "100px")};
  }
  @media (max-width: 1199px) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    transition: 0.6s ease-in-out;
    padding: 0;
  }
  &.panelOpenPrnt {
    @media (max-width: 1199px) {
      transform: translateX(0);
    }
  }
  .logo_sec {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 20px 45px;
    a {
      display: inline-block;
    }
  }
  .sidebar_menu {
    &.panel_open {
      padding: 0 0 0 40px;
      li {
        display: block;
        &:not(:last-child) {
          margin-bottom: 40px;
        }
        &:hover {
          p {
            i {
              svg {
                path {
                  stroke: ${primaryColors.color4F80FF};
                }
              }
            }
          }
        }
        button {
          padding-left: 0;
          width: 100%;
          justify-content: flex-start;
          font-weight: 600;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.06em;
          color: ${primaryColors?.color8f9bbf};
          border-radius: 10px;
          .MuiButton-icon {
            // For Lottie animation
            width: 48px;
            height: 48px;
            justify-content: center;
            align-items: center;
          }
          &.fill_icon {
            width: 100%;
            background: none !important;
            box-shadow: none !important;
            border-radius: 0;
          }
          @media (min-width: 1921px) {
            font-size: 0.65vw;
          }
          .list_link_txt {
            display: inline-block;
            margin-left: 27px;
          }
          &:hover {
            color: ${primaryColors.color4F80FF};
          }
          &.active {
            color: ${primaryColors.color4F80FF};
          }
        }
        p {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.06em;
          color: ${primaryColors?.textPrimaryColor};
          margin-bottom: 21px;
          span {
            display: block;
            color: inherit;
          }
          i {
            margin-right: 27px;
            cursor: auto;
            width: 48px;
            height: 48px;
          }
          @media (min-width: 1921px) {
            font-size: 0.65vw;
          }
        }
        .sub_list {
          display: block;
          padding-left: 35px;
          @media (min-width: 1921px) {
            padding-left: 2vw;
          }
          li {
            &:not(:last-child) {
              margin-bottom: 20px;
            }
            button {
              justify-content: flex-start;
              padding: 8px 27px;
              width: 100%;
              color: ${primaryColors?.color8f9bbf};
              &:hover {
                background: linear-gradient(
                  122.28deg,
                  rgba(93, 137, 255, 0.23) 34.06%,
                  rgba(93, 137, 255, 0.08) 73.19%
                );
                color: ${primaryColors?.color4F80FF};
              }
              &.active {
                background: linear-gradient(
                  122.28deg,
                  rgba(93, 137, 255, 0.23) 34.06%,
                  rgba(93, 137, 255, 0.08) 73.19%
                );
                color: ${primaryColors?.color4F80FF};
              }
            }
          }
        }
      }
    }
    padding: 0 20px;
    overflow-y: auto;
    height: calc(100vh - 235px);
    margin-bottom: ${({ logoutSecHeight }) => `${logoutSecHeight}px`};

    > li {
      position: relative;
      display: flex;
      justify-content: center;
      @media (min-width: 1921px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:not(:last-child) {
        margin-bottom: 60px;
      }
      > button {
        justify-content: center;
        padding: 0;
        background: transparent;
        border-radius: 0;
        width: 100%;
        height: auto;
        min-width: auto;

        .list_link_txt {
          color: inherit;
          display: none;
          margin-left: 0;
        }
        .MuiButton-startIcon {
          margin: 0px;
          @media (min-width: 1921px) {
            width: 1vw;
            height: 1vw;
          }
          svg {
            @media (min-width: 1921px) {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
        &.fill_icon {
          /* color: ${primaryColors?.textPrimaryColor}; */
          width: 48px; // For Lottie animation
          height: 48px; // For Lottie animation
          /* background: radial-gradient(
            95.83% 95.83% at 16.67% 4.17%,
            #769bff 0%,
            #326aff 100%
          );
          box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
            -18px 18px 15px rgba(9, 9, 17, 0.04),
            -8px 8px 11px rgba(9, 9, 17, 0.06),
            -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
          border-radius: 16px;
          margin: 0 auto; */
          &:hover,
          &.active {
            /* background: url(${assest?.game_icon_bg}) no-repeat center;
            background-size: 100% 100%;
            box-shadow: 0px 4px 15px rgba(84, 130, 248, 0.3);
            backdrop-filter: blur(5px);
            color: ${primaryColors?.color4F80FF}; */
            svg {
              // For Lottie animation
              path {
                stroke: inherit;
              }
            }
          }
          .MuiButton-icon {
            width: 48px;
            height: 48px;
          }
          &.lottie_disable {
            color: ${primaryColors?.textPrimaryColor};
            background: radial-gradient(
              95.83% 95.83% at 16.67% 4.17%,
              #769bff 0%,
              #326aff 100%
            );
            box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
              -18px 18px 15px rgba(9, 9, 17, 0.04),
              -8px 8px 11px rgba(9, 9, 17, 0.06),
              -2px 2px 6px rgba(9, 9, 17, 0.07),
              0px 0px 0px rgba(9, 9, 17, 0.07);
            border-radius: 16px;
            margin: 0 auto;
            .MuiButton-icon {
              width: 48px;
              height: 48px;
              justify-content: center;
              align-items: center;
            }
          }
        }
        &:hover,
        &.active {
          background: transparent;
          svg {
            path {
              stroke: ${primaryColors.color4F80FF};
            }
          }
        }
      }
      .sub_list {
        display: none;
      }
      p {
        span {
          display: none;
        }
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0;
          cursor: pointer;
          @media (min-width: 1921px) {
            width: 1vw;
            height: 1vw;
          }
          svg {
            @media (min-width: 1921px) {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          /* &:hover {
            svg {
              path {
                stroke: ${primaryColors.color4F80FF};
              }
            }
          } */
        }
        &.active,
        &:hover {
          i {
            svg {
              path {
                stroke: ${primaryColors.color4F80FF};
              }
            }
          }
        }
      }
      &.active {
        button {
          background: transparent;
          svg {
            path {
              stroke: ${primaryColors.color4F80FF};
            }
          }
        }
      }
    }

    @media (max-width: 1199px) {
      height: auto !important;
      overflow: inherit !important;
      padding: 30px 35px !important;
    }
    @media (max-width: 599px) {
      padding: 18px 22px !important;
    }
  }
  .logout_block {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${primaryColors?.primary};
    width: 100%;
    padding: 20px 20px 50px 20px;
    z-index: 3;
    a {
      font-family: "Roboto";
      font-weight: 500;
      font-size: 14px;
      line-height: 1.5;
      color: ${primaryColors?.white};
      width: 100%;
      justify-content: flex-start;
      padding: 19.5px 20px;
      background: ${primaryColors?.primary};
      border-radius: 10px;
      .MuiButton-startIcon {
        margin-left: 0px;
        margin-right: 12px;
      }
      &:hover {
        background: rgba(120, 64, 137, 0.6);
      }
    }
  }
  .menuIcon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 120px;
    button {
      width: 48px;
      height: 48px;
      border: 1.5px solid rgba(103, 120, 177, 0.24);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      min-width: auto;
      padding: 0;
      &:hover {
        background: ${primaryColors.primary};
        border-color: ${primaryColors.primary};
      }
      @media (min-width: 1921px) {
        width: 2.5vw;
        height: 2.5vw;
        border: 3.5px solid rgba(103, 120, 177, 0.24);
        svg {
          width: 1vw;
          height: 1vw;
        }
      }
      @media (max-width: 1199px) {
        border-radius: 12px;
      }
      @media (max-width: 599px) {
        width: 40px;
        height: 40px;
      }
      @media (max-width: 379px) {
        width: 30px;
        height: 30px;
      }
      svg {
        @media (max-width: 379px) {
          height: auto;
          width: 13px;
        }
      }
    }
    &.open {
      margin-bottom: 50px;
    }
  }
  &.wrapper_lft {
    @media (max-width: 1199px) {
      border-radius: 0;
      z-index: 1000;
    }
    .menuIcon {
      @media (max-width: 1199px) {
        min-height: 90px;
        display: flex;
        justify-content: flex-start;
        padding: 8px 30px 5px 30px;
        margin-bottom: 0;
      }
      @media (max-width: 599px) {
        padding: 15px 12px;
        min-height: inherit;
      }
      .logoMenuOpen {
        @media (max-width: 1199px) {
          margin-left: 20px;
        }
        @media (max-width: 599px) {
          margin-left: 12px;
        }
        svg {
          @media (max-width: 599px) {
            height: auto;
            width: 64px;
          }
        }
      }
    }
    .sidebar_menu {
      li {
        p,
        .list_link_txt {
          @media (max-width: 1199px) {
            font-weight: 600;
            font-size: 16px;
            line-height: 1.3;
            letter-spacing: -0.01em;
            color: ${primaryColors?.textPrimaryColor};
            /* margin-bottom: 10px; */
          }
        }
        .sub_list {
          @media (max-width: 1199px) {
            padding-left: 48px;
          }
          li {
            @media (max-width: 1199px) {
              margin-bottom: 5px !important;
              &:last-child {
                margin-bottom: 0;
              }
            }
            a {
              @media (max-width: 1199px) {
                font-weight: 600;
                font-size: 16px;
                letter-spacing: -0.01em;
                color: ${primaryColors?.color8f9bbf};
                padding: 13px 18px;
                &:hover {
                  color: ${primaryColors?.color4F80FF};
                }
              }
            }
          }
        }
      }
    }
  }

  .clientInfosec {
    @media (max-width: 1199px) {
      display: flex;
      justify-content: space-between;
      padding: 26px 35px;
      border-bottom: 1px solid rgba(103, 120, 177, 0.15);
    }
    @media (max-width: 599px) {
      padding: 24px 22px;
    }
    .clientDtlsLft {
      @media (max-width: 1199px) {
        display: flex;
        align-items: center;
      }
      .main_img {
        @media (max-width: 1199px) {
          width: 48px;
          height: 48px;
          filter: drop-shadow(-50px 50px 28px rgba(0, 0, 0, 0.01))
            drop-shadow(-28px 28px 24px rgba(0, 0, 0, 0.04))
            drop-shadow(-13px 13px 18px rgba(0, 0, 0, 0.07))
            drop-shadow(-3px 3px 10px rgba(0, 0, 0, 0.08))
            drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.08));
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            object-fit: cover;
          }
        }
      }
      .clientDlfIn {
        @media (max-width: 1199px) {
          font-size: 20px;
          line-height: 1.3;
          font-weight: 600;
          margin-left: 13px;
        }
      }
    }
    .flag_fig {
      @media (max-width: 1199px) {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1.5px solid rgba(103, 120, 177, 0.24);
        backdrop-filter: blur(16px);
        border-radius: 16px;
        min-width: inherit;
        img {
          max-width: 28px;
          height: auto;
          object-fit: contain;
        }
      }
    }
  }
  .all_WrapMenu {
    @media (max-width: 1199px) {
      height: calc(100vh - 150px);
      overflow-y: auto;
    }
    @media (max-width: 599px) {
      height: calc(100vh - 130px);
    }
    .layerMobile {
      @media (max-width: 1199px) {
        position: absolute;
        left: 0;
        top: 90px;
        width: 100%;
        pointer-events: none;
        img {
          width: 100%;
        }
      }
      @media (max-width: 599px) {
        top: 70px;
      }
      @media (max-width: 379px) {
        top: 60px;
      }
    }
  }

  .becmPartnerBtm {
    @media (max-width: 1199px) {
      border-top: 1px solid rgba(103, 120, 177, 0.15);
      border-bottom: 1px solid rgba(103, 120, 177, 0.15);
      padding: 20px 35px;
    }
    @media (max-width: 599px) {
      padding: 20px 22px;
    }
    ul {
      @media (max-width: 1199px) {
        padding: 0;
        margin: 0;
      }
      li {
        @media (max-width: 1199px) {
          padding: 0;
          margin: 0;
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        a {
          @media (max-width: 1199px) {
            font-weight: 600;
            font-size: 16px;
            line-height: 1.3;
            letter-spacing: -0.01em;
            color: ${primaryColors?.textPrimaryColor};
            display: flex;
            align-items: center;
            &:hover {
              color: ${primaryColors?.color8f9bbf};
            }
          }
          .iconsc {
            @media (max-width: 1199px) {
              line-height: 0;
              margin-right: 27px;
              min-width: 24px;
            }
          }
        }
      }
    }
  }

  .coprytFoot {
    @media (max-width: 1199px) {
      background: linear-gradient(0.06deg, #222844 0.04%, #2b305b 99.95%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 35px;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 9;
    }
    @media (max-width: 599px) {
      padding: 20px 22px;
    }
    .coprytFoot_rtt {
      .socialIcon {
        ul {
          li {
            @media (max-width: 1199px) {
              display: inline-block;
              width: auto;
              margin-right: 26px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
`;
