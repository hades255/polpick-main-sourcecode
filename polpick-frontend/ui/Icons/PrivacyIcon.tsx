import { CustomIconProps } from "@/interface/icons.interface";

export default function PrivacyIcon({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "16"}
      height={IconHeight || "20"}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9V5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5V9M1 9H15V19H1V9Z"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
