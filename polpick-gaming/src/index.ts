import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http'; // Import createServer from http
import { Server } from 'socket.io'; // Import Server from socket.io
import MongoDB from './db/connection';
import { io as ioClient } from 'socket.io-client';
import { RunningGameFifteen } from './cmd/runner2';
import RunningGameThirty from './cmd/runner';

const app = express();
const port = process.env.PORT || 1761;
(globalThis as any).btcPrice = 0;
(globalThis as any).enableBotsFifteen = true;
(globalThis as any).enableBotsThirty = true;
(globalThis as any).txnThirtyErrors = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

MongoDB();
const server = createServer(app); // Create HTTP server using Express app

export const io = new Server(server); // Attach Socket.IO server to HTTP server
io.setMaxListeners(30);
io.on('connection', (socket) => {
    console.log("Socket Connection Established");
    console.log('A client connected');

    socket.on('message', (data) => {
        console.log('Received message:', data);
        io.emit('message', data);
    });

    socket.on('error_logs', (data) => {
        io.emit('error_logs', (globalThis as any).txnThirtyErrors);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });

    socket.on('requestData', (data: any, client: any) => {
        console.log(data, 'requestData');
        handleRequestData(data, socket, io);
    })

    socket.on('startBotFifteen', (data: any, client: any) => {
        (globalThis as any).enableBotsFifteen = !(globalThis as any).enableBotsFifteen;
        io.to(socket.id).emit('botResponse', { thirtyStatus: (globalThis as any).enableBotsThirty, fifteenStatus: (globalThis as any).enableBotsFifteen });
    })

    socket.on('startBotsThirty', (data: any, client: any) => {
        (globalThis as any).enableBotsThirty = !(globalThis as any).enableBotsThirty;
        io.to(socket.id).emit('botResponse', { thirtyStatus: (globalThis as any).enableBotsThirty, fifteenStatus: (globalThis as any).enableBotsFifteen });
    })
});


async function handleRequestData(data: any, client: any, io: any) {
    // Log the client request data
    if (data.gameType === "30") {
        console.log("Game 30 Data Sent ");
        io.to(client.id).emit('dataResponse', (global as any).GAME_OBJECT_DATA_30);
    }
    if (data.gameType === "15") {
        console.log("Game 15 Data Sent ");
        io.to(client.id).emit('dataResponse', (global as any).GAME_OBJECT_DATA_15);
    }
};

/* Connect to polpick btc trading website to fetch the current live btc price */
const socketLister = ioClient(process.env.POLPICK_BTC_SOCKET_URL as string);
socketLister.on('connect', () => {
    console.log('Connected to the polpick trading server');
});

socketLister.on('TradingGraphPlot', (data) => {
    (globalThis as any).btcPrice = data.p;
});
/* Connect to polpick btc trading website to fetch the current live btc price */

app.get('/', (req, res) => {
    res.send('Hello, this is your TypeScript backend!');
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    new RunningGameFifteen().game15(io);

    /* Start Game 30 At A Certain Interval After Game 15 So that they do not overlap while calling trigger */
    setTimeout(() => {
        new RunningGameThirty().game30(io);
    }, 5 * 1000);
});
