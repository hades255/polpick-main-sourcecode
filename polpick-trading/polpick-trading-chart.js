const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const WebSocket = require("ws");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let cron = require("node-cron");

// const db = require('./database/database.js')
// db.connectToDatabase();

const wsEndpoint = "wss://stream.binance.com:9443/ws";

const tradingPair = "btcusdt";

// Construct the WebSocket stream URL for ticker updates
const streamURL = `${wsEndpoint}/${tradingPair}@trade`;
let eventData = [];
let tempData = {};
function connectWebSocket() {
  // Create a new WebSocket connection
  const ws = new WebSocket(streamURL);
  // Event listener for WebSocket connection open
  ws.on("open", () => {
    console.log("Connected to Binance WebSocket API");
  });
  ws.on("message", (data) => {
    // Convert the Buffer to a string
    const messageString = data.toString("utf8");
    try {
      // Parse the JSON message
      const message = JSON.parse(messageString);
      console.log(message)
      // console.log(streamURL + ' « ' + message.s + ' $' + message.p);
      if (message) {
        if (message.p) {
          let [integerPart, decimalPart] = message.p.toString().split(".");
          let newDecimalPart = Math.floor(Math.random() * 9000).toString();
          let randomizedNumber = `${integerPart}.${newDecimalPart}`;
          message.p = randomizedNumber;
        }
      }
      if (eventData.length == 0) {
        tempData = message;
      }
      // Store the BTC price in the database
      // processTickerData(message)

      eventData.push(message);
      // setTimeout(() => {
      //     tempData = message;
      //     eventData = []
      // }, 800)
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
  ws.on("close", () => {
    console.log("WebSocket connection closed, reconnecting...");
    // Reconnect to WebSocket server after a short delay
    setTimeout(connectWebSocket, 100);
  });
}
// Start the initial WebSocket connection
connectWebSocket();
/*
const interval = 500; // 500 milliseconds

setInterval(() => {
    // let length = eventData.length;
    // let index = Math.floor(Math.random() * length);
    // let data = eventData[index] || tempData;
    let data = eventData[eventData.length -1];
    // console.log({ eventData: eventData[index], tempData: tempData });
    // Store the BTC price in the database
    if(data) {
        // io.emit('TradingGraphPlot', data);
        // processTickerData(data);
    }
    eventData = []
}, interval);


io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (data) => {
        // console.log("Data", data)
        io.emit("message", data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const processTickerData = async (data) => {
    try {
        const btcPrice = await db.trading_price_collection.insertOne(data);
        // console.log("trading_price created successfully",btcPrice);
    } catch (error) {
        console.log("Error creating", error);

    }
};
*/
const PORT = process.env.PORT || 1763;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
