import { Message, MongoFeedbackBoard } from "../../../types";
import mongoose from "mongoose";

const Board = mongoose.model("boards");

export const addIdToMessage = async (newMessage: {user: string, message: string, upvotes: number}, boardId: string): Promise<Message | Error> => {
    try {
        const existingBoard: MongoFeedbackBoard = (await Board.findOne({boardId: boardId}) as unknown) as MongoFeedbackBoard;
        const currentIds = existingBoard.messages.map(message => message.id);

        let id = generateRandomId();
        while (currentIds.indexOf(id) !== -1) id = generateRandomId();
    
        const generatedNewMessage: Message = {...newMessage, id};
        return generatedNewMessage;
    } catch (err: unknown){
        return new Error(err as string);
    }
};

const generateRandomId = () => {
    let id = "";
    const CHARSET = "abcdefghijklmnopqrstuvwxyz0123456789";
    const ID_LENGTH = 8; 
    for (let i = 0; i < ID_LENGTH; i++){
        id += CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
    }
    return id;
};