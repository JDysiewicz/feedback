import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import io from "socket.io-client";

import { downloadFeedback } from "../utils/dowloadFeedback";
import { ChatBoardProps, Message, PersonalVotedMessage } from "types";
import CreatorOptions from "./CreatorOptions";
import {
    socketEmitNewMessage,
    socketEmitUpvote,
    socketOnCreatorDC,
    socketOnError,
    socketOnMessageList,
    socketOnVoteVis
} from "src/utils/socketFunctions";
import { messageValidator } from "src/utils/messageValidator";
import FeedbackGrid from "./FeedbackGrid";

// Outside main App so doesn't create a new socket on every 
// component re-render.
const ENDPOINT = process.env.NODE_ENV === "production" ?
    "https://feedback-dysiewicz.herokuapp.com" :
    "localhost:5000";
const NUM_VOTES = 3;

const ChatBoard:
React.FC<ChatBoardProps>
= ({boardId, didCreate}: ChatBoardProps): JSX.Element => {

    // Stateful vars
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [redirect, setRedirect] = useState<string>("");
    const [warning, setWarning] = useState<string>();
    const [hideVotes, setHideVotes] = useState<boolean>(true); // Note: When a user joins, the 'socketOnVoteVis' function runs which reverses the current vote vis.
    // This means that whatever this is initially set to, will instantly get reversed. Hence why this is initialised to be 'false'
    // meaning that it will become 'true' when users first join. This is an issue with refactoring out the socket functions into a separate file.
    const [votedMessages, setVotedMessages] = useState<PersonalVotedMessage[]>([]);

    // Set up socket connection and listeners
    useEffect(() => {
        setSocket(io.connect(ENDPOINT, {query: `board=${boardId}`}));
        return () => {
            if (socket) socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;
        socketOnVoteVis(socket, setHideVotes);
        socketOnMessageList(socket, setMessageList);
        socketOnError(socket);
        socketOnCreatorDC(socket, setWarning, setRedirect);
    }, [socket]);

    // Return loading spinner if waiting on socket, or redirect if disconnected
    if (!socket) return <div></div>;
    if (redirect) return <Redirect to={{pathname: "/", state: {message: "Disconnected due to admin inactivity"}}} />;
    
    const voteMessage = (message: Message, value: number) => {
        const indexOfVoted = votedMessages.findIndex(msg => msg.messageId === message.id);
        // If not in votedMessages array, add it to it and give it a personal vote of +1/-1
        // Else, update its votes
        if (indexOfVoted === -1){
            setVotedMessages([...votedMessages, {messageId: message.id, personalVotes: value}]);
        } else {
            const votedMessage = votedMessages[indexOfVoted];
            const newVotedMessage = {...votedMessage, personalVotes: votedMessage.personalVotes + value};
            if (Math.abs(newVotedMessage.personalVotes) > NUM_VOTES) return alert("Can only vote 3 times per item");
            const newVotedMessageArray = votedMessages.filter(msg => msg.messageId !== message.id);
            setVotedMessages([...newVotedMessageArray, newVotedMessage]);
        }
        socketEmitUpvote(socket, message, value);
        
    };

    const handleClick = (): void => {
        const err: string | null = messageValidator(message);
        if (err) {
            alert(err);
            return;
        }
        socketEmitNewMessage(socket, message);
        setMessage("");
    };

    return(
        <div className="ChatBoard-main-div">
            <div className="ChatBoard-header-content">
                <div className="ChatBoard-info">
                    <div>
                        <h1>Anonymous Feedback</h1>
                        <h3>RoomID: {boardId}</h3>
                    </div>
                </div>
                <div className="ChatBoard-temp">
                    {didCreate && <CreatorOptions socket={socket} boardId={boardId} />}
                </div>
                <button className="ChatBoard-download" onClick={() => downloadFeedback(messageList)}>Download Feedback</button>
                {warning && <h3 style={{color: "red"}}>{warning}</h3>}
            </div>
            <div className="ChatBoard-feedback-list">
                <div className="ChatBoard-feedback-grid">
                    <FeedbackGrid messageList={messageList} votedMessages={votedMessages} hideVotes={hideVotes} voteMessage={voteMessage} />
                </div>
            </div>
            <div className="ChatBoard-write-message">
                <label htmlFor="write-message">Write a Message: </label>
                <textarea id="write-message" name="write-message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button id="submit-message" name="submit-message" onClick={() => handleClick()}>Submit Message</button>
            </div>
        </div>
    );
};

export default ChatBoard;