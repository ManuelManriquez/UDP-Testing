const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const crypto = require('crypto');

let serverIP = "127.0.0.1"
let port = 5500
let serverBind = 5501;
let socketId = "socket2"
let roomId = "bbb";

// let roomId = crypto.randomBytes(3).toString('hex');
let msgCreateRoom = { action: "message", socket: socketId, roomId: roomId, message: "dasdasdasdas" }
let msgCreateRoomStr = JSON.stringify(msgCreateRoom);

client.send(msgCreateRoomStr, port, serverIP);

client.on('message', (msg, senderInfo) => {
    console.log('Messages received from phone: ' + msg)
    client.close();
}
);
