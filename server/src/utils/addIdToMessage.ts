import { Message } from "../../../types";
import { boardMessageLists } from "./boardMessageLists";

const generateId = () => {
    let id = "";
    const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";
    const ID_LENGTH = 8; 
    for (let i = 0; i < ID_LENGTH; i++){
        id += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return id;
};

export const addIdToMessage = (newMessage: {user: string, message: string, upvotes: number}, boardIdx: number): Message => {
    // Generated random 8 length string of number/letters
    console.log("REPLICATING", boardMessageLists)
    const currentIds = boardMessageLists[boardIdx].messages.map(message => message.id);

    // Generate an ID that isn't already in use
    let id = generateId();
    while (currentIds.indexOf(id) !== -1) id = generateId();

    const generatedNewMessage: Message = {...newMessage, id};
    return generatedNewMessage;
};