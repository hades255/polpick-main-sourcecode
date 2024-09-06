import { CustomIconProps } from "@/interface/icons.interface";

const StockDownIcon = ({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) => {
  return (
    <svg
      width={IconWidth || "20"}
      height={IconHeight || "12"}
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 11L11 3L7 7L1 1M19 11H13M19 11V5"
        stroke={IconColor || "#E85151"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default StockDownIcon;
