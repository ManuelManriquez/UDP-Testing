const dgram = require('dgram');

const client = dgram.createSocket('udp4')

let PORT = 5500
let SERVERIP = '127.0.0.1'

let action = { action: "join", socket: "socket4", roomId: "bbcc", message: "uppp" }
let actionString = JSON.stringify(action)

let action2 = { action: "message", socket: "socket4", roomId: "bbcc", message: "uppp" }
let actionString2 = JSON.stringify(action2)

let action3 = { action: "leave", socket: "socket4", roomId: "bbcc" }
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