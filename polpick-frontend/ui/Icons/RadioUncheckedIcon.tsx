import { CustomIconProps } from "@/interface/icons.interface";

const RadioUncheckedIcon = ({ ...props }: CustomIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7C0 3.13401 3.13401 0 7 0H17C20.866 0 24 3.13401 24 7V17C24 20.866 20.866 24 17 24H7C3.13401 24 0 20.866 0 17V7Z"
        fill="#282C46"
        fillOpacity="0.3"
      />
      <path
        d="M7 0.75H17C20.4518 0.75 23.25 3.54822 23.25 7V17C23.25 20.4518 20.4518 23.25 17 23.25H7C3.54822 23.25 0.75 20.4518 0.75 17V7C0.75 3.54822 3.54822 0.75 7 0.75Z"
        stroke={props?.IconColor || "#6778B1"}
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default RadioUncheckedIcon;
