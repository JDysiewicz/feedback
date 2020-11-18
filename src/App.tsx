import React, { useState } from "react";
import io from "socket.io-client";
import { downloadFeedback } from "./utils/dowloadFeedback";
import { Message } from "../types";

// Outside main App so doesn't create a new socket on every 
// component re-render
const ENDPOINT = "localhost:5000";
const socket: SocketIOClient.Socket = io(ENDPOINT);
socket.connect();

const App: React.FC = () => {

    const [messageList, setMessageList] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");

    socket.on("message", (messageList: Message[]) => {
        setMessageList(messageList);
    });

    const upvoteMessage = (message: Message, value: number) => {
        socket.emit("upvote", {message, value});
    };

    const renderList = () : JSX.Element[] => {
        return messageList.map((message: Message) => {
            return (
                <li key={message.message}>
                    <div style={{display: "flex"}}>
                        <p>Message: {message.message}, Upvotes: {message.upvotes}</p>
                        <button onClick={() => upvoteMessage(message, 1)}>Upvote</button>
                        <button onClick={() => upvoteMessage(message, -1)}>Downvote</button>
                    </div>
                </li>
            );
        });
    };

    const handleClick = (): void => {
        const user: string = socket.id;
        const newMessage: Message = {user, message, upvotes: 0};
        socket.emit("message", newMessage);
        setMessage("");
        return;
    };

    return(
        <div>
            <h1>Hello</h1>
            <ul>
                {renderList()}
            </ul>
            <button onClick={() => downloadFeedback(messageList)}>Download Feedback</button>
            <input value={message} placeholder="Write a message" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => handleClick()}>Submit Message</button>
        </div>
    );
};

export default App;