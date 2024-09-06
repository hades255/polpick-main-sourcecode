import { CustomIconProps } from "@/interface/icons.interface";

export default function KingRingIcon({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "23"}
      height={IconHeight || "18"}
      viewBox="0 0 23 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 5L4.5 17H18.5L20.5 5M2.5 5L8 9.5L11.5 4M2.5 5C3.32843 5 4 4.32843 4 3.5C4 2.67157 3.32843 2 2.5 2C1.67157 2 1 2.67157 1 3.5C1 4.32843 1.67157 5 2.5 5ZM20.5 5L15 9.5L11.5 4M20.5 5C21.3284 5 22 4.32843 22 3.5C22 2.67157 21.3284 2 20.5 2C19.6716 2 19 2.67157 19 3.5C19 4.32843 19.6716 5 20.5 5ZM11.5 4C12.3284 4 13 3.32843 13 2.5C13 1.67157 12.3284 1 11.5 1C10.6716 1 10 1.67157 10 2.5C10 3.32843 10.6716 4 11.5 4Z"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
