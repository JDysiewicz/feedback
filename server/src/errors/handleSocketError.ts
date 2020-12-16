import { Socket } from "socket.io";
import SocketError from "./SocketError";

export const handleSocketError = (err: unknown, socket: Socket): void => {
    if (err instanceof Error) console.log(new SocketError(err, err.message));
    if (typeof err === "string") console.log(new SocketError(new Error(err), "Something went wrong"));
    socket.emit("error", "Internal socket error.");
};