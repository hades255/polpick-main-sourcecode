const WebSocketClient = require('ws');
const dotenv = require('dotenv');
dotenv.config();

const handleData = (data:any) => {
    data = JSON.parse(data);
    const randomDigit1 = Math.floor(Math.random() * 9);
    const randomDigit2 = Math.floor(Math.random() * 9);
    if (data.p) {
        data.p = data.p.slice(0, 8) + randomDigit1 + randomDigit2;
        // console.log("Btc Price", data);
    }
    return data;
};


// export const TradingPrice = () => {
//     // console.log("Trading Price ",process.env.BINANCE_SOCKET_URL )
//     const ws = new WebSocketClient(process.env.BINANCE_SOCKET_URL); 

//     ws.on('message', (data:any) => {
//         let tradePrice = handleData(data);
//         (global as any ).BTC_USDT_PRICE  = tradePrice.p;
        
//     });

// };



// const PORT = process.env.PORT || 1763;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
