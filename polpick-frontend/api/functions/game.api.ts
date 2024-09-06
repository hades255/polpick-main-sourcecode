/* eslint-disable import/no-cycle */
import { PlayerTableData } from "@/components/PlayerTable/PlayerTable";
import {
  HighRollerUser,
  IGameDetails,
  TopWinnersByRange,
  highRollersListInterface,
  recentWinsInterface,
  weeklyJackportContenderInterface,
  weeklyWinnersInterface
} from "@/reduxtoolkit/interfaces/interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

interface getRecentWinsResponse {
  message: string;
  status: number;
  data: recentWinsInterface[];
}

export interface getHighRollersResponse {
  message: string;
  status: number;
  data: highRollersListInterface[];
  user_data: HighRollerUser;
}
export interface chartSocketDataInterface {
  _id: string;
  e: string;
  E: number;
  s: string;
  t: number;
  p: string;
  q: string;
  b: number;
  a: number;
  T: number;
  m: boolean;
  M: boolean;
}
export interface chartDataInterface {
  time: number;
  value: number | string;
}

export interface getChartInitialDataResponse {
  message: string;
  status: number;
  data: Array<chartDataInterface>;
}

interface getWeeklyWinnersListResponse {
  message: string;
  status: number;
  data: weeklyWinnersInterface[];
}

interface getWeeklyJackportContenders {
  message: string;
  status: number;
  data: weeklyJackportContenderInterface[];
}

export interface winRatioObject {
  rank: number;
  totalGames: number;
  totalWins: number;
  type: "up" | "down";
  winRatio: number;
  _id: string;
}
interface getTopFiveWinnerResponse {
  message: string;
  status: number;
  data: recentWinsInterface[];
}
// interface getWinRatioResponse {
//   message: string;
//   status: number;
//   data: winRatioObject[];
// }
interface getTopWinnersByRangeResponse {
  message: string;
  status: number;
  data: TopWinnersByRange[];
  // data: {
  //   first: TopWinnersByRange;
  //   second: TopWinnersByRange;
  //   third: TopWinnersByRange;
  // };
}
export interface UserWinRatio {
  country: string;
  prizeAmount: number;
  profile_image: string;
  rank: number;
  totalDownBetsCount: number;
  totalTradesCount: number;
  totalUpBetsCount: number;
  totalWinsCount: number;
  upOrDown: "up" | "down";
  walletId: string;
  winRatio: number;
  _id: string;
}
export interface userWinRatio {
  rank: number;
  totalTradesCount: number;
  winRatio: number;
  endTime: number;
}
export interface userWinRatioResponse {
  message: string;
  status: number;
  data: UserWinRatio[];
  user_data: userWinRatio;
}
export interface IaffiliateData {
  isDeleted: boolean;
  affiliate_link: string;
  createdAt: string;
  link_name: string;
  total_affiliated_users: number;
  total_earnings: number;
  total_earnings_todays: number;
  walletId: string;
  _id: string;
}

export interface affiliateListResponse {
  message: string;
  status: number;
  data: IaffiliateData[];
  page: number;
  pages: number;
  success: boolean;
  limit: number;
}

export interface recentGameData {
  createdAt: string;
  gameEndPrice: string;
  gameEndTme: string;
  gameId: string;
  gameStartPrice: string;
  gameStartTme: string;
  gameType: string;
  isDeleted: boolean;
  prizeAmount: string;
  result: "up" | "down" | "draw";
  usersCount: number;
  _id: string;
}
export interface recentGameListResponse {
  limit: number;
  message: string;
  page: number;
  pages: number;
  statusCode: number;
  success: boolean;
  total: number;
  data: recentGameData[];
}

export interface IcreateAffiliateUser {
  walletId: string;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  affiliate_link: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface createAffiliateUserResponse {
  success: true;
  data: IcreateAffiliateUser;
  message: string;
}

export interface IcreateAffiliateLink {
  walletId: string;
  link_name: string;
  affiliate_link: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface createAffiliateLinkResponse {
  success: true;
  data: IcreateAffiliateLink;
  message: string;
}

export interface iJackPotStats {
  totalJackpotAmount: number;
  endTime: number;
  currentTime: number;
}
export interface iJackportStatsResponse {
  statusCode: number;
  success: true;
  data: iJackPotStats;
  message: string;
}
export interface GameDetailsResponse {
  data: IGameDetails;
  message: string;
  statusCode: number;
}

export interface iUserJacpotData {
  rank: number;
  weeklyTicketsCount: number;
  totalJackpotPrize: number;
  endTime: number;
  currentTime: number;
}

export interface iJackpotList {
  _id: string;
  walletId: string;
  profile_image: string;
  country: string;
  expected_prize: number;
  rank: number;
  total_tickets_count: number;
  total_trades_count: number;
}
interface SortOptions {
  order: "asc" | "desc";
  field: string;
}
export interface iAffliateList {
  walletId: string;
  sort?: SortOptions;
  page: number;
  limit: number;
}

export interface iSortFields {
  order: "asc" | "desc"; //default
  field: keyof PlayerTableData; //default
}

export interface iSortFieldsWinRatio {
  order: "asc" | "desc"; //default
  field: keyof UserWinRatio; //default
}

export interface iSortFieldsJackpotList {
  order: "asc" | "desc"; //default
  field: keyof iJackpotList; //default
}

export interface jackpotListRensponse {
  statusCode: number;
  success: boolean;
  data: iJackpotList[];
  user_data: iUserJacpotData;
  message: string;
}

export interface DashboardStats {
  links_count: number;
  friends_count: number;
  total_earnings: number;
  todays_earnings: number;
}
export interface ReferrerInfo {
  walletId: string;
  country: string;
  countryCode: string;
  signupType: string;
  social_link: string;
  whiteLabelId: string;
  isAffiliateManager: boolean;
  referral_link: string;
  telegramId: string;
  betsCount: number;
  winningCount: number;
  winStreakCount: number;
  firstTrade: boolean;
  _id: string;
  role: string;
  first_name: string;
  last_name: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  profile_image: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  username: string;
  isEmailVerified: boolean;
  full_name: string;
  socialAccounts: any[];
}

interface iGetAffliateStatsResponse {
  success: boolean;
  data: DashboardStats;
  refferrer_info: ReferrerInfo;
  message: string;
}

export interface iCheckAffliateLinkResponse {
  success: boolean;
  data: {};
  message: string;
}

export const getRecentWins = async (): Promise<getRecentWinsResponse> => {
  const res = await axiosInstance.get(endpoints.game.recentWins);
  return res.data;
};

export const getHighRollersList = async (body: {
  walletId: string;
  sort: iSortFields;
}): Promise<getHighRollersResponse> => {
  const res = await axiosInstance.post(endpoints.misc.highrollers, body);
  return res.data;
};

export const getChartInitialData =
  async (): Promise<getChartInitialDataResponse> => {
    const res = await axiosInstance.get(endpoints.misc.chartInitialData);
    return res.data;
  };

export const getWeeklyWinnersList =
  async (): Promise<getWeeklyWinnersListResponse> => {
    const res = await axiosInstance.get(endpoints.misc.weeklyWinnersHistory);
    return res.data;
  };

export const getTopTenWinnersList =
  async (): Promise<getTopFiveWinnerResponse> => {
    const res = await axiosInstance.get(endpoints.game.topFiveWinners);
    return res.data;
  };

export const getTopWinnersByRange = async (body: {
  week_date: string; //"YYYY-MM-DD"
  top_only: boolean;
  sort: {
    order: "asc" | "desc";
    field?: keyof TopWinnersByRange;
  };
}): Promise<getTopWinnersByRangeResponse> => {
  // console.log("chatlog:interactbody ", body);
  const res = await axiosInstance.post(
    endpoints.misc.weeklyWinnersHistory,
    body
  );
  return res.data;
};

export const getWeeklyjackportContenders =
  async (): Promise<getWeeklyJackportContenders> => {
    const res = await axiosInstance.get(endpoints.misc.weeklyjackpotcontenders);
    return res.data;
  };

// export const getWinRatio = async (): Promise<getWinRatioResponse> => {
//   const res = await axiosInstance.get(endpoints.game.winratio);
//   return res.data;
// };

export const getWinRatioByID = async (body: {
  walletId: string;
  sort?: {
    order?: "desc" | "asc";
    field?: keyof UserWinRatio;
  };
}): Promise<userWinRatioResponse> => {
  // console.log("chatlog:interactbody ", body);
  const res = await axiosInstance.post(endpoints.game.winRatioById, body);
  return res.data;
};

export const getAffliateList = async (
  body: iAffliateList
): Promise<affiliateListResponse> => {
  const res = await axiosInstance.post(endpoints.affiliate.affiliateList, body);
  return res.data;
};
export const getAffliateStats = async (body: {
  walletId: string;
}): Promise<iGetAffliateStatsResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliatedStats,
    body
  );
  return res.data;
};

export const getgameList = async (body: {
  page: number;
  limit: number;
  type: "30" | "15";
}): Promise<recentGameListResponse> => {
  const res = await axiosInstance.post(endpoints.game.gameList, body);
  return res.data;
};

export const checkAffliateLink = async (body: {
  link_name: string;
}): Promise<iCheckAffliateLinkResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateCheckLink,
    body
  );
  return res.data;
};

export const createAffiliateLink = async (body: {
  link_name: string;
  walletId: string;
  // phone: string;
}): Promise<createAffiliateLinkResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateLinkCreate,
    body
  );
  return res.data;
};

export const createAffliateUser = async (body: {
  full_name: string;
  email: string;
  telegramId: string;
  walletId: string;
  terms_and_conditions: boolean;
  // phone: string;
}): Promise<createAffiliateUserResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateCreateUser,
    body
  );
  return res.data;
};

export const getGameType = async (body: {
  gameType: "30" | "15";
}): Promise<GameDetailsResponse> => {
  const res = await axiosInstance.post(endpoints.game.gameType, body);
  return res.data;
};

export const getWeeklyJackpotstats =
  async (): Promise<iJackportStatsResponse> => {
    const res = await axiosInstance.get(endpoints.misc.weeklyjackpotstats);
    return res.data;
  };

export const getJackpot = async (body: {
  walletId: string;
  sort?: {
    order?: "desc" | "asc";
    field: keyof iJackpotList;
  };
}): Promise<jackpotListRensponse> => {
  // console.log("chatlog:interactbody ", body);
  const res = await axiosInstance.post(endpoints.misc.jackpotlist, body);
  return res.data;
};

export const checkValidAffilateLink = async (body: {
  affiliate_link: string;
}): Promise<any> => {
  // console.log("chatlog:interactbody ", body);
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateCheckValidLink,
    body
  );
  return res.data;
};

export interface AffliateYearlyData {
  month: number;
  totalConnectedWallets: number;
  totalBetAmount: number;
  totalEarnings: number;
  clicks: number;
}

export interface iAffiliateYearlyResponse {
  success: boolean;
  data: AffliateYearlyData[];
  message: string;
}

export interface AffliateWeeklyData {
  day: number;
  totalConnectedWallets: number;
  totalBetAmount: number;
  totalEarnings: number;
  clicks: number;
}
export interface iAffiliateWeeklyResponse {
  success: boolean;
  data: AffliateWeeklyData[];
  message: string;
}

export interface AffliateMonthlyData {
  day: number;
  totalConnectedWallets: number;
  totalBetAmount: number;
  totalEarnings: number;
  clicks: number;
}
export interface iAffiliateMonthlyResponse {
  success: boolean;
  data: AffliateWeeklyData[];
  message: string;
}

export interface AffliateDailyData {
  hour: number;
  totalConnectedWallets: number;
  totalBetAmount: number;
  totalEarnings: number;
  clicks: number;
}
export interface iAffiliateDailyResponse {
  success: boolean;
  data: AffliateDailyData[];
  message: string;
}
export const getAffiliateYearlyGraphData = async (body: {
  walletId: string;
  year: number;
}): Promise<iAffiliateYearlyResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateYearlyGraph,
    body
  );
  return res.data;
};

export const getAffiliateWeeklyGraphData = async (body: {
  walletId: string;
  date: string;
}): Promise<iAffiliateWeeklyResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateWeeklyGraph,
    body
  );
  return res.data;
};

export const getAffiliateHalfYearlyGraphData = async (body: {
  walletId: string;
  year: number;
}): Promise<iAffiliateYearlyResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateHalfYearlyGraph,
    body
  );
  return res.data;
};

export const getAffiliateMonthlyGraphData = async (body: {
  walletId: string;
  year: number;
  month: number;
}): Promise<iAffiliateMonthlyResponse> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateMonthlyGraph,
    body
  );
  return res.data;
};

export const getAffiliateDayWiseGraphData = async (body: {
  walletId: string;
  year: number;
  month: number;
  date: number;
}): Promise<any> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affiliateDayWiseGraph,
    body
  );
  return res.data;
};

export const updateAffliateLinkClick = async (body: {
  affiliate_link: string;
}): Promise<any> => {
  const res = await axiosInstance.post(
    endpoints.affiliate.affliateRegisterClick,
    body
  );

  return res.data;
};
