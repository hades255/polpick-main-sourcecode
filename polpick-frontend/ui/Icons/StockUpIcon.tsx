import { CustomIconProps } from "@/interface/icons.interface";

const StockUpIcon = ({ IconColor, IconHeight, IconWidth }: CustomIconProps) => {
  return (
    <svg
      width={IconWidth || "20"}
      height={IconHeight || "12"}
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 1L11 9L7 5L1 11M19 1H13M19 1V7"
        stroke={IconColor || "#34D16A"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StockUpIcon;
