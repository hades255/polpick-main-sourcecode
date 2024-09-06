import { CustomIconProps } from "@/interface/icons.interface";

export default function DashBoardMenuIcon({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "18"}
      height={IconHeight || "12"}
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H17M1 6H17M1 11H17"
        stroke={IconColor || "#ECF3FF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
