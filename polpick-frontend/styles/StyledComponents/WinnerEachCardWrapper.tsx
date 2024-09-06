/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const WinnerEachCardWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "indexNumber"
})<{ indexNumber: number }>`
  margin-top: ${({ indexNumber }) => (indexNumber !== 1 ? "205px" : "0px")};
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  height: 400px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .avatarwrap {
    /* margin-top: 100px;
    margin-right: 74px; */
  }
  @media (max-width: 1499px) {
    margin-top: ${({ indexNumber }) => (indexNumber !== 1 ? "150px" : "0px")};
  }
  @media (max-width: 899px) {
    margin-top: 0px;
  }
  .winner_backdrop_image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    @media (max-width: 899px) {
      top: 50%;
    }
  }
  .winner_frame {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media (max-width: 899px) {
      top: 55%;
    }
  }
  .crown_icon {
    position: absolute;
    top: 95px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    /* margin-bottom: 20px; */
    span {
      font-weight: 600;
      font-size: 13px;
      line-height: 1.5;
      letter-spacing: -0.01em;
      color: ${primaryColors?.color252c4b};
      position: relative;
      z-index: 2;
      margin-bottom: 4px;
    }
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    @media (max-width: 899px) {
      top: 95px;
    }
  }
  .avatar_block {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin-bottom: 20px;
    border: 4px solid;
    .flag_icon {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -15px;
      z-index: 3;
      width: 25px;
      height: 25px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
    &.avatar_block_solid {
      background-color: ${primaryColors?.colorC08855};
      p {
        font-weight: 700;
        font-size: 30px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.textPrimaryColor};
      }
    }
  }
  p {
    font-weight: 500;
    font-size: 13px;
    letter-spacing: -0.01em;
    color: ${({ indexNumber }) =>
      indexNumber === 1
        ? `${primaryColors?.colorFFD912}`
        : indexNumber === 2
        ? `${primaryColors?.colordfdfdf}`
        : indexNumber === 3
        ? `${primaryColors?.colorC08855}`
        : `${primaryColors?.colordfdfdf}`};
  }
  h3 {
    font-weight: 700;
    font-size: 36px;
    /* margin-top: 120px;
    margin-right: 110px; */
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    letter-spacing: -0.01em;
    color: ${({ indexNumber }) =>
      indexNumber === 1
        ? `${primaryColors?.colorFFD912}`
        : indexNumber === 2
        ? `${primaryColors?.colordfdfdf}`
        : indexNumber === 3
        ? `${primaryColors?.colorC08855}`
        : `${primaryColors?.colordfdfdf}`};
    text-shadow: ${({ indexNumber }) =>
      indexNumber === 1
        ? `0px 4px 20px rgba(255, 217, 18, 0.5)`
        : indexNumber === 2
        ? ` 0px 4px 20px rgba(223, 223, 223, 0.5)`
        : indexNumber === 3
        ? `0px 4px 20px rgba(149, 110, 74, 0.5)`
        : `0px 4px 20px rgba(223, 223, 223, 0.5)`};
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 899px) {
      bottom: -20px;
    }
  }
`;
