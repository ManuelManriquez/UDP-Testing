const dgram = require('dgram');
const { Server } = require('http')
const server = dgram.createSocket('udp4');
const crypto = require('crypto');

let serverIP = "127.0.0.1"
let port = 5500
let serverBind = 5552;

// let roomId = crypto.randomBytes(3).toString('hex');
let socketId = "socket2"
let roomId = "bbb";

let msgCreateRoom = { action: "create", socket: socketId, roomId: roomId }
let msgCreateRoomStr = JSON.stringify(msgCreateRoom);

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, senderInfo) => {
    console.log('Messages received from phone: ' + msg)
}
);

server.on('listening', () => {
    console.log("TVClient2 is listening: "+ serverBind)
    server.send(msgCreateRoomStr, port, serverIP, (err) => {
        if (err) throw err
    });
});

server.on("close", () => {
    console.log("Disconnected!");
});

server.bind(serverBind);