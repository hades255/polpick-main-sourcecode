/* eslint-disable no-use-before-define */
import {
  Box,
  CircularProgress,
  CircularProgressProps,
  styled
} from "@mui/material";
import React, { useEffect, useRef } from "react";

const HeaderSmallProgressWrapper = styled(Box)`
  position: relative;
  width: 23px;
  height: 23px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  .graph_score_progress_small {
    position: absolute;
    left: 0;
    top: 0;
    width: 100% !important;
    height: 100% !important;
    z-index: 9;
    svg {
      circle {
        stroke-linecap: round;
      }
    }
    &.max_index {
      z-index: 10;
    }
  }
`;

interface SmallProgressProps extends CircularProgressProps {
  icon: React.ReactNode;
  stopColor1: string;
  stopColor2: string;
  knobColor: string;
  indexValue: number;
}

const HeaderSmallProgress = ({
  icon,
  stopColor1,
  stopColor2,
  knobColor,
  indexValue,
  ...others
}: SmallProgressProps) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const radius = 45;
  const setKnobPosition = (angle: number) => {
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    if (knobRef.current) {
      if (x >= 50) {
        knobRef.current.style.left = `${x - 10}%`;
        knobRef.current.style.top = `${y - 10}%`;
      } else {
        knobRef.current.style.left = `${x - 7}%`;
        knobRef.current.style.top = `${y - 5}%`;
      }
    }
  };
  useEffect(() => {
    if (others.value) {
      const initialAngle = (others.value / 100) * 2 * Math.PI - Math.PI * 2.5;
      setKnobPosition(initialAngle);
    }
  }, [others.value]);

  return (
    <HeaderSmallProgressWrapper>
      {icon}

      <svg width={0} height={0}>
        <defs>
          <linearGradient
            id={`my_gradient_header_cirle${indexValue}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={stopColor1} />
            <stop offset="100%" stopColor={stopColor2} />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        thickness={2}
        variant="determinate"
        sx={{
          "svg circle": {
            stroke: `url(#my_gradient_header_cirle${indexValue})`
          }
        }}
        className="graph_score_progress_small max_index"
        {...others}
      />
      {others.value !== undefined
        ? others.value > 0 && <Knob knobColor={knobColor} ref={knobRef} />
        : null}

      <CircularProgress
        value={100}
        variant="determinate"
        thickness={2}
        sx={{
          "svg circle": {
            stroke: "rgba(103, 120, 177, 0.25)"
          }
        }}
        className="graph_score_progress_small"
      />
    </HeaderSmallProgressWrapper>
  );
};

export default HeaderSmallProgress;

const Knob = styled(Box, {
  shouldForwardProp: (data) => data !== "knobColor"
})<{ knobColor: string }>`
  position: absolute;
  width: 4px;
  height: 4px;
  /* transform: translate(-20%, -50%); */
  background-color: ${({ knobColor }) => `${knobColor}`};
  border-radius: 50%;
  cursor: pointer;
  z-index: 11;
`;
