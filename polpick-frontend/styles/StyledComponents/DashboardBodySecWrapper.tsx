import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const DashboardBodySecWrapper = styled(Box)``;

export const EachCommonBoxWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "isReverse"
})<{ isReverse?: boolean }>`
  padding: 26px 50px 40px;
  background: ${({ isReverse }) =>
    isReverse
      ? `linear-gradient(130.08deg, rgba(40, 44, 70, 0.3) 9.73%, rgba(109, 75, 24, 0.3) 95.02%)`
      : `linear-gradient(
    130.08deg,
    rgba(40, 44, 70, 0.3) 9.73%,
    rgba(55, 69, 130, 0.3) 95.02%
  );`};
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 32px;
  @media (max-width: 599px) {
    padding: 20px 30px;
  }
  .image_block {
    flex-basis: 140px;
    figure {
      height: 130px;
      /* margin-bottom: 65px; */
      @media (max-width: 599px) {
        margin-bottom: 30px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        transform: scale(1.5);
      }
    }
  }
  .content {
    flex-basis: calc(100% - 140px);
    padding-left: 20px;
    p {
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.01em;
      color: ${primaryColors?.textPrimaryColor};
      margin-bottom: 20px;
    }
    h3 {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      font-weight: 700;
      font-size: 50px;
      line-height: 1;
      letter-spacing: -0.01em;
      /* margin-bottom: 40px; */
      color: ${primaryColors?.white};
      ${({ isReverse }) =>
        !isReverse
          ? `    background: radial-gradient(
        108.83% 100% at 9.2% 0%,
        #61d4eb 0%,
        #326aff 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0px 4px 20px rgba(89, 134, 255, 0.5);`
          : `
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */
    background: radial-gradient(95.83% 95.83% at 16.67% 4.17%, #B06DB0 0%, #FF7424 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0px 4px 20px rgba(255, 116, 36, 0.5);

        `}
      i {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        margin-right: 8px;
        filter: ${({ isReverse }) =>
          !isReverse
            ? "drop-shadow(0px 4px 20px rgba(89, 134, 255, 0.5))"
            : "drop-shadow(0px 4px 20px rgba(255, 116, 36, 0.5))"};
      }
      @media (max-width: 599px) {
        font-size: 60px;
        margin-bottom: 10px;
      }
    }
  }
`;
