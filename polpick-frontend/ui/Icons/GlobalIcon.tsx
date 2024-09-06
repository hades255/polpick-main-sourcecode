import { CustomIconProps } from "@/interface/icons.interface";

export default function GlobalIcon({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "20"}
      height={IconHeight || "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 10C19 14.9706 14.9706 19 10 19M19 10C19 5.02944 14.9706 1 10 1M19 10H1M10 19C5.02944 19 1 14.9706 1 10M10 19C10 19 14 16 14 10C14 4 10 1 10 1M10 19C10 19 6 16 6 10C6 4 10 1 10 1M1 10C1 5.02944 5.02944 1 10 1"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
