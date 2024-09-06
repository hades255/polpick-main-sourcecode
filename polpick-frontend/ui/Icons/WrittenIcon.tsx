import { CustomIconProps } from "@/interface/icons.interface";

export default function WrittenIcon({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "18"}
      height={IconHeight || "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 7L11 11M9 17H17V1H1V9M1 13L10 4L14 8L5 17H1V13Z"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
