import { Message } from "types";

// Listeners
export const socketOnMessageList
= (socket: SocketIOClient.Socket, setMessageList: (messageList: Message[]) => void): void => {
    socket.on("message", (messageList: Message[]) => {
        setMessageList(messageList);
    });
};

export const socketOnError
= (socket: SocketIOClient.Socket): void => {
    socket.on("error", (errorMessage: string) => {
        alert(`Error: ${errorMessage}`);
    });
};

export const socketOnVoteVis
= (socket: SocketIOClient.Socket, setHideVotes: (voteVis: boolean) => void): void => {
    socket.on("toggle-votes", (voteVis: boolean) => {
        setHideVotes(voteVis);
    });
};

export const socketOnCreatorDC
= (socket: SocketIOClient.Socket, setWarning:(str: string) => void, setRedirect: (str: string) => void): void => {
    socket.on("creator-disconnect", (message: {msg: string, timeout: number}) => {
        setWarning(message.msg);
        setTimeout(() => {
            socket.close();
            setWarning("");
            setRedirect("/");
        }, message.timeout);
    });
};

// Emits
export const socketEmitNewMessage = (socket: SocketIOClient.Socket, message: string): void => {
    const user: string = socket.id;
    const newMessage = {user, message, upvotes: 0};
    socket.emit("message", newMessage);
};

export const socketEmitUpvote = (socket: SocketIOClient.Socket, message: Message, value: number): void => {
    socket.emit("upvote", {message, value});
};