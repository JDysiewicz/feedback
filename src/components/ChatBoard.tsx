import React, { useState, useEffect } from "react";
import qs from "query-string";
import io from "socket.io-client";
import { downloadFeedback } from "../utils/dowloadFeedback";
import { Message } from "../../types";
import { Redirect, RouteComponentProps, StaticContext } from "react-router";
import CreatorOptions from "./CreatorOptions";

// Outside main App so doesn't create a new socket on every 
// component re-render.
// const ENDPOINT = process.env.ENDPOINT || "localhost:5000";
const ENDPOINT = process.env.NODE_ENV === "production" ?
    "https://feedback-dysiewicz.herokuapp.com" :
    "localhost:5000";

interface ChatBoardLocationState {
    roomCreator: boolean;
}

interface PersonalVotedMessage {
    messageId: string;
    personalVotes: number;
}

const NUM_VOTES = 3;

const ChatBoard: React.FC<RouteComponentProps<any, StaticContext, ChatBoardLocationState>> = (props: RouteComponentProps<any, StaticContext, ChatBoardLocationState>): JSX.Element => {

    // Return nothing if not redirected here
    if (props.location.search === "") return <div>Please create or join a room</div>;

    const [messageList, setMessageList] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>("");
    const [boardId, setBoardId] = useState<string>("");
    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [didCreateRoom, setDidCreateRoom] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<string>("");
    const [warning, setWarning] = useState<string>();
    const [hideVotes, setHideVotes] = useState<boolean>(true);
    const [votedMessages, setVotedMessages] = useState<PersonalVotedMessage[]>([]);

    useEffect(() => {
        // Don't run if there's no search param for the board - here as a safety net from above
        if (props.location.search === "") return;

        // If here from the Redirect or not
        if (props.location.state !== undefined){
            const didCreate = props.location.state.roomCreator;
            setDidCreateRoom(didCreate);
        }
        const newBoardId = qs.parse(props.location.search).board as string;
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

    socket.on("initial-vote-visibility", (voteVis: boolean) => {
        console.log("VOTE VIS", voteVis);
        setHideVotes(voteVis);
    });

    socket.on("creator-disconnect", (message: {msg: string, timeout: number}) => {
        setWarning(message.msg);
        setTimeout(() => {
            socket.close();
            setWarning("");
            setRedirect("/");
        }, message.timeout);
        return;
    });

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
        socket.emit("upvote", {message, value});
    };

    const renderList = () : JSX.Element[] => {
        return messageList.map((message: Message) => {
            const indexOfVoted = votedMessages.findIndex(msg => msg.messageId === message.id);
            const personalVote = indexOfVoted === -1 ? 0 : votedMessages[indexOfVoted].personalVotes;
            return (
                <li key={message.id}>
                    <div style={{display: "flex"}}>
                        <p>Message: {message.message} </p>
                        <p>Personal Votes: {personalVote}</p>
                        {!hideVotes && <p>Total Votes: {message.upvotes}</p>}
                        <button onClick={() => voteMessage(message, 1)}>Upvote</button>
                        <button onClick={() => voteMessage(message, -1)}>Downvote</button>
                    </div>
                </li>
            );
        });
    };

    const toggleHideVotes = () => {
        socket.emit("toggle-votes");
    };

    socket.on("toggle-votes", () => {
        setHideVotes(!hideVotes);
    });

    const handleClick = (): void => {
        const user: string = socket.id;
        const newMessage = {user, message, upvotes: 0};
        socket.emit("message", newMessage);
        setMessage("");
        return; 
    };

    if (redirect) return <Redirect to={{pathname: "/", state: {message: "Disconnected due to admin inactivity"}}} />;

    return(
        <div>
            {/* <input style={{border: "none", fontSize: "3rem"}}
                value={title} onChange={(e) => setTitle(e.target.value)} /> */}
            <h1>Anonymous Feedback</h1>
            <h2>RoomID: {boardId}</h2>
            {warning && <h2 style={{color: "red"}}>{warning}</h2>}
            <ul>
                {renderList()}
            </ul>
            <button onClick={() => downloadFeedback(messageList)}>Download Feedback</button>
            <input value={message} placeholder="Write a message" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => handleClick()}>Submit Message</button>
            <p><strong>3 Votes Per Item</strong></p>
            {didCreateRoom && <CreatorOptions socket={socket} boardId={boardId} toggleHideVotes={toggleHideVotes}/>}
        </div>
    );
};

export default ChatBoard;