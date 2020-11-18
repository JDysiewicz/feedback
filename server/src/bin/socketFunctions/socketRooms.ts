import { Socket } from "socket.io";
import { Message, BoardMessageList } from "../../../../types";
import { boardMessageLists } from "../../utils/boardMessageLists";


// Everyone joins main room for now
export const socketRooms = (socket: Socket, io: SocketIO.Server, boardId: string) => {
    socket.join(boardId);
    if (boardMessageLists.filter(messageList => messageList.boardId === boardId).length === 0) {
        const newBoardMessageList: BoardMessageList = {boardId: boardId, messages: [] as Message[]};
        boardMessageLists.push(newBoardMessageList);
    }
};

