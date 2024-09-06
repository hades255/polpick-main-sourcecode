import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const DashboardHeaderStyled = styled(Box, {
  shouldForwardProp: (data) => data !== "panelOpen"
})<{ panelOpen: boolean }>`
  .conn_wallet {
    padding: 18px 19px;
    backdrop-filter: blur(16px);
    @media (max-width: 899px) {
      padding: 0;
      width: 48px;
      height: 48px;
      border: 1.5px solid rgba(103, 120, 177, 0.24);
      background: transparent;
      .MuiButton-startIcon {
        margin: 0;
      }
    }
  }

  position: fixed;
  right: 20px;
  top: 20px;
  width: calc(100% - 140px);
  padding: 15px 30px 15px 50px;
  transition: all 0.5s ease;
  margin-right: ${({ panelOpen }) => (panelOpen ? "-200px" : "0px")};
  @media (min-width: 1921px) {
    margin-right: ${({ panelOpen }) => (panelOpen ? "-11vw" : "0px")};
    padding: 2vh 30px 2vh 50px;
  }
  @media (max-width: 1599px) {
    padding: 22px 25px;
  }
  @media (max-width: 1199px) {
    width: 100%;
    left: 0;
    right: 0;
    padding: 22px 25px;
    top: 0;
    margin: 0;
    z-index: 100;
    &.bg-color {
      background-color: ${primaryColors?.primary};
    }
  }
  @media (max-width: 599px) {
    padding: 10px 12px;
  }
  @media (max-width: 379px) {
    padding: 10px 6px;
  }
  .header_title {
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    h1 {
      font-weight: 600;
      font-size: 23px;
      color: ${primaryColors?.color060606};
    }
    .logoicon {
      @media (min-width: 1921px) {
        width: 7vw;
        svg {
          width: 100%;
          height: 100%;
        }
      }
      @media (max-width: 599px) {
        svg {
          height: auto;
          width: 64px;
        }
      }
      @media (max-width: 379px) {
        svg {
          width: 60px;
        }
      }
    }
  }
  .notification_icon {
    width: 47px;
    height: 42px;
    background: ${primaryColors?.primary_600};
    border-radius: 5px;
    min-width: auto;
    padding: 0;
    margin-right: 12px;
    .is_active {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: ${primaryColors?.primary};
        position: absolute;
        right: 0;
        top: 1px;
        z-index: 1;
      }
    }
  }
  .avatar_block {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }
  .avatar_btn {
    padding: 0;
    border-radius: 16px;
    border: 0;
    width: 48px;
    height: 48px;
    min-width: auto;
    img {
      border-radius: 16px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .MuiAvatar-root {
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }
    @media (min-width: 1921px) {
      width: 1.9vw;
      height: 1.9vw;
    }
  }
  .header_options {
    margin: 0 0 0 56px;
    width: 100%;
    @media (max-width: 599px) {
      margin: 0 0 0 10px;
    }
    @media (max-width: 379px) {
      margin: 0 0 0 5px;
    }
    .currencySelect {
      margin-right: auto;
      position: relative;
      @media (max-width: 899px) {
        display: none;
      }
      .new_chip {
        background: url(${assest?.chip_bg}) no-repeat center;
        background-size: 100% 100%;
        width: 56px;
        height: 30px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        position: absolute;
        left: -25px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        text-transform: uppercase;
        .MuiChip-label {
          padding: 0;
        }
        &.premium_chip {
          background: url(/assets/images/vip_bg.png) no-repeat center;
          box-shadow: 0px 4px 50px rgba(241, 195, 33, 0.3);
        }
      }
      .MuiSelect-select {
        background: rgba(40, 44, 70, 0.3);
        border: 1.5px solid rgba(103, 120, 177, 0.2);
        border-radius: 16px;
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: ${primaryColors.textPrimaryColor};
        padding: 12px 32px 12px 41px;
        svg {
          display: inline-flex;
          align-items: center;
          margin-right: 10px;
        }
        @media (min-width: 1921px) {
          font-size: 0.75vw;
        }
        .bitcoin_block {
          .select_chip,
          .MuiGrid-root {
            display: none;
          }
          .bitcoin_block_stack_head_left {
            display: flex;
          }
        }
      }
      .MuiSvgIcon-root {
        background: url("/assets/images/selectIconArw.svg") no-repeat center
          center;
        path {
          display: none;
        }
      }
      fieldset {
        display: none;
      }
    }
  }
  .mblNone {
    @media (max-width: 1199px) {
      display: none !important;
    }
  }
  .btnListAll {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: -0.01em;
    color: ${primaryColors.textPrimaryColor};
    @media (min-width: 1921px) {
      font-size: 0.75vw;
    }
    @media (max-width: 599px) {
      font-size: 12px;
    }
    > i {
      @media (min-width: 1921px) {
        width: 1vw;
        height: 1vw;
      }
      > svg {
        @media (min-width: 1921px) {
          width: 100%;
          height: 100%;
        }
        @media (max-width: 599px) {
          height: auto;
          width: 16px;
        }
      }
    }
    svg {
      display: inline-flex;
      align-items: center;
      line-height: 0;
      margin: 0 4px;
      &.toolbarsec {
        @media (min-width: 1921px) {
          width: 0.65vw;
          height: 0.65vw;
        }
        @media (max-width: 1199px) {
          margin: 0;
          height: auto;
          width: 14px;
          margin-top: -13px;
        }
      }
    }
    i {
      display: inline-flex;
      align-items: center;
      line-height: 0;
    }
  }
  .btmProgress_otr {
    width: 85px;
    overflow: hidden;
  }
  .btmProgress {
    position: relative;
    display: flex;
    align-items: center;
    transition: all 0.5s ease;
    @media (max-width: 1199px) {
      margin-top: 0;
      margin-left: 6px;
    }
    .singleProgressList {
      position: relative;
      width: 23px;
      height: 23px;
      border-radius: 50%;
      /* outline: 1px solid rgba(103, 120, 177, 0.24);
      outline-offset: -1px; */
      margin-right: 6px;
      /* @media (min-width: 1921px) {
        width: 1.2vw;
        height: 1.2vw;
        img {
          width: 100%;
          height: 100%;
        }
      } */
      /* @media (max-width: 599px) {
        width: 18px;
        height: 18px;
      } */
      /* &:last-child {
        @media (max-width: 1199px) {
          margin-right: 0;
        }
      } */

      /* &.listProgresOne {
        .MuiCircularProgress-root {
          color: #769bff;
        }
      }
      &.listProgresTwo {
        .MuiCircularProgress-root {
          color: #ec76ff;
        }
      }
      &.listProgresThree {
        .MuiCircularProgress-root {
          color: #d1c90b;
        }
      } */
      /* .MuiCircularProgress-root {
        width: 23px !important;
        height: 23px !important;
      } */
      i {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .depositWithdraw {
    position: relative;
    text-align: center;
    margin: 0 0 0 20px;
    min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(16px);
    border-radius: 12px;
    padding: 6px 11px;
    margin-left: 15px;
    @media (min-width: 1921px) {
      min-height: 4.3vh;
    }
    .bgvideo {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: 5;
      pointer-events: none;
      border-radius: 16px;
      overflow: hidden;
    }
    .currency_info {
      display: flex;
      align-items: center;
      justify-content: center;
      .MuiIconButton-root {
        width: 20px;
        height: 20px;
        padding: 0;
        background: radial-gradient(
            95.83% 95.83% at 16.67% 4.17%,
            #769bff 0%,
            #326aff 100%
          )
          /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
        box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
          -18px 18px 15px rgba(9, 9, 17, 0.04),
          -8px 8px 11px rgba(9, 9, 17, 0.06), -2px 2px 6px rgba(9, 9, 17, 0.07),
          0px 0px 0px rgba(9, 9, 17, 0.07);
        border-radius: 100%;
        @media (min-width: 1921px) {
          width: 1vw;
          height: 1vw;
          svg {
            width: 0.5vw;
            height: 0.5vw;
          }
        }

        @media (max-width: 899px) {
          /* box-shadow: none;
          background: transparent; */
          width: 13px;
          height: 13px;
          svg {
            width: 7px;
            height: 7px;
          }
        }
      }
    }

    @media (max-width: 899px) {
      min-height: 42px;
    }
    @media (max-width: 599px) {
      margin-left: 8px;
      padding: 6px 10px;
    }
    @media (max-width: 389px) {
      margin-left: 4px;
      padding: 6px 6px;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.01em;
      color: ${primaryColors.textPrimaryColor};
      margin-right: 8px;
      @media (min-width: 1921px) {
        font-size: 0.75vw;
      }
      @media (max-width: 1199px) {
        margin-bottom: 0;
      }
      @media (max-width: 599px) {
        font-size: 12px;
      }

      svg {
        line-height: 0;
        font-size: 0;
        display: inline-flex;
        margin-right: 9px;
        @media (min-width: 1921px) {
          width: 0.75vw;
          height: 0.75vw;
        }
        @media (max-width: 599px) {
          width: 10px;
          height: auto;
          margin-right: 5px;
        }
      }
    }
    .btnwrapSepWdt {
      position: relative;
      display: flex;
      align-items: center;
      button {
        min-width: auto;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: -0.01em;
        padding: 0;
        position: relative;
        line-height: 1;
        margin: 0 10px;
        @media (max-width: 599px) {
          font-size: 10px;
        }
        &::before {
          position: absolute;
          content: "";
          right: -10px;
          top: 0;
          width: 1px;
          height: 100%;
          background: rgba(236, 243, 255, 0.2);
        }
        &.depsitBtn {
          color: ${primaryColors.color4F80FF};
          &:hover {
            color: ${primaryColors.primary};
          }
        }
        &.widthDrawBtn {
          color: ${primaryColors.colorff7424};
          &:hover {
            color: ${primaryColors.primary};
          }
          &::before {
            display: none;
          }
        }
      }
    }

    &.mblVrsn {
      border: 0;
      margin: 0;
      padding: 0;
      .btnwrapSepWdt {
        justify-content: flex-end;
        margin-top: 3px;
        button {
          &:first-of-type {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .walletIcon {
    padding: 0 10px 0 0;
    margin: 0 10px 0 0;
    min-width: auto;
    position: relative;
    &:hover {
      background: transparent;
      border-color: transparent;
    }
    @media (min-width: 1921px) {
      svg {
        width: 1vw;
        height: 1vw;
      }
    }
    @media (max-width: 899px) {
      display: none;
    }
    &::after {
      content: "";
      width: 1.5px;
      height: 28px;
      background-color: #2b3350;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
  }
  .countryIcon {
    border: 1.5px solid rgba(103, 120, 177, 0.24);
    backdrop-filter: blur(16px);
    border-radius: 16px;
    width: 48px;
    height: 48px;
    padding: 0;
    min-width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: ${primaryColors.color34d16a};
      border-color: ${primaryColors.color34d16a};
    }
    img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      object-fit: cover;
      @media (min-width: 1921px) {
        width: 1vw;
        height: 1vw;
      }
    }
    @media (min-width: 1921px) {
      width: 1.9vw;
      height: 1.9vw;
    }
  }
  .allListHeaderList {
    display: flex;
    align-items: center;
    .notification_btn {
      padding: 0;
      padding-right: 10px;
      margin-right: 10px;
      min-width: auto;
      position: relative;
      &::after {
        content: "";
        width: 1.5px;
        height: 28px;
        background-color: #2b3350;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        @media (max-width: 599px) {
          display: none;
        }
      }
      @media (max-width: 599px) {
        margin: 0;
        padding: 0;
      }
    }

    .menuOneList {
      border: 1.5px solid rgba(103, 120, 177, 0.24);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      display: flex;
      align-items: center;
      padding: 6px 11px;
      min-height: 48px;
      position: relative;
      .bgImg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      @media (min-width: 1921px) {
        min-height: 4.3vh;
      }
      @media (max-width: 1199px) {
        min-height: 42px;
        border-radius: 12px;
      }
      @media (max-width: 599px) {
        padding: 6px 8px;
      }
      @media (max-width: 379px) {
        padding: 6px 4px;
      }
    }
  }

  .dashboardwrprRow {
    .menuIcon {
      margin-right: 20px;
      @media (max-width: 599px) {
        margin-right: 11px;
      }
      @media (max-width: 379px) {
        margin-right: 6px;
      }
      .MuiButtonBase-root {
        border: 1.5px solid rgba(103, 120, 177, 0.24);
        backdrop-filter: blur(16px);
        border-radius: 12px;
        padding: 0;
        min-width: inherit;
        width: 50px;
        height: 50px;
        @media (max-width: 599px) {
          width: 40px;
          height: 40px;
        }
        @media (max-width: 379px) {
          width: 30px;
          height: 30px;
          border-radius: 8px;
        }
        svg {
          width: 25px;
          height: auto;
          @media (max-width: 599px) {
            width: 18px;
          }
          @media (max-width: 379px) {
            width: 15px;
          }
        }
      }
    }
  }
`;
