import { Message } from "../../../types";
import mongoose from "mongoose";

const Board = mongoose.model("boards");
interface MongoFeedbackBoard {
    _id: string;
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
    __v: number;
}

const generateId = () => {
    let id = "";
    const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";
    const ID_LENGTH = 8; 
    for (let i = 0; i < ID_LENGTH; i++){
        id += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return id;
};

export const addIdToMessage = async (newMessage: {user: string, message: string, upvotes: number}, boardId: string): Promise<Message | Error> => {
    // Generated random 8 length string of number/letters
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const currentIds = existingBoard.messages.map(message => message.id);

        // Generate an ID that isn't already in use
        let id = generateId();
        while (currentIds.indexOf(id) !== -1) id = generateId();
    
        const generatedNewMessage: Message = {...newMessage, id};
        return generatedNewMessage;
    } catch (err: unknown){
        return new Error(err as string);
    }

};