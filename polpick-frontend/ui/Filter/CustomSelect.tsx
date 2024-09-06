/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/destructuring-assignment */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { IconButton, MenuItem } from "@mui/material";
import Select, {
  OutlinedSelectProps,
  SelectChangeEvent,
  SelectProps
} from "@mui/material/Select";
import { useState } from "react";
import DropDownIcon from "../Icons/DropdownIcon";

const CustomSelectWrapper = styled(Select)`
  &.MuiOutlinedInput-root {
    background-color: ${primaryColors.white};
    padding: 10px 12.5px;
    width: 100%;
    border-radius: 8px;
    /* border: 1px solid ${primaryColors.borderprimary}; */
    min-width: 130px;

    .MuiSelect-select {
      padding: 0;
      /* padding-right: 40px; */
      color: ${primaryColors.black};
      font-size: 16px;
      font-weight: 500;
      text-align: left;
    }
    fieldset {
      border: 1px solid ${primaryColors.borderprimary};
    }
    .MuiSelect-icon {
      padding: 0;
      line-height: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .menu_item {
    &.MuiMenuItem-root {
      color: ${primaryColors.black};
    }
  }
`;
interface CustomSelectProps extends OutlinedSelectProps {
  initialValue?: string;
}
const CustomSelect: React.FC<CustomSelectProps & SelectProps> = ({
  initialValue,
  ...props
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        width: "auto"
        // backgroundColor:"#000"
      }
    }
  };

  const [value, setValue] = useState("");

  const handelChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value);
  };

  return (
    <CustomSelectWrapper
      displayEmpty
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
      value={value}
      onChange={handelChange as any}
      IconComponent={(props) => {
        return (
          <IconButton {...props}>
            <DropDownIcon
              IconColor={primaryColors?.color8f9bbf}
              IconWidth="18"
              IconHeight="14"
            />
          </IconButton>
        );
      }}
      {...props}
    >
      {initialValue ? (
        <MenuItem value="" sx={{ display: "none" }}>
          {initialValue}
        </MenuItem>
      ) : null}
      {props.children}
    </CustomSelectWrapper>
  );
};

export default CustomSelect;
