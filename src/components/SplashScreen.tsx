import React, { useEffect, useState } from "react";
import { StaticContext } from "react-router";
import { Redirect, RouteComponentProps } from "react-router-dom";

// import ChatBoard from "./components/ChatBoard";

interface NewRoomProps{
    search: string;
    roomCreator: boolean;
}

interface SplashScreenLocationState{
    message: string;
}

const SplashScreen: React.FC<RouteComponentProps<any, StaticContext, SplashScreenLocationState>> = (props: RouteComponentProps<any, StaticContext, SplashScreenLocationState>): JSX.Element => {
    const [roomId, setRoomId] = useState<string>("");
    const [redirect, setRedirect] = useState<NewRoomProps>();

    useEffect(() => {
        if (props.location.state !== undefined){
            alert(props.location.state.message);
        }
    }, []);

    // Right now, no checking for if roomId exists - just relying on that 1/million chance of two rooms simultaneously
    // existing :/
    const createRoom = () => {
        const newRoomId = (Math.random()*1000000).toString().split(".")[0];
        const newRoomProps: NewRoomProps = {search: `?board=${newRoomId}`, roomCreator: true };
        setRedirect(newRoomProps);
    };

    const joinRoom = () => {
        if (roomId === ""){
            console.log("Room ID empty");
            return;
        }
        // Check whether rooms exists via express route and axios later
        setRedirect({search: `?board=${roomId}`, roomCreator: false});
    };

    // Redirects to the feedback board passing in the appropriate props to props.location.state
    if (redirect !== undefined){
        return (
            <Redirect to={{
                pathname: "/board",
                search: redirect.search,
                state: { roomCreator: redirect.roomCreator }
            }} />
        );
    }

    return (
        <div>
            <button onClick={() => createRoom()}>Create a room</button>
            <input value={roomId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)} placeholder="Room ID" />
            <button onClick={() => joinRoom()}>Join an existing room using Room ID</button>
        </div>
    );
};

export default SplashScreen;