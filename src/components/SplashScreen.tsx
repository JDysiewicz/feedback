import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// import ChatBoard from "./components/ChatBoard";

const SplashScreen: React.FC = (): JSX.Element => {

    const [roomId, setRoomId] = useState<string>("");
    const [redirect, setRedirect] = useState<string>("");

    const createRoom = () => {
        const tempRoomId = Math.random().toString();
        const tempLink = `/board?board=${tempRoomId}`;
        setRedirect(tempLink);
    };

    const joinRoom = () => {
        if (roomId === ""){
            console.log("Room ID empty");
            return;
        }
        // Check whether rooms exists via express route and axios later
        setRedirect(`/board?board=${roomId}`);
    };

    if (redirect.length !== 0) return <Redirect to={redirect} />;

    return (
        <div>
            <button onClick={() => createRoom()}>Create a room</button>
            <input value={roomId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)} placeholder="Room ID" />
            <button onClick={() => joinRoom()}>Join an existing room using Room ID</button>
        </div>
    );
};

export default SplashScreen;