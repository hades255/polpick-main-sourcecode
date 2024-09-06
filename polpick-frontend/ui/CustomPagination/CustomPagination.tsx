import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
import { Pagination, PaginationProps, styled } from "@mui/material";
import React from "react";

const CustomPaginationWrapper = styled(Pagination)`
  margin-top: 80px;
  @media (max-width: 899px) {
    margin-top: 30px;
  }
  .MuiPagination-ul {
    justify-content: center;
    li {
      button {
        font-weight: 600;
        font-size: 13px;
        line-height: 12px;
        letter-spacing: -0.01em;
        color: ${primaryColors?.color8f9bbf};
        padding: 0;
        margin: 0;
        border-radius: 10px;
        &:hover,
        &.Mui-selected {
          background: url(${assest?.feature_btn_bg}) no-repeat center;
          background-size: 100% 100%;
          box-shadow: 0px 4px 50px rgba(84, 130, 248, 0.3);
          color: ${primaryColors?.textPrimaryColor};
        }
      }
    }
  }
`;

const CustomPagination: React.FC<PaginationProps> = ({ ...props }) => {
  return <CustomPaginationWrapper count={10} {...props} />;
};

export default CustomPagination;
