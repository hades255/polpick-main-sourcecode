import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const VideoSecWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  @media (max-width: 899px) {
    margin-top: 0;
  }
  &.video_affiliate {
    @media (max-width: 899px) {
      margin-top: 250px;
      margin-bottom: -200px;
    }
  }
  &::after {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    left: 50%;
    transform: translateX(-150%);
    top: 0;
    background: rgba(52, 209, 106, 0.2);
    filter: blur(150px);
    z-index: -1;
  }
  &::before {
    content: "";
    position: absolute;
    width: 447.58px;
    height: 377.94px;
    right: 50%;
    transform: translateX(150%);
    top: 0;
    background: rgba(220, 46, 44, 0.15);
    filter: blur(175px);
    z-index: -1;
  }
  .ftr_stack {
    margin-top: 70px;
    @media (max-width: 899px) {
      margin-top: 30px;
    }
    h3 {
      /* display: inline-block; */
      font-weight: 500;
      font-size: 24px;
      line-height: 1.5;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${primaryColors?.textPrimaryColor};
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      @media (max-width: 899px) {
        font-size: 16px;
      }
      @media (max-width: 599px) {
        font-size: 12px;
      }
    }
    button {
      min-width: 200px;
      margin-top: 40px;
      @media (max-width: 899px) {
        margin-top: 20px;
      }
    }
  }
  .video_sec {
    padding: 36px 36px;
    background: linear-gradient(
      149.06deg,
      rgba(72, 79, 123, 0.3) 18.74%,
      rgba(47, 94, 63, 0.3) 100%
    );
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 32px;
    margin-top: 80px;
    overflow: hidden;
    position: relative;
    @media (max-width: 899px) {
      margin-top: 50px;
      padding: 20px;
      border-radius: 16px;
    }
    @media (max-width: 599px) {
      margin-top: 30px;
    }
    &::after {
      content: "";
      position: absolute;
      width: 328.08px;
      height: 284.05px;
      left: -30px;
      top: 30px;
      background: ${primaryColors?.color4e86ff};
      filter: blur(150px);
      z-index: 4;
      @media (max-width: 899px) {
        width: 200px;
        height: 200px;
      }
    }
    &::before {
      content: "";
      position: absolute;
      width: 475.81px;
      height: 411.96px;
      right: -37%;
      bottom: -95px;
      background: ${primaryColors?.color34d16a};
      filter: blur(150px);
      z-index: 4;
      @media (max-width: 899px) {
        width: 200px;
        height: 200px;
      }
    }
    .video_sec_inner {
      width: 100%;
      height: 100%;
      border-radius: 32px;
      overflow: hidden;
      position: relative;
      padding-bottom: 45.56%;
      @media (max-width: 899px) {
        border-radius: 16px;
      }
      .play_btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        filter: drop-shadow(0px 4px 30px #97ae6a);
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 2;
      }
      video {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
      }
      &.isActive {
        img {
          opacity: 0;
        }
        .play_btn {
          opacity: 0;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
`;
