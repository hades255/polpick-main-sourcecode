/* eslint-disable no-nested-ternary */
import { primaryColors } from "@/themes/_muiPalette";
import { Box, styled } from "@mui/material";

export const EachTierBlockWrapper = styled(Box, {
  shouldForwardProp: (data) => data !== "themeColors"
})<{ themeColors: "green" | "red" | "yellow" }>`
  padding: 36px 36px;
  border: 1.5px solid rgba(103, 120, 177, 0.2);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  background: ${({ themeColors }) =>
    themeColors === "green"
      ? `linear-gradient(
    149.06deg,
    rgba(72, 79, 123, 0.3) 18.74%,
    rgba(47, 94, 63, 0.3) 100%
  )`
      : themeColors === "red"
      ? `linear-gradient(149.06deg, rgba(72, 79, 123, 0.3) 18.74%, rgba(107, 42, 42, 0.3) 100%)`
      : themeColors === "yellow"
      ? `linear-gradient(149.06deg, rgba(72, 79, 123, 0.3) 18.74%, rgba(89, 79, 30, 0.3) 100%)`
      : ``};

  .tag_chip {
    position: absolute;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0px;
    top: 0px;
    border-radius: 0 0 0 30px;
    background: ${({ themeColors }) =>
      themeColors === "green"
        ? "rgba(52, 209, 106, 0.2)"
        : themeColors === "red"
        ? "rgba(232, 81, 81, 0.2)"
        : themeColors === "yellow"
        ? "rgba(255, 216, 18, 0.2)"
        : ""};
    font-weight: 800;
    font-size: 40px;
    line-height: 1;
    letter-spacing: -0.01em;
    color: ${primaryColors?.textPrimaryColor};
  }
  h4 {
    font-weight: 800;
    font-size: 22px;
    letter-spacing: -0.01em;
    color: ${primaryColors?.textPrimaryColor};
    margin-bottom: 25px;
  }
  ul {
    li {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      i {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tier_list_content {
        padding-left: 18px;
        h3 {
          font-weight: 700;
          font-size: 40px;
          line-height: 1;
          letter-spacing: -0.01em;
          margin-bottom: 5px;
          color: ${({ themeColors }) =>
            themeColors === "green"
              ? `${primaryColors?.color34d16a}`
              : themeColors === "red"
              ? `${primaryColors?.colorE85151}`
              : themeColors === "yellow"
              ? `${primaryColors?.colorFFD912}`
              : ``};
          text-shadow: ${({ themeColors }) =>
            themeColors === "green"
              ? `0px 4px 20px rgba(52, 209, 106, 0.5)`
              : themeColors === "red"
              ? `0px 4px 20px rgba(232, 81, 81, 0.5)`
              : themeColors === "yellow"
              ? `0px 4px 20px rgba(255, 217, 18, 0.5)`
              : ``};
        }
        p {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.01em;
          color: ${primaryColors?.textPrimaryColor};
        }
      }
    }
  }
`;
