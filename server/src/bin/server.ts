import { Socket } from "socket.io";
import app from "../index";


const PORT = process.env.PORT || 5000;
const messageList: Array<{user: string; message: string; upvotes: number}> = [];
// WebSocket setup
const socketio =  require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server, {cors: {origin: "http://localhost:3000", methods:["GET", "POST"] }});

io.on("connection", (socket: Socket) => {
    console.log("USER JOINED!")
    // Send all the curent messages to the new connection
    socket.emit("message", messageList);

    socket.on("upvote", ({message, value}) => {
        const idx: number = messageList.findIndex(msg => msg.message === message.message);
        messageList[idx] = {...message, upvotes: message.upvotes+value};
        io.emit("message", messageList);
    });

    // Update messageList with newMessage and send the update to everyone
    socket.on("message", newMessage => {
        messageList.push(newMessage);
        io.emit("message", messageList);
    });

});

server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});

export default io;
