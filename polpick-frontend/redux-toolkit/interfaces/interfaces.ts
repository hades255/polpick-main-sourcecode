/* eslint-disable import/no-cycle */
import { userData } from "@/types/common.type";

export interface userSliceData {
  isLoggedIn: boolean;
  userData: userData | null;
  currency: string;
  tempAffiliateLink: string | undefined;
  userTicketProgress: { [key: string]: number } | null;
  fullCompletionCount: number;
}

export interface registrationData {}

export interface globalStateInterface {
  counter: number;
}

export interface walletSliceInterface {
  wallet: string;
  walletBalance: number;
  usd_price: number;
  usdBalance: number;
  // wallet?: {
  //   address: string;
  //   addresses: string[];
  //   chain: {
  //     chainId: number;
  //     connector: any; // You can replace 'any' with the specific type of connector if available
  //     isConnected: boolean;
  //     isConnecting: boolean;
  //     isDisconnected: boolean;
  //     isReconnecting: boolean;
  //     status: string;
  //   };
  // };
}
export interface IGameDetails {
  batchSize: string;
  createdAt: string;
  gameId: string;
  gameTimeEnd: string;
  gameTimeStart: string;
  gameType: "30" | "15";
  poolId: string;
  updatedAt: string;
  _id: string;
}

export interface socketSliceInterface {
  socketID: string;
  nodeSocketID: string;
}

export interface recentWinsInterface {
  betFor: "up" | "down";
  country: string;
  gameType: "15" | "30";
  profile_image: string;
  tradeAmount: number;
  walletId: string;
  _id: string;
}

export interface highRollersListInterface {
  // avatarUrl: string;
  // country_code: string;
  // type: "up" | "down";
  // walletId: string;
  // total_trade: number;
  // turnover: number;
  // ticket: number;
  // _id: string;
  _id: string;
  walletId: string;
  profile_image: string;
  country: string;
  totalTradeAmount: number;
  totalTurnOver: number;
  rank: number;
  totalUpBetsCount: number;
  totalDownBetsCount: number;
  upOrDown: "up" | "down";
  prizeAmount: number;
}

export interface HighRollerUser {
  rank: number;
  totalTurnOver: number;
  endTime: number;
}
export interface weeklyWinnersInterface {
  avatarUrl: string;
  walletId: string;
  total_ticket: number;
  prize_ticket: number;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITradingGraphPlot {
  e: "trade";
  E: number;
  s: "BTCUSDT";
  t: number;
  p: string;
  q: string;
  b: number;
  a: number;
  T: number;
  m: boolean;
  M: boolean;
}

export interface TopWinnersByRange {
  profile_image: string;
  country: string;
  expected_prize: number;
  isDeleted: boolean;
  rank: number;
  result_date: string;
  status: string;
  total_tickets_count: number;
  total_trades_count: number;
  walletId: string;
  week_end_date: string;
  week_of_year: number;
  week_start_date: string;
  _id: string;

  // walletAddress: string;
  // prize: string;
  // avatarUrl: string;
  // country_coide: string;
}

export interface weeklyJackportContenderInterface {
  avatarUrl: string;
  walletAddress: string;
  // total_ticket: number;
  prize: number;
  expected_prize: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  rank: number;
}

export interface gameSocketData {
  phase: "TradeStart" | "MiningStart" | "MiningEnd" | "distribution"; // "Trade" | "Mining" | "Distribution";
  startTime: number;
  endTime: number;
  startPrice: number;
  endPrice: number;
  seconds: number;
  totalTime: number;
  game_id?: string;
}

export interface TimerSocketData {
  leftSecond: number;
  totalSecond: number;
  phase: gameSocketData[`phase`];
  start_price: number;
  end_price: number;
}
export interface IMakeTrade {
  poolId: string;
  avatarUrl: string;
  countryCode: string;
  upOrDown: boolean;
  whiteLabelId: string;
  tradeAmount: number;
  affiliate_link: string;
  gameId: string;
  gameType: "30" | "15";
  order_id: string;
  walletId: string;
}

export interface IUserChatInterface {
  walletId: string;
  avatarUrl: string;
  message: string;
  isNew: boolean;
  username: string;
  time: number;
}

export interface IStartPriceSocketPayload {
  game_id: string;
  start_price: number;
}

export interface IEndPriceSocketPayload {
  game_id: string;
  end_price: number;
}

export interface GameUser {
  walletId: string;
  betFor: "up" | "down";
  tradeAmount: number;
  username: string;
  profile_image: string;
  totalReturn: number;
}
export interface IWinGame {
  gameId: string;
  upOrDown: "draw" | "up" | "down";
  endPrice: number;
  startPrice: number;
  totalUpUsers: number;
  totalDownUsers: number;
  totalUpAmount: number;
  totalDownAmount: number;
  users: GameUser[];
}

export interface gameSliceInterface {
  recentWins: recentWinsInterface[];
  gameType: "15" | "30";
  gameDetails: IGameDetails | {};
  game_id: string;
  bettingPhase: boolean;
  winGameDetails: IWinGame | undefined;
}

export interface affiliateSliceInterface {
  tab_id: number;
}

export interface CoinBaseCurrencyRates {
  currency: string;
  rates: {
    [key: string]: string;
  };
}

export interface EventData {
  clicks: number;
  earnings: number;
  conn_wallet: number;
  bet_volume: number;
}

export interface AffiliateGraphData {
  [event: string]: EventData;
}
