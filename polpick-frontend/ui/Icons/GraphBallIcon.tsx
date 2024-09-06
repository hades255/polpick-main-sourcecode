import React, { HTMLAttributes } from "react";

export interface MarkerProps {
  size?: number;
  /** The width of the marker viewport */
  markerWidth?: string | number;
  /** The height of the marker viewport */
  markerHeight?: string | number;
}

const GraphBallIcon: React.FC<MarkerProps & HTMLAttributes<SVGElement>> = ({
  id,
  size,
  ...restProps
}) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <circle cx="7" cy="7" r="7" fill="#5D89FF" />
      <circle cx="7" cy="7" r="3" fill="white" />
    </svg>
  );
};

export default GraphBallIcon;
