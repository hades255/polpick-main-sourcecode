import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const TrendSecWrapper = styled(Box)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  max-width: 625px;
  margin: 20px auto 18px;
  z-index: 1;
  /* &::after {
    content: "";
    left: -1px;
    right: -1px;
    top: -1px;
    bottom: -1px;
  
    background: linear-gradient(
      135deg,
      rgba(143, 155, 191, 0.59) 0%,
      rgba(143, 155, 191, 0.59) 1%,
      rgba(143, 155, 191, 0.15) 100%
    ); 
    border-radius: 8px;
    position: absolute;
    z-index: -1;
  } */
  @media (max-width: 1699px) {
    margin: 20px auto 18px;
  }
  /* @media (max-width: 1499px) {
    margin: 70px auto 18px;
  } */

  .trends_inner {
    padding: 8px 16px;
    border-radius: 8px;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#8f9bbf+42,8f9bbf+76&0.08+42,0+76 */
    background: linear-gradient(
      135deg,
      rgba(143, 155, 191, 0.08) 42%,
      rgba(143, 155, 191, 0) 76%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    /* box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.07); */
    box-shadow: 2px 1px 0 rgb(143 155 191 / 15%),
      -1px -1px 2px rgb(143 155 191 / 59%), 1px 1px 1px rgb(143 155 191 / 0%);
    backdrop-filter: blur(15px);
    position: relative;
    z-index: 2;
    @media (max-width: 899px) {
      max-width: 300px;
      margin: 0 auto;
      padding: 8px 8px;
    }
  }
  .trends_otr {
    padding: 1px;
  }
  .trend_stack {
    margin: 0 -20px;
    @media (max-width: 899px) {
      margin: 0 -8px;
    }
  }
  .each_block {
    display: flex;
    align-items: center;
    padding: 0 20px;
    position: relative;
    @media (max-width: 899px) {
      padding: 0 8px;
    }
    &:first-child {
      &::after {
        content: "";
        width: 1px;
        height: 8px;
        background-color: ${primaryColors?.color39415F};
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }
    }
    h6 {
      font-weight: 600;
      font-size: 12px;
      letter-spacing: -0.01em;
      color: ${primaryColors?.color8f9bbf};
      margin-right: 5px;
      @media (max-width: 899px) {
        font-size: 9px;
      }
    }
    p {
      font-weight: 600;
      font-size: 12px;
      letter-spacing: -0.01em;
      @media (max-width: 899px) {
        font-size: 9px;
      }
    }
  }
  .list_block {
    ul {
      display: flex;
      align-items: center;
      li {
        width: auto;
        &:not(:last-child) {
          margin-right: 8px;
        }
        @media (max-width: 899px) {
          display: none;
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            display: flex;
          }
        }
      }
    }
  }
`;
