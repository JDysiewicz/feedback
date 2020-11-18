// Imports
const socketio =  require("socket.io");
const http = require("http");
import app from "../index";
import { socketSetup } from "./socketFunctions/index";

// Constants
// const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3000";
const SOCKET_URL = "https://feedback-dysiewicz.herokuapp.com";
const PORT = process.env.PORT || 5000;

// WebSockets
const server = http.createServer(app);
const io: SocketIO.Server = socketio(server, {cors: {origin: SOCKET_URL, methods:["GET", "POST"] }});
socketSetup(io);

// Run server
server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});




