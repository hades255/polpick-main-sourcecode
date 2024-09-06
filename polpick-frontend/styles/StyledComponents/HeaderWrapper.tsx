import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const HeaderWrap = styled(Box)`
  background: transparent;
  box-shadow: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9;
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 235.76px;
    left: 111.43px;
    top: -20px;
    background: ${primaryColors?.color3d72ff};
    opacity: 0.4;
    filter: blur(150px);
    z-index: -1;
    @media (max-width: 899px) {
      display: none;
    }
  }
  .MuiContainer-root {
    max-width: 1260px;
  }
  .MuiToolbar-root {
    min-height: auto;
    padding: 0;
  }
  .hdr_rgt {
    margin-left: 80px;
    display: flex;
    align-items: center;
    @media (max-width: 1199px) {
      margin-left: 25px;
    }
    @media (max-width: 899px) {
      margin-left: auto;
    }
    button {
      min-width: 142px;
      @media (max-width: 599px) {
        min-width: auto;
        padding: 18px 15px;
        font-size: 12px;
      }
    }
    .MuiBadge-badge {
      right: 4px;
      top: 5px;
      min-width: 10px;
      height: 10px;
    }
    .countryIcon {
      border: 1.5px solid rgba(103, 120, 177, 0.24);
      backdrop-filter: blur(16px);
      border-radius: 16px;
      width: 48px;
      height: 48px;
      padding: 0px;
      min-width: auto;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;

      @media (max-width: 899px) {
        margin-left: 15px;
      }
    }
  }

  .headerContainer {
    background-color: transparent !important;
    padding: 50px 0;
    transition: all 0.4s;
    @media (max-width: 1199px) {
      padding: 15px 0;
    }
  }

  .headerLogo {
    width: 120px;
    display: inline-block;
    transition: all 0.4s;
  }
  .navbar {
    margin-left: auto;
    a {
      margin-right: 85px;
      display: inline-block;
      font-weight: 500;
      color: ${primaryColors.colorECF3FFOpacity};
      font-size: 13px;
      @media (max-width: 1199px) {
        margin-right: 25px;
      }
      &:hover {
        color: ${primaryColors.color769bff};
      }
      &:last-child {
        margin-right: 0;
      }
      &:first-child {
        margin-left: 0;
      }
      &.active {
        color: ${primaryColors.color769bff};
      }
    }
  }
`;
