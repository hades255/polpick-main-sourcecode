import { CustomIconProps } from "@/interface/icons.interface";

export default function DashBoardMenuIconTwo({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "20"}
      height={IconHeight || "20"}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 11V21H3V11"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 6H1V11H21V6Z"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 21V6"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 6H15.5C16.163 6 16.7989 5.73661 17.2678 5.26777C17.7366 4.79893 18 4.16304 18 3.5C18 2.83696 17.7366 2.20107 17.2678 1.73223C16.7989 1.26339 16.163 1 15.5 1C12 1 11 6 11 6Z"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 6H6.5C5.83696 6 5.20107 5.73661 4.73223 5.26777C4.26339 4.79893 4 4.16304 4 3.5C4 2.83696 4.26339 2.20107 4.73223 1.73223C5.20107 1.26339 5.83696 1 6.5 1C10 1 11 6 11 6Z"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
