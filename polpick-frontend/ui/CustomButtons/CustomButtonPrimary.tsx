import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Button, { ButtonProps } from "@mui/material/Button";

const CustomButtonWrapper = styled(Button)`
  display: flex;
  padding: 17px 25px;
  border-radius: 16px;
  min-width: auto;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${primaryColors?.textPrimaryColor};
  .MuiButton-startIcon {
    margin: 0 12px 0 0;
  }
  &.Mui-disabled {
    /* background-color: ${primaryColors?.disabledBg}; */
    border: 1px solid ${primaryColors?.disabledBg};

    p {
      color: ${primaryColors?.white};
    }
    img {
      filter: contrast(0);
    }
  }
  &.smallButton {
    padding: 4px 16px;
    width: auto;
  }

  &.MuiButton-outlinedInfo {
    color: ${primaryColors?.black};
  }

  /* img {
    width: 24px;
  } */
`;

interface CustomButtonprops extends ButtonProps {
  buttonType?: "small" | "large";
}

const CustomButtonPrimary = ({ buttonType, ...others }: CustomButtonprops) => {
  return (
    <CustomButtonWrapper
      className={`${buttonType === "small" && "smallButton"} ${
        others?.className || ""
      }`}
      {...others}
    >
      {others?.children}
    </CustomButtonWrapper>
  );
};

export default CustomButtonPrimary;
