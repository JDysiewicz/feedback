import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "query-string";
import { RouteComponentProps, StaticContext } from "react-router";

import { isAxiosError } from "src/utils/isAxiosError";
import ChatBoard from "./ChatBoard";
import Error404Page from "./Error404Page";


interface RouteValidatorLocationState {
    roomCreator: boolean;
    boardId: string;
    fromRedirect?: boolean;
}

const RouteValidator:
React.FC<RouteComponentProps<any, StaticContext, RouteValidatorLocationState>>
= (props: RouteComponentProps<any, StaticContext, RouteValidatorLocationState>): JSX.Element => {
    
    const [renderChatBoard, setRenderChatBoard] = useState<null | boolean>(null);
    const [redirectProps, setRedirectProps] = useState<{boardId: string, didCreate: boolean}>({boardId: "", didCreate: false});

    useEffect(() => {
        const asyncUseEffect = async () => {
            const queryParam = props.location.search;
            console.log(queryParam);

            // RegEx to match for the boardId in the search query - if doesnt match then will render 404 page
            if (!/^\?board=[0-9]*$/.test(queryParam)) {
                setRenderChatBoard(false);
                return;
            }

            // Will have a .board if this passes
            const boardId = qs.parse(props.location.search).board as string;

            // If here from a redirect, then set props for ChatBoard 
            if (props.location.state){
                setRedirectProps({boardId, didCreate: props.location.state.roomCreator});
                setRenderChatBoard(true);
                return;
            }
    
            // If here from a URL link, need to validate that they are attempting to join an existing room, not create their own
            let validBoard;
            try {
                const axiosResponse = await axios.get("/api/valid-room", { params: {boardId} });
                if (axiosResponse.status === 200) validBoard = true;
            } catch (err: unknown) {
                if (isAxiosError(err)) {
                    if (err.response?.status === 400){
                        alert(err.response.data.message + ` (${boardId})`);
                        
                    } else {
                        alert("Something went wrong.");
                    }
                } else {
                    alert("Something went wrong.");
                }
                setRenderChatBoard(false);
                return;
            }

            // If they attempted to create a new board via url, prevent it.
            if (validBoard !== true){
                setRenderChatBoard(false);
                return;
            }
            
            // If all checks out, they must be attempting to join a room.
            setRedirectProps({boardId, didCreate: false});
            setRenderChatBoard(true);
        };

        // No top level useEffect async yet....
        asyncUseEffect();
    }, []);
    

    if (renderChatBoard === null) return <div></div>; // Return loading spinner in future
    else if (renderChatBoard === false) return <Error404Page />; // Error 404 page with link to home
    else return <ChatBoard {...redirectProps} />;
};

export default RouteValidator;