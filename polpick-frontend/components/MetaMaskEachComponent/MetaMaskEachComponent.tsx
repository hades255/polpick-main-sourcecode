import { MetaMaskEachComponentWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import { BoxProps, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export interface MetaMaskProps {
  icon: string;
  description: string;
  id: string;
  name: string;
}
const MetaMaskEachComponent: React.FC<MetaMaskProps & BoxProps> = ({
  icon,
  description,
  ...props
}) => {
  return (
    <MetaMaskEachComponentWrapper {...props}>
      <i>
        <Image src={icon} alt="icon" width={30} height={30} />
      </i>
      <Typography>{description}</Typography>
    </MetaMaskEachComponentWrapper>
  );
};

export default MetaMaskEachComponent;
