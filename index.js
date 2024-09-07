const express = require("express")
const { connectDB } = require("./Config/ConnectionToDatabse")
const morgan = require("morgan");
const WebSocket = require('ws');
const eventEmitter = require("./EventProcessing/EvnetsAction");


const app = express()
require('dotenv').config()

connectDB()

app.use(express.json())
app.use(morgan("dev"));
app.use(express.static("public"))


app.use(require("./Routes/GalaxyAuth"));
app.use(require("./Routes/GalaxyTransactions"));
app.use(require("./Routes/GalaxyDetail"))

const wss = new WebSocket.Server({ noServer: true });

const PORT = process.env.PORT || 4000


// Handle WebSocket connections for real-time updates
wss.on('connection', (ws) => {
    console.log('Client connected to get real-time updates');

    // Send real-time trade status updates to the client
    eventEmitter.on('TradeUpdated', (Transaction , ToEmailId) => {
        ws.send(JSON.stringify({
            event: 'TradeUpdated',
            Transaction,
            ToEmailId
        }));
    });

    // Handle critical event notifications Ex- In case of Delayed order
    eventEmitter.on('CriticalEvent/Delayed', (Transaction , ToEmailId) => {
        ws.send(JSON.stringify({
            event: 'CriticalEvent/Delayed',
            message: Transaction,
            ToEmailId
        }));
    });

    // Handle critical event notifications Ex- In case of Delayed order
    eventEmitter.on('CriticalEvent/Cancelled', (Transaction , ToEmailId) => {
        ws.send(JSON.stringify({
            event: 'CriticalEvent/Cancelled',
            message: Transaction,
            ToEmailId
        }));
    });

    ws.on('close', () => {
        console.log('Client disconnected from real-time updates');
    });
});


app.get('/',(req,res)=>{
    res.send("hi home page")
})

const server = app.listen(PORT , ()=>{
    console.log(`hi this is Intergalaxy Trade Network ${PORT}`)
})


server.on('upgrade', (request, socket, head) => {
    if (request.url === '/api/updates/real-time') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});