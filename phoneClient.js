const dgram = require('dgram');

const client = dgram.createSocket('udp4')

let PORT = 5500
let SERVERIP = '127.0.0.1'
const socketID = "socket2"
const roomID = "bbcc"
const message = "uupp"
    
let action = { action: "join", socket: socketID, roomId: roomID, message: message }
let actionString = JSON.stringify(action)

let action2 = { action: "message", socket: socketID, roomId: roomID, message: message }
let actionString2 = JSON.stringify(action2)

let action3 = { action: "leave", socket: socketID, roomId: roomID }
let actionString3 = JSON.stringify(action3)

client.send(actionString, PORT, SERVERIP, (err) => {
    if (err) throw err
});

client.send(actionString2, PORT, SERVERIP, (err) => {
    if (err) throw err
});

client.send(actionString3, PORT, SERVERIP, (err) => {
    if (err) throw err
    client.close();
});