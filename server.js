const dgram = require('dgram');
const { Server } = require('http')
const server = dgram.createSocket('udp4');

let dictionary = []

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, senderInfo) => {
    let msgObj = JSON.parse(msg);
    const roomExists = dictionary.findIndex(elem => elem.roomId == msgObj.roomId);
    let socketExists = -1
    if (roomExists != -1) {
        socketExists = dictionary[roomExists].sockets.findIndex(elem => elem.socket == msgObj.socket);
    }

    if (msgObj.action == "create") {
        if (roomExists == -1) {
            dictionary.push({ roomId: msgObj.roomId, sockets: [{ socket: msgObj.socket, IP: senderInfo.address, PORT: senderInfo.port }] })
            for (const iterator of dictionary) {
                console.log(iterator);
            }
            console.log("------------------------------")
        } else {
            server.send(msg + " roomId already exists", senderInfo.port, senderInfo.address)
        }
    }
    if (msgObj.action == "delete") {
        if (roomExists != -1) {
                roomIndex = dictionary.findIndex(elem => elem.roomId == msgObj.roomId)
                socketIndex = dictionary[roomIndex].sockets.findIndex(elem => elem.socket == msgObj.socket)
                dictionary.splice(roomIndex, 1);
                for (const iterator of dictionary) {
                    console.log(iterator);
                }
                console.log("------------------------------")
        } else {
            server.send(msg + " roomId does not exists", senderInfo.port, senderInfo.address)
        }
    }

    if (msgObj.action == "join") {
        if (roomExists != -1) {
            if (socketExists == -1) {
                dictionary = dictionary.map((elem) => {
                    if (elem.roomId === msgObj.roomId) {
                        return Object.assign({}, elem, { sockets: [...elem.sockets, { socket: msgObj.socket, IP: senderInfo.address, PORT: senderInfo.port }] })
                    } else {
                        return elem;
                    }
                })
                for (const iterator of dictionary) {
                    console.log(iterator);
                }
                console.log("------------------------------")
            } else {
                server.send(msg + " socket already exists in the room", senderInfo.port, senderInfo.address)
            }
        } else {
            server.send(msg + " roomId does not exists", senderInfo.port, senderInfo.address)
        }
    }

    if (msgObj.action == "message") {
        if(roomExists != -1 && socketExists != -1){
            sortedObj = dictionary.find(elem => elem.roomId == msgObj.roomId)
            let socket = sortedObj.sockets.find(elem => elem.socket == msgObj.socket);
            const socketMsg = { socket: socket.socket, message: msgObj.message }
            const message = JSON.stringify(socketMsg);
            if (socket) { server.send(message, sortedObj.sockets[0].PORT, sortedObj.sockets[0].IP) };
        }
    }

    if (msgObj.action == "leave") {
        if (roomExists != -1) {
            if (socketExists != -1) {
                roomIndex = dictionary.findIndex(elem => elem.roomId == msgObj.roomId)
                socketIndex = dictionary[roomIndex].sockets.findIndex(elem => elem.socket == msgObj.socket)
                dictionary[roomIndex].sockets.splice(socketIndex, 1);
                for (const iterator of dictionary) {
                    console.log(iterator);
                }
                console.log("------------------------------")
            } else {
                server.send(msg + " socket is not in the room", senderInfo.port, senderInfo.address)
            }
        } else {
            server.send(msg + " roomId does not exists", senderInfo.port, senderInfo.address)
        }
    }
}
);

server.on('listening', () => {
    console.log(" Server is listening")
});

server.on("close", () => {
    console.log("Disconnected!");
});

server.bind(5500);