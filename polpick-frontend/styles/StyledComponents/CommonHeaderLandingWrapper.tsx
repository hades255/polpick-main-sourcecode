import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const CommonHeaderLandingWrapper = styled(Box, {
  shouldForwardProp: (data) =>
    data !== "mainHeaderTextFonTSize" && data !== "customLinheight"
})<{ mainHeaderTextFonTSize?: string; customLinheight?: number }>`
  text-align: center;
  position: relative;
  z-index: 9;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
  top: -40px;
  @media (max-width: 599px) {
    top: -20px;
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
  h2 {
    display: inline-block;
    font-weight: 800;
    font-size: ${({ mainHeaderTextFonTSize }) =>
      `${mainHeaderTextFonTSize || "110px"}`};
    line-height: ${({ customLinheight }) => customLinheight || 1};
    letter-spacing: -0.01em;
    background: linear-gradient(
      90deg,
      #44d8c8 0%,
      #34d16a 34.52%,
      #e78721 63.31%,
      #f9614e 92.8%,
      #e85151 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    @media (max-width: 1699px) {
      font-size: 90px;
    }
    @media (max-width: 1199px) {
      font-size: 60px;
      line-height: 1.2;
    }
    @media (max-width: 599px) {
      font-size: 30px;
    }
  }
`;
