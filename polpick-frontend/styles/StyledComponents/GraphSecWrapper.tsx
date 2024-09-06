import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const GraphSecWrapper = styled(Box)`
  .line_wrapper {
    height: 225px;
    position: relative;
    @media (min-width: 1921px) {
      height: 25vh;
    }
    /* @media (max-width: 1699px) {
      height: 175px;
    } */
    @media (max-width: 899px) {
      margin: 0 -30px;
      margin-top: 20px;
      height: 250px;
    }
    @media (max-width: 599px) {
      margin: 0 -12px;
      margin-top: 10px;
    }
    @media (max-width: 379px) {
      margin: 0 -6px;
      margin-top: 20px;
    }
    .updowntrad {
      text-align: center;
      margin-bottom: -26px;
      @media (max-width: 599px) {
        margin-top: -10px;
        margin-bottom: 0;
      }
      /* @media (max-width: 379px) {
        margin-bottom: 0;
      } */
      h2 {
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
        margin-bottom: 20px;

        @media (max-width: 599px) {
          font-size: 15px;
        }
        &.no_bet {
          color: ${primaryColors?.colorfdde41};
          text-shadow: 0px 4px 20px rgba(253, 222, 65, 0.5);
        }

        span {
          font-weight: 700;
          font-size: 100%;
          letter-spacing: -0.01em;
          background: radial-gradient(
            95.83% 95.83% at 16.67% 4.17%,
            #769bff 0%,
            #326aff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);
        }
      }
    }
    .graph_line_left {
      height: 235px;
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 99;
      @media (min-width: 1921px) {
        height: 25vh;
      }
      @media (max-width: 1699px) {
        height: 185px;
      }
      @media (max-width: 599px) {
        left: -10px;
      }
      @media (max-width: 379px) {
        height: 200px;
      }

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        &.flag_icon {
          transform: translateX(8px);
        }
      }
      .MuiChip-root {
        font-weight: 700;
        font-size: 16px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.color8f9bbf};
        background: linear-gradient(
          156.26deg,
          rgba(143, 155, 191, 0.08) 12.61%,
          rgba(143, 155, 191, 0) 87.31%
        );
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07);
        backdrop-filter: blur(7.5px);
        border-radius: 8px;
        @media (min-width: 1921px) {
          height: 2vw;
          font-size: 1vw;
        }
        @media (max-width: 899px) {
          position: relative;
          left: 51px;
        }
        @media (max-width: 599px) {
          font-size: 14px;
          left: 46px;
        }
      }
      &::after {
        content: "";
        width: 1.5px;
        height: 87%;
        background-color: ${primaryColors?.color3c456c};
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        z-index: -1;
      }
    }

    .graph_line_rgt {
      height: 235px;
      position: absolute;
      right: 130px;
      bottom: 20px;
      z-index: 99;
      @media (min-width: 1921px) {
        height: 25vh;
      }
      @media (max-width: 1699px) {
        height: 185px;
      }
      @media (max-width: 1299px) {
        right: 70px;
      }
      @media (max-width: 599px) {
        right: 40px;
      }
      @media (max-width: 379px) {
        height: 200px;
      }
      i {
        display: flex;
        align-items: center;
        justify-content: center;
        &.flag_icon {
          transform: translateX(8px);
        }
      }

      &::after {
        content: "";
        width: 1.5px;
        height: 87%;
        background-color: ${primaryColors?.color3c456c};
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        z-index: -1;
      }
    }
  }
  h1 {
    font-weight: 700;
    font-size: 25px;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${primaryColors?.textPrimaryColor};
    text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    margin-bottom: 0;
    margin-top: 15px;
    &.popup_animated {
      animation: zoomin 400ms forwards;
      transition: ease-in-out all 400ms;
    }
    &.no_bet {
      color: ${primaryColors?.textPrimaryColor};
      color: ${primaryColors?.colorfdde41};
      text-shadow: 0px 4px 20px rgba(253, 222, 65, 0.5);
      animation: zoomin 400ms forwards;
      transition: ease-in-out all 400ms;
    }
    span {
      background: radial-gradient(
          95.83% 95.83% at 16.67% 4.17%,
          #769bff 0%,
          #326aff 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;

      text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);
    }
    @media (min-width: 1921px) {
      font-size: 2vw;
      margin-top: 1vw;
    }
  }

  .graph_info_sec {
    max-width: 790px;
    margin: 0 auto;
    position: relative;
    z-index: 99;
    @media (min-width: 1921px) {
      max-width: 60vw;
    }
    @media (max-width: 899px) {
      margin: 0;
      max-width: 100%;
    }
    h2 {
      font-weight: 700;
      font-size: 35px;
      line-height: 1.1;
      letter-spacing: -0.01em;
      @media (min-width: 1921px) {
        font-size: 4vw;
      }
      @media (max-width: 899px) {
        font-size: 30px;
      }
      @media (max-width: 599px) {
        font-size: 24px;
      }
      &.grn_txt {
        color: ${primaryColors?.color28C45D};
        span {
          color: ${primaryColors?.color28C45D};
          @media (max-width: 599px) {
            margin-right: 8px;
          }
        }
      }
      &.red_txt {
        color: ${primaryColors?.colorE85151};
        span {
          color: ${primaryColors?.colorE85151};
          @media (max-width: 599px) {
            margin-right: 8px;
          }
        }
      }
      span {
        font-weight: 600;
        font-size: 20px;
      }
    }

    .currencySelect {
      display: none;
      @media (max-width: 899px) {
        display: block;
        width: calc(100% - 60%) !important;
        flex-basis: calc(100% - 60%) !important;
      }
    }

    .graph_info_secLf,
    .graph_info_secRt {
      @media (max-width: 899px) {
        flex-basis: 30%;
        max-width: 30%;
      }
    }
    .graph_info_secRt {
      @media (max-width: 899px) {
        text-align: right;
      }
    }

    .currencySelect {
      position: relative;
      .new_chip {
        background: url(${assest?.chip_bg}) no-repeat center;
        background-size: 100% 100%;
        width: 50px;
        height: 25px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 11px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        position: absolute;
        left: 15px;
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
      @media (max-width: 899px) {
        flex-basis: 40%;
        max-width: 40%;
        text-align: right;
      }
      .MuiInputBase-root {
        @media (max-width: 899px) {
          width: calc(100% - 50px);
        }
        .MuiSelect-select {
          @media (max-width: 899px) {
            border: 1.5px solid rgba(103, 120, 177, 0.24);
            backdrop-filter: blur(16px);
            border-radius: 8px;
            display: flex;
            align-items: center;
            padding: 8px 20px;
            padding-right: 30px;
            font-weight: 600;
            font-size: 13px;
            background: url("/assets/images/selectIconArw.svg") no-repeat right
              8px center;
            letter-spacing: -0.01em;
            color: ${primaryColors?.textPrimaryColor};
          }
          @media (max-width: 599px) {
            font-size: 11px;
            /* padding: 2px 25px 2px 60px; */
          }
          svg {
            @media (max-width: 899px) {
              margin-right: 7px;
            }
            @media (max-width: 599px) {
              height: auto;
              width: 11px;
            }
          }
          .bitcoin_block {
            .select_chip,
            .MuiGrid-root {
              display: none;
            }
            .bitcoin_block_stack_head_left {
              svg {
                display: none;
              }
              p {
                font-weight: 600;
                font-size: 11px;
                line-height: 1.7;
              }
            }
          }
        }

        .MuiSelect-nativeInput,
        .MuiSvgIcon-root,
        .MuiOutlinedInput-notchedOutline {
          @media (max-width: 899px) {
            display: none;
          }
        }
      }
    }
  }
  .winnerblock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px auto 0;
    background: linear-gradient(
      160.25deg,
      rgba(237, 179, 17, 0.06) 12.96%,
      rgba(252, 134, 35, 0.23) 90.25%
    );
    box-shadow: 0px 4px 50px rgba(241, 195, 33, 0.3),
      inset 0px 4px 60px rgba(241, 195, 9, 0.2);
    backdrop-filter: blur(2px);
    width: fit-content;
    position: relative;
    padding: 7px 20px;
    background-clip: padding-box;
    border-radius: 20px;
    min-width: 282px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border-radius: 20px; /* Same border-radius as the element */
      padding: 2px; /* Adjust padding to match border width */
      background: linear-gradient(173.32deg, #efc54e 4.03%, #fc8523 94.78%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    .glow_heading {
      background: radial-gradient(
        95.83% 95.83% at 16.67% 4.17%,
        #f0c21d 0%,
        #ff7424 100%
      );
      margin-bottom: 0 !important;
      font-size: 18px !important;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      @media (max-width: 599px) {
        font-size: 13px !important;
      }
    }
    .userblock {
      display: flex;
      align-items: center;
      padding: 0 40px 0 20px;
      @media (max-width: 479px) {
        padding: 0 10px;
      }
      h2 {
        margin: 0 10px 0 14px;
        font-size: 18px;
        color: ${primaryColors.textPrimaryColor};
        line-height: 1;
        @media (max-width: 599px) {
          font-size: 13px !important;
          margin: 0 8px;
        }
      }
      p {
        color: ${primaryColors.textPrimaryColor};
        line-height: 1;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .amountblock {
      display: flex;
      align-items: center;
      svg {
        flex-shrink: 0;
        filter: drop-shadow(0px 4px 20px rgba(255, 116, 36, 0.5));
      }
      h2 {
        margin-left: 7px;
      }
    }
  }
  .bitSecndMdfy {
    @media (max-width: 899px) {
      display: flex;
      flex-wrap: wrap;
      /* align-items: center; */
      margin-top: 10px;
      min-height: 150px;
    }
    @media (max-width: 599px) {
      min-height: 90px;
    }
    .bitSecndMdfy_lft {
      flex-basis: 32.5%;
      max-width: 32.5%;
      text-align: left;
      @media (max-width: 379px) {
        flex-basis: 34%;
        max-width: 34%;
      }
    }
    .bitSecndMdfy_Mdl {
      flex-basis: 35%;
      max-width: 35%;
      text-align: center;
      padding: 0 10px;
      @media (max-width: 379px) {
        padding: 0 5px;
        flex-basis: 32%;
        max-width: 32%;
      }
      .graph_info_sec {
        margin: 0 auto;
        .time_block {
          display: flex;
          justify-content: center;
          margin: 0 auto;
        }
      }
    }
    .bitSecndMdfy_rtt {
      flex-basis: 30%;
      max-width: 30%;
      text-align: right;
      ul {
      }
      @media (max-width: 379px) {
        flex-basis: 34%;
        max-width: 34%;
      }
    }
  }

  .innerBoxAvtrs {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    margin-bottom: -10px;
    @media (max-width: 599px) {
      margin: 0 -2px;
      margin-bottom: -4px;
    }
    li {
      padding: 0 5px;
      margin: 0;
      margin-bottom: 10px;
      width: 20%;
      flex-basis: 20%;
      text-align: center;
      @media (max-width: 599px) {
        padding: 0 2px;
        margin-bottom: 4px;
      }
      .iconsecImg {
        width: 30px;
        height: 30px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        @media (max-width: 599px) {
          width: 20px;
          height: 20px;
          min-width: 20px;
        }
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  @keyframes customFadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  [data-aos="custom-fade-up"] {
    opacity: 0;
    transform: translateY(20px);
  }

  [data-aos="custom-fade-up"].aos-animate {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  @keyframes zoomin {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  .player_extra {
    span {
      font-size: 9px;
      font-weight: 600;
      color: #ecf3ff;
      line-height: 1;
      padding-top: 2px;
    }
  }
`;
