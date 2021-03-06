import React, { useState, useEffect } from "react";
import axios from "axios";
import qs from "query-string";
import { RouteComponentProps, StaticContext } from "react-router";

import { isAxiosError } from "src/utils/isAxiosError";
import ChatBoard from "./ChatBoard";
import Error404Page from "./Error404Page";
import { RouteValidatorLocationState } from "types";
import { validateQueryParams } from "src/utils/validateQueryParams";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RouteValidator:
React.FC<RouteComponentProps<any, StaticContext, RouteValidatorLocationState>>
= (props: RouteComponentProps<any, StaticContext, RouteValidatorLocationState>): JSX.Element => {
    
    const [renderChatBoard, setRenderChatBoard] = useState<null | boolean>(null);
    const [redirectProps, setRedirectProps] = useState<{boardId: string, didCreate: boolean}>({boardId: "", didCreate: false});

    useEffect(() => {

        // No async useEffect yet so have to define function inside and then run it.
        const asyncUseEffect = async () => {
            const validQueryParams = validateQueryParams(props.location.search);
            if (!validQueryParams) {
                setRenderChatBoard(false);
                return;
            }

            // Will have a .board if this passes
            const boardId = qs.parse(props.location.search).board as string;

            // If here from a redirect, then set props for ChatBoard - all good. 
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
                        // No room exists by that ID
                        alert(err.response.data.message + ` (${boardId})`);
                        
                    } else {
                        // Catch-all
                        alert("Something went wrong.");
                    }
                } else {
                    // Catch-all
                    alert("Something went wrong.");
                }

                // If catching an error at all, don't display the ChatBoard.
                setRenderChatBoard(false);
                return;
            }

            // If they attempted to create a new board via url, prevent it.
            if (validBoard !== true){
                setRenderChatBoard(false);
                return;
            }
            
            // If all checks out, they must be attempting to join a room that exists
            setRedirectProps({boardId, didCreate: false});
            setRenderChatBoard(true);
        };

        // No top level useEffect async yet....
        asyncUseEffect();
    }, []);
    

    if (renderChatBoard === null) return <div></div>; // Return loading spinner in future
    else if (renderChatBoard === false) return <Error404Page />; // Error 404 page with link to home
    else return <ChatBoard {...redirectProps} />; // All good, render ChatBoard, passing in props
};

export default RouteValidator;