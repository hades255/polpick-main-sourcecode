import HeaderSmallProgress from "@/components/HeaderSmallProgress/HeaderSmallProgress";
import HeaderSmallIcon1 from "@/ui/Icons/HeaderSmallIcon1";
import HeaderSmallIcon2 from "@/ui/Icons/HeaderSmallIcon2";
import HeaderSmallIcon3 from "@/ui/Icons/HeaderSmallIcon3";
import React from "react";

export type IHeaderListType = {
  eachChild: React.ReactNode;
  compleTionRate: number;
  color?: string;
  name?: string;
  prizeCount?: number;
  _id: string;
};

export const headerCompletionList: IHeaderListType[] = [
  {
    eachChild: (
      <HeaderSmallProgress
        icon={<HeaderSmallIcon2 />}
        stopColor1="#AF3BB9"
        stopColor2="#EC76FF"
        knobColor="#A33EB1"
        value={40}
        indexValue={2}
      />
    ),
    _id: "1",

    compleTionRate: 40
  },
  {
    eachChild: (
      <HeaderSmallProgress
        icon={<HeaderSmallIcon1 />}
        stopColor1="#326AFF"
        stopColor2="#769BFF"
        knobColor="#4F80FF"
        value={80}
        indexValue={1}
      />
    ),
    compleTionRate: 100,
    _id: "2"
  },
  {
    eachChild: (
      <HeaderSmallProgress
        icon={<HeaderSmallIcon3 />}
        stopColor1="#FFFB98"
        stopColor2="#D1C90B"
        knobColor="#D1C90B"
        value={20}
        indexValue={3}
      />
    ),
    compleTionRate: 30,
    _id: "3"
  },
  {
    eachChild: (
      <HeaderSmallProgress
        icon={<HeaderSmallIcon3 />}
        stopColor1="#FF97B0"
        stopColor2="#FF3C6A"
        knobColor="#FF4471"
        value={20}
        indexValue={5}
      />
    ),
    compleTionRate: 20,
    _id: "4"
  }
];
