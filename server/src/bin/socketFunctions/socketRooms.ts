import { Socket } from "socket.io";
import { Message, BoardMessageList } from "../../../../types";
import { boardMessageLists } from "../../utils/boardMessageLists";


export const socketRooms = (socket: Socket, io: SocketIO.Server, boardId: string) => {

    // Join the room which socket id matches

    socket.join(boardId);

    // If the room is freshly created, create the info about it in memory
    if (!boardMessageLists[boardId]) {
        const newBoardMessageList: BoardMessageList = {creator: socket.id, boardId: boardId, messages: [] as Message[], hideVotes: true};
        boardMessageLists[boardId] = newBoardMessageList;
    }
};

