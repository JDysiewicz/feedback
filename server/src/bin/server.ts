// Imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
const socketio = require("socket.io");
import http from "http";
import app from "../index";
import { socketSetup } from "./socketFunctions/index";

// Constants
const SOCKET_URL = process.env.NODE_ENV === "production" ?
    "https://feedback-dysiewicz.herokuapp.com" :
    "http://localhost:3000";
     
const PORT = process.env.PORT || 5000;

// WebSockets
const server = http.createServer(app);
const io: SocketIO.Server = socketio(server, {cors: {origin: SOCKET_URL, methods:["GET", "POST"] }});
socketSetup(io);

// Run server
server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});




