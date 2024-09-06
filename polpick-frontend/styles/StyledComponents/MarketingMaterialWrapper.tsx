import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Box, Stack, styled } from "@mui/material";

export const MarketingMaterialWrapper = styled(Box)``;

export const MarketingCardWrapper = styled(Stack)`
  padding: 24px 16px 24px 24px;
  background: linear-gradient(
    130.08deg,
    rgba(40, 44, 70, 0.3) 9.73%,
    rgba(55, 69, 130, 0.3) 95.02%
  );
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 32px;
  .card_fig {
    width: 142px;
    flex-basis: 142px;
    figure {
      width: 100%;
      height: 142px;
      border-radius: 20px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .card_list {
    width: calc(100% - (142px + 40px));
    flex-basis: calc(100% - (142px + 40px));
    padding: 0 20px;
    ul {
      li {
        justify-content: space-between;
        margin-bottom: 10px;
        :last-child {
          margin-bottom: 0;
        }
        p {
          font-weight: 600;
          font-size: 13px;
          letter-spacing: -0.01em;
          color: ${primaryColors?.color8f9bbf};
          &:last-child {
            color: ${primaryColors?.textPrimaryColor};
            @media (max-width: 1599px) {
              width: 50px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            @media (max-width: 899px) {
              width: 80px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          &:first-child {
            @media (max-width: 599px) {
              display: none;
            }
          }
        }
      }
    }
  }
  .feature_list {
    flex-basis: 40px;
    width: 40px;
    li {
      margin-bottom: 15px;
      :last-child {
        margin-bottom: 0;
      }
      button {
        width: 40px;
        height: 40px;
        background: url(${assest?.feature_btn_bg}) no-repeat center;
        background-size: 100% 100%;
        box-shadow: 0px 4px 50px rgba(84, 130, 248, 0.3);
        border-radius: 16px;
        min-width: auto;
        padding: 0;
        .MuiButton-icon {
          margin: 0;
        }
      }
    }
  }
`;
