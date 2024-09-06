/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const WinningPoolCardWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "result"
})<{ result: "win" | "lose" | "draw" | "no_win" }>`
  background: ${primaryColors?.primary};
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.05);
  border-radius: 32px;
  position: relative;
  animation: slideup linear 1s;
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
  @keyframes slideup {
    0% {
      transform: translateY(1000px);
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 899px) {
    background: rgba(53, 64, 114, 0.2);
    border-radius: 16px;
  }
  .success_pool_coins_image {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 2;
  }
  .success_pool_coins_image2 {
    position: absolute;
    left: -30px;
    top: 30px;
    z-index: 2;
  }
  .inner_wrapper {
    position: relative;
    z-index: 3;
    overflow: hidden;
    border-radius: 32px;
    @media (max-width: 899px) {
      border-radius: 0 0 16px 16px;
    }
    &::before {
      content: "";
      position: absolute;
      width: 121.43px;
      height: 120px;
      left: 50%;
      transform: translateX(-40%) matrix(1, 0.07, 0.07, -1, 0, 0);
      bottom: 50px;
      background: ${({ result }) =>
        result === "win" ? "#34d16a" : result === "lose" ? "#E85151" : ""};
      opacity: 0.7;
      filter: blur(100px);
      z-index: 1;
      @media (max-width: 899px) {
        left: 0;
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 191.65px;
      height: 189.4px;
      right: -50px;
      top: -50px;
      background: ${({ result }) =>
        result === "win" ? "#34d16a" : result === "lose" ? "#E85151" : ""};
      opacity: 0.2;
      filter: blur(50px);
      transform: matrix(1, 0.07, 0.07, -1, 0, 0);
      z-index: 1;
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
  .pool_card_content {
    padding: 26px 50px 50px;
    text-align: center;
    position: relative;
    z-index: 4;
    @media (max-width: 899px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 150px;
    }
    h5 {
      font-weight: 800;
      font-size: 22px;
      line-height: 1;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      margin-bottom: 80px;
      @media (max-width: 899px) {
        display: none;
      }
    }
    h4 {
      font-weight: 700;
      font-size: 60px;
      line-height: 1.1;
      letter-spacing: -0.01em;
      color: ${({ result }) =>
        result === "no_win"
          ? `#ffff`
          : result === "win"
          ? `#28c45d`
          : result === "lose"
          ? `#E85151`
          : result === "draw"
          ? `#5679ff`
          : ``};
      @media (max-width: 899px) {
        font-size: 30px;
      }
    }
  }
  .btn_stack {
    position: relative;
    z-index: 4;
    height: 51px;
    background: ${({ result }) =>
      result === "win"
        ? `rgba(52, 209, 106, 0.2)`
        : result === "lose"
        ? `rgba(232, 81, 81, 0.2)`
        : `radial-gradient(95.83% 95.83% at 16.67% 4.17%, #769BFF 0%, #326AFF 100%)`};
    min-width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 0 0 16px 16px;
    color: ${({ result }) =>
      result === "win" ? `#28c45d` : result === "lose" ? `#E85151` : ``};
    font-size: 14px;
    font-weight: 600;
    /* button {
      min-width: 100%;
      color: ${({ result }) =>
      result === "win" ? `#28c45d` : result === "lose" ? `#E85151` : ``};
      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
    } */
  }
  .upper_stack {
    position: relative;
    z-index: 4;
    height: 26px;
    /* display: flex; */
    justify-content: center;
    align-items: center;
    background: ${({ result }) =>
      result === "win"
        ? `rgba(52, 209, 106, 0.2)`
        : result === "lose"
        ? `rgba(232, 81, 81, 0.2)`
        : `radial-gradient(95.83% 95.83% at 16.67% 4.17%, #769BFF 0%, #326AFF 100%)`};
    min-width: 100%;
    border-radius: 16px 16px 0 0;
    color: ${({ result }) =>
      result === "win" ? `#28c45d` : result === "lose" ? `#E85151` : ``};

    /* button {
      min-width: 100%;
      border-radius: 16px 16px 0 0;
      color: ${({ result }) =>
      result === "win" ? `#28c45d` : result === "lose" ? `#E85151` : ``};
      i {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
    } */
  }
`;
