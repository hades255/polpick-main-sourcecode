export interface saveGameInterface{
    gameId:string,
    gameType:string,
    gameTimeStart:Number,
    gameTimeEnd:Number,
    poolId?:string,
    batchSize?:string

};
export interface updateGameInt{
    game_id:string,
    start_price?:Number,
    end_price?:Number
};
export interface startPriceInterface{
    game_id:string,
    start_price:number
};
export interface endPriceInterface{
    game_id:string,
    end_price:number
}

export interface IGameObject {
    seconds: number,
    phase: 'TradeStart' | 'MiningStart' | 'MiningEnd' | 'distribution',
    totalTime: number,
    endPrice: number,
    startPrice: number,
    startTime: number,
    endTime: number,
    game_id: string,
    poolId: string | undefined
}