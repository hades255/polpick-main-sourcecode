const SocketEvents = {
  listen: {
    TradingGraphPlot: "TradingGraphPlot",
    chatMessage: "newMessage",
    chatHistory: "chatHistory",
    gameRunner: "game_runner",
    getCurrentGameData: "dataResponse",
    getGameStage: "newGame",
    getGameStageThirty: "newGame30",
    progress: "progress",
    progressThirty: "progress30",
    TraderList30: "trader_list_30", // + emit
    TraderList15: "trader_list_15", // + emit
    GameWinner15: "winner15",
    GameWinner30: "winner30",
    JackpotSocket: "jackpot_prize",
    GameActivity: "game-activity-report",
    UserActivity: "user-ticket-activity-report",
    LivePlayers: "live-users-count"
  },
  emit: {
    EmitJoinChat: "chatMessage",
    EmitGetGameData: "requestData",
    start_price: "start_price",
    start_price15: "start_price15",
    end_price15: "endPrice_price15",
    end_price: "endPrice_price",
    GameActivity: "game-activity-report",
    UserActivity: "user-ticket-activity-report"
  },
  socketRoom: {
    userBalanceRoom: (id: string) => `user-balance-${id}`,
    userTicketTrackingRoom: (id: string) => `user-ticket-activity-report-${id}`
  }
};

export default SocketEvents;
