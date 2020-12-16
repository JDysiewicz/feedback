import React, { useEffect, useState } from "react";
import axios from "axios";
import { StaticContext } from "react-router";
import { Redirect, RouteComponentProps } from "react-router-dom";

import { NewRoomProps, SplashScreenLocationState } from "types";
import { isAxiosError } from "src/utils/isAxiosError";
import { generateNewRoomProps } from "src/utils/generateNewRoomsProps";

// eslint disable here as RouteComponentProps needs an 'any' as first argument

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SplashScreen:
React.FC<RouteComponentProps<any, StaticContext, SplashScreenLocationState>>
= (props: RouteComponentProps<any, StaticContext, SplashScreenLocationState>): JSX.Element => {
    const [roomId, setRoomId] = useState<string>("");
    const [redirect, setRedirect] = useState<NewRoomProps>();

    // If redirected here and have a message to be displayed e.g when room closes will be redirected here with a message in the
    // props.location.state
    useEffect(() => {
        if (props.location.state !== undefined){
            alert(props.location.state.message);
        }
    }, []);


    const createRoom = async () => {
        try {
            // Makes sure not to duplicate rooms if 1/1,000,000 chance happens
            const { data: currentRooms } = await axios.get("/api/current-rooms");
            const newRoomProps = generateNewRoomProps(currentRooms as string[]);
            setRedirect(newRoomProps);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const joinRoom = async () => {
        if (roomId === ""){
            alert("Room ID empty");
            return;
        }
        try {
            // Will error if not valid room (axios will return error 400 which counts as error)
            await axios.get("/api/valid-room", {params: {boardId: roomId}});
            setRedirect({search: `?board=${roomId}`, roomCreator: false});

        } catch (err: unknown) {
            if (isAxiosError(err)) {
                if (err.response?.status === 400){
                    alert(err.response.data.message + ` (${roomId})`);
                    
                } else {
                    alert("Something went wrong.");
                }
            } else {
                alert("Something went wrong.");
            }
            setRoomId("");
        }
    };

    // Redirects to the feedback board passing in the appropriate props to props.location.state
    if (redirect !== undefined){
        return (
            <Redirect to={{
                pathname: "/board",
                search: redirect.search,
                state: { roomCreator: redirect.roomCreator, fromRedirect: true }
            }} />
        );
    }

    return (
        <div className="SplashScreen-main-div">

            <h1>Anonymous Feedback</h1>
            <button onClick={() => createRoom()}>Create a room</button>

            <h3>OR</h3>

            <div className="SplashScreen-join-room">
                <label htmlFor="room-id">RoomID:</label>
                <input id="room-id" name="room-id"
                    value={roomId} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)} 
                    placeholder="Enter Room ID" />
                <button onClick={() => joinRoom()}>Join an existing room using Room ID</button>
            </div>

        </div>
    );
};

export default SplashScreen;