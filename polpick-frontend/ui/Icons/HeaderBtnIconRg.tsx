import React, { HTMLAttributes } from "react";

const HeaderBtnIconRg: React.FC<HTMLAttributes<SVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      width="22"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 13.32H1V10.24C1 10.24 3.64 9.80172 3.64 7.16C3.64 4.51828 1 4.08 1 4.08V1H21C21 1 21 2.87718 21 4.08C21 4.08 18.36 4.51828 18.36 7.16C18.36 9.80172 21 10.24 21 10.24V13.32Z"
        stroke="currentcolor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9999 3.6416L11.9516 5.66903L14.0799 5.99613L12.5399 7.57338L12.9034 9.8016L10.9999 8.74903L9.09648 9.8016L9.45992 7.57338L7.91992 5.99613L10.0482 5.66903L10.9999 3.6416Z"
        stroke="currentcolor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeaderBtnIconRg;
