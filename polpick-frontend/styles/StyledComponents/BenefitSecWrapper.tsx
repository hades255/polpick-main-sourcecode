import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const BenefitSecWrapper = styled(Box)`
  .benefit_content {
    position: relative;
    margin-top: 130px;
    background-color: ${primaryColors?.color040E10};
    @media (max-width: 1199px) {
      margin-top: 50px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 205px;
      height: 100%;
      right: -15%;
      top: 0;
      background-color: ${primaryColors?.color040E10};
      filter: blur(50px);
      z-index: 1;
      @media (max-width: 899px) {
        display: none;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 50%;
      height: 100%;
      left: -10%;
      top: 0;
      background-color: ${primaryColors?.color040E10};
      filter: blur(50px);
      z-index: 1;
      @media (max-width: 899px) {
        display: none;
      }
    }
    .benefit_fig {
      position: absolute;
      right: -11%;
      top: -40px;
      z-index: 1;
      max-width: 1200px;
      @media (max-width: 899px) {
        position: static;
      }
      figure {
        width: 100%;
        height: 100%;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 420px;
          height: 320px;
          left: 11%;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(52, 209, 106, 0.3);
          filter: blur(150px);
          z-index: 1;
          @media (max-width: 899px) {
            width: 200px;
            height: 200px;
            filter: blur(100px);
          }
        }
        &::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 320px;
          right: 11%;
          bottom: 15%;
          background: rgba(220, 46, 44, 0.3);
          filter: blur(150px);
          z-index: 1;
          @media (max-width: 899px) {
            width: 200px;
            height: 200px;
            filter: blur(100px);
          }
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      &::after {
        content: "";
        position: absolute;
        width: 301px;
        height: 100%;
        right: -15%;
        top: 0;
        background: ${primaryColors?.color0c1012};
        filter: blur(100px);
        z-index: 1;
        @media (max-width: 899px) {
          display: none;
        }
      }
      &::before {
        content: "";
        position: absolute;
        width: 301px;
        height: 100%;
        left: -7%;
        top: 0;
        background: ${primaryColors?.color0c1012};
        filter: blur(100px);
        z-index: 1;
        @media (max-width: 899px) {
          display: none;
        }
      }
    }
    .benefit_list {
      position: relative;
      z-index: 2;
      max-width: 765px;
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: -25px;
        @media (max-width: 599px) {
          margin: -10px;
        }
        li {
          width: 50%;
          display: block;
          padding: 25px;
          @media (max-width: 599px) {
            padding: 10px;
          }
          &:nth-child(3),
          &:nth-child(4) {
            transform: translateX(75px);
            @media (max-width: 899px) {
              transform: translate(0);
            }
          }
          &:last-child {
            transform: translateX(230px);
            @media (max-width: 899px) {
              transform: translate(0);
            }
          }
        }
      }
    }
  }
`;

export const BenefitCardWrapper = styled(Box)`
  padding: 32px 40px;
  background: linear-gradient(
    107.52deg,
    rgba(111, 122, 172, 0.136) 0%,
    rgba(45, 50, 70, 0.2) 91.92%
  );
  box-shadow: 0px 4px 50px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 40px;
  min-height: 170px;
  @media (max-width: 599px) {
    padding: 15px 15px;
    border-radius: 15px;
  }
  i {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
  }
  p {
    font-weight: 500;
    font-size: 18px;
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    max-width: 260px;
    @media (max-width: 599px) {
      font-size: 14px;
      max-width: 100%;
    }
  }
`;
