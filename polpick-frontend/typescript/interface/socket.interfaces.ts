import { recentGameData } from "@/api/functions/game.api";
import { IMakeTrade } from "@/reduxtoolkit/interfaces/interfaces";
import { ReactElement } from "react";

export interface recentGameSocketResponse {
  livePlayersCount: number;
  totalGamesHistoryCurrentPage: number;
  totalGamesHistoryPages: number;
  gamesHistory: recentGameData[];
  allTimePlayersCount: number;
}

export interface TradeListSocketResponse {
  up_array: IMakeTrade[];
  down_array: IMakeTrade[];
  total_count: number;
  total_trade: number;
  down_total: number;
  up_total: number;
  up_return_percentage: number;
  down_return_percentage: number;
}

export interface UserActivitySocketResponse {
  firstTrade: number;
  fiveBets: number;
  fiveWins: number;
  fiveWinsStreak: number;
  fortyWinsStreak: number;
  tenWinsStreak: number;
  totalTicketsCount: number;
  twentyWinsStreak: number;
}

export interface UserStreakBadgeInterface {
  name: keyof UserActivitySocketResponse; // Ensure the name matches keys from UserActivitySocketResponse
  icon: ReactElement;
  stopColor1: string;
  stopColor2: string;
  knobColor: string;
  compleTionRate: number;
}
