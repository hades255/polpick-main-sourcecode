import { CustomIconProps } from "@/interface/icons.interface";

export default function DashBoardMenuIconOne({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "20"}
      height={IconHeight || "20"}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18H14M10 18V14M10 14C7.23858 14 5 11.7614 5 9V1H15V9C15 11.7614 12.7614 14 10 14ZM15 3H16.5C17.8807 3 19 4.11929 19 5.5C19 6.88071 17.8807 8 16.5 8H15M5 8H3.5C2.11929 8 1 6.88071 1 5.5C1 4.11929 2.11929 3 3.5 3L5 3"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    
  );
}
