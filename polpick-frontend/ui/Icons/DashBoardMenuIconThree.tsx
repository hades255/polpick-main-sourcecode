import { CustomIconProps } from "@/interface/icons.interface";

export default function DashBoardMenuIconThree({
  IconColor,
  IconHeight,
  IconWidth
}: CustomIconProps) {
  return (
    <svg
      width={IconWidth || "20"}
      height={IconHeight || "20"}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1V7M1 7H7M1 7L3.64033 4.63067C5.02134 3.25209 6.81301 2.35964 8.74537 2.08779C10.6777 1.81593 12.6461 2.17941 14.3539 3.12343C16.0617 4.06746 17.4165 5.54091 18.214 7.32177C19.0115 9.10262 19.2086 11.0944 18.7756 12.997C18.3426 14.8996 17.303 16.61 15.8133 17.8704C14.3237 19.1308 12.4647 19.873 10.5165 19.9851C8.56836 20.0972 6.63652 19.5732 5.01208 18.492C3.38765 17.4108 2.15862 15.831 1.51018 13.9907"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8V11.5L12 13.5"
        stroke={IconColor || "#8F9BBF"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
