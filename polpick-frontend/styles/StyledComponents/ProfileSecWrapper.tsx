import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const ProfileSecWrapper = styled(Box)`
  .profile_table_sec {
    margin-top: 40px;
  }
  .lft_box {
    height: 100%;
    overflow: hidden;
    padding: 38px 28px;
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 32px;
    position: relative;
    background: linear-gradient(
      130.08deg,
      rgba(40, 44, 70, 0.3) 9.73%,
      rgba(55, 69, 130, 0.3) 95.02%
    );
    &::after {
      content: "";
      position: absolute;
      width: 225px;
      height: 182.7px;
      right: 0;
      top: 0;
      background: ${primaryColors?.color4e86ff};
      opacity: 0.6;
      filter: blur(100px);
      z-index: 1;
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
  .profile_img {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    position: relative;

    @media (max-width: 899px) {
      background: transparent;
      min-height: auto;
      padding: 0;
      border-radius: 0;
      border: 0;
      margin-bottom: 30px;
    }

    .upload_img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      opacity: 0;
      cursor: pointer;
    }

    figure {
      /* margin-right: 20px; */
      width: 99px;
      height: 99px;
      flex-basis: 99px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
      }
      .camera_icon {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 3;
        width: 36px;
        height: 36px;
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
        min-width: auto;
        padding: 5px;
      }
    }
    p {
      font-weight: 700;
      font-size: 36px;
      flex-basis: calc(100% - 99px);
      padding-left: 20px;
      width: calc(100% - 99px);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: -0.01em;

      color: ${primaryColors.textPrimaryColor};

      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      @media (max-width: 1499px) {
        font-size: 26px;
      }
      @media (max-width: 1199px) {
        font-size: 36px;
      }

      @media (max-width: 379px) {
        font-size: 26px;
      }
    }
  }
  .title {
    border-radius: 0 0 0 32px;
    width: 76px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;

    background: linear-gradient(
      130.08deg,
      rgba(40, 44, 70, 0.3) 9.73%,
      rgba(55, 69, 130, 0.3) 95.02%
    );
    border: 1.5px solid rgba(103, 120, 177, 0.2);

    position: absolute;
    right: 0;
    top: -2px;

    h3 {
      font-weight: 700;
      font-size: 36px;
      line-height: 1.5;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      letter-spacing: -0.01em;
      color: ${primaryColors?.color4F80FF};
      i {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .profile_content {
    position: relative;
    overflow: hidden;
    z-index: 1;
    @media (max-width: 599px) {
      padding: 0;
    }

    .details {
      @media (max-width: 599px) {
        justify-content: center;
        border: 0;
        padding-bottom: 0;
      }
      .flag_icon {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 12px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      p {
        font-weight: 700;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
      }
      .edit_icon {
        min-width: auto;
        padding: 0;
        margin-left: 12px;
      }
    }
    .btm_sec {
      display: none;
      padding: 20px 20px;
      border-top: 1px solid #363f6a;

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        letter-spacing: -0.01em;
        color: ${primaryColors?.color4F80FF};
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
        }
      }
    }
    .mdl_sec {
    }
    .upper_sec {
      @media (max-width: 599px) {
        padding: 40px 20px;
        border-bottom: 1px solid ${primaryColors?.color363F6A};
      }
    }
    .each_details {
      display: flex;
      align-items: center;
      margin-top: 17px;

      h6 {
        min-width: 120px;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
        @media (max-width: 1499px) {
          min-width: 80px;
        }
      }
      h4 {
        font-weight: 700;
        font-size: 36px;
        letter-spacing: -0.01em;
        display: flex;
        align-items: center;
        @media (max-width: 599px) {
          font-size: 32px;
        }
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
        }
        &.grn_span {
          color: #34d16a;
          text-shadow: 0px 4px 20px rgba(52, 209, 106, 0.5);
        }
        &.blue_span {
          background: radial-gradient(
              108.83% 100% at 9.2% 0%,
              #6d95ff 0%,
              #326aff 100%
            )
            /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);
        }
      }
    }
  }
  .info_lft {
    margin-right: 28px;
    @media (max-width: 1399px) {
      margin-right: 10px;
    }
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;

      letter-spacing: -0.01em;

      color: ${primaryColors.color8f9bbf};
    }
    h4 {
      font-weight: 700;
      font-size: 36px;
      letter-spacing: -0.01em;
      color: ${primaryColors.textPrimaryColor};
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      @media (max-width: 1699px) {
        font-size: 28px;
      }

      @media (max-width: 1450px) {
        font-size: 24px;
      }

      @media (max-width: 1399px) {
        font-size: 20px;
      }
      @media (max-width: 599px) {
        font-size: 15px;
      }
    }
  }
  .each_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    flex-wrap: wrap;

    .outline_btn_grp {
      display: flex; // test
      gap: 5px; // test
      button {
        display: flex; /* Ensure the button is a flex container */
        align-items: center; /* Center the content vertically */
        justify-content: center; /* Center the content horizontally */
        margin: 6px 0;
        position: relative;
        z-index: 4;
        min-height: 48px;
        padding: 10px;
        position: relative;
        transition: all 0.4s;
        /* min-width: 140px; */
        min-width: 100px; //test

        border-color: ${primaryColors.color326aff};
        &:hover {
          transform: translateY(-2px);
        }
      }
    }
    .outline_btn {
      /* display: flex; // test */
      /* gap: 5px; // test */

      button {
        margin: 6px 0;
        position: relative;
        z-index: 4;
        min-height: 48px;
        padding: 10px;
        position: relative;
        transition: all 0.4s;
        /* min-width: 140px; */
        min-width: 140px; //test

        border-color: ${primaryColors.color326aff};
        @media (max-width: 1399px) {
          min-width: 105px;
        }
        @media (max-width: 1299px) {
          min-width: 75px;
        }
        &:hover {
          transform: translateY(-2px);
        }
        span {
          font-size: 20px;
          font-weight: 700;
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
  }
  .btn_grp {
    margin-top: 50px;
    .MuiGrid-item {
      @media (max-width: 1450px) {
        max-width: 100%;
        flex-basis: 100%;
      }
    }
    button {
      padding: 10px 12px;
      min-height: 48px;
    }
  }
`;
