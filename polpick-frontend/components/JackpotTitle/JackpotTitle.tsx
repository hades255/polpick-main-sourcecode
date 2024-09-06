import { JackpotTitleWrapper } from "@/styles/StyledComponents/JackpotTitleWrapper";
import React from "react";

interface JackpotTitleProps {
  children: React.ReactNode;
  gridSplitNumber: number;
}

const JackpotTitle = ({ children, gridSplitNumber }: JackpotTitleProps) => {
  return (
    <JackpotTitleWrapper
      gridSplitNumber={gridSplitNumber}
      direction="row"
      alignItems="center"
      flexWrap="wrap"
    >
      {children}
    </JackpotTitleWrapper>
  );
};

export default JackpotTitle;
