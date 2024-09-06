export interface IMakeTrade {
    poolId: string;
    gameId: string;
    gameType: string;
    avatarUrl: string;
    countryCode: string;
    upOrDown: boolean;
    whiteLabelId: string;
    tradeAmount: number;
    walletId: string;
    referralLink?: string;
}

export interface ChatHistory {
    walletId: string;
    username: string;
    message: string;
    isNew: boolean;
    time: number;
}

export interface ICurrentGame {
    gameId: string;
    poolId: string
    batchSize: string
    gameType: string
    gameTimeStart: string
    gameTimeEnd: string

    gameStartPrice?: number
    gameEndPrice?: number
    prizeAmount?: number
    result?: number
}

export interface ITradeUsers {
    userId?: string;
    isWin?: boolean;

    poolId?: string;
    avatarUrl?: string;
    countryCode?: string;
    upOrDown: boolean;
    whiteLabelId?: string;
    tradeAmount: number;
    walletId: string;
}


export interface IGameActivityReport {
    type: string;
    page?: number;
    limit?: number;
}

export interface IUserTicketActivity {
    walletId: string;
}