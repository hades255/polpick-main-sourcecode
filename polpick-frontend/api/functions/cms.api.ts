import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export interface CmsDaum {
  title: string;
  win_ratio: string;
  winning_withdraw: boolean;
  against_house: boolean;
  win_chance: boolean;
  peer: boolean;
  transparency: boolean;
  walletAddress: string;
  deposit: boolean;
}

export interface FaqDaum {
  title: string;
  details: string;
}
export interface TopWinnerDaum {
  rank: string;
  walletId: string;
  avatarUrl: string;
  prize: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface Daum {
  _id: string;
  win_ratio: string;
  win_paid: string;
  jackpot_paid: string;
  status: string;
  isDeleted: boolean;
  CmsData: CmsDaum[];
  FAQ: FaqDaum[];
  TopWinnerData: TopWinnerDaum[];
  createdAt: string;
  updatedAt: string;
  video_link: string;
  thumbnail_link: string;
}

export interface faqCategoryData {
  slug: string;
  title: string;
  _id: string;
}
export interface IHomeCMS {
  statusCode: number;
  message: string;
  data: Daum;
}
export interface IFAQCategoryListResponse {
  statusCode: number;
  message: string;
  data: faqCategoryData[];
}

export interface faqList {
  category_id: string;
  createdAt: string;
  description: string;
  isDeleted: boolean;
  title: string;
  updatedAt: string;
  _id: string;
}

export interface IFAQListResponse {
  statusCode: number;
  message: string;
  data: faqList[];
}

export const fetchAboutUs = async () => {
  const res = await axiosInstance.get(endpoints.cms.about);
  return res;
};

// Faq
export const faqQuery = () => {
  const res = axiosInstance.get(endpoints.cms.faq);

  return res;
};

export const fetchHomeCMS = async (): Promise<IHomeCMS> => {
  const res = await axiosInstance.get(endpoints.cms.home);
  return res.data;
};

export const fetchFaqCategoryList =
  async (): Promise<IFAQCategoryListResponse> => {
    const res = await axiosInstance.get(endpoints.cms.faqCategory);
    return res.data;
  };

export const getFaqListByCategory = async (body: {
  search: string;
  category_id: string;
}): Promise<IFAQListResponse> => {
  const res = await axiosInstance.post(endpoints.cms.faqList, body);
  return res.data;
};
