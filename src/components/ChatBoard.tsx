import React, { useState, useEffect } from "react";
import qs from "query-string";
import io from "socket.io-client";
import { downloadFeedback } from "../utils/dowloadFeedback";
import { Message } from "../../types";

// Outside main App so doesn't create a new socket on every 
// component re-render.
// const ENDPOINT = process.env.ENDPOINT || "localhost:5000";
const ENDPOINT = "https://feedback-dysiewicz.herokuapp.com";

const ChatBoard: React.FC = (): JSX.Element => {

    if (window.location.search === "") return <div></div>;

    const [messageList, setMessageList] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    // const [title, setTitle] = useState<string>("Feedback Board");

    const [boardId, setBoardId] = useState<string>("");
    const [socket, setSocket] = useState<SocketIOClient.Socket>();

    useEffect(() => {
        if (window.location.search === "") return;
        const newBoardId = qs.parse(window.location.search).board as string;
        setBoardId(newBoardId);
        setSocket(io.connect(ENDPOINT, {query: `board=${newBoardId}`}));

        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    if (!socket) return <div></div>;


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
            {/* <input style={{border: "none", fontSize: "3rem"}}
                value={title} onChange={(e) => setTitle(e.target.value)} /> */}
            <h1>Anonymous Feedback</h1>
            <h2>RoomID: {boardId}</h2>
            <ul>
                {renderList()}
            </ul>
            <button onClick={() => downloadFeedback(messageList)}>Download Feedback</button>
            <input value={message} placeholder="Write a message" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => handleClick()}>Submit Message</button>
        </div>
    );
};

export default ChatBoard;