export interface Message{
    user: string;
    message: string;
    upvotes: number;
    id: string;
};
export interface BoardMessageList{
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
};
export interface BoardMessageListObject {
    [key: string]: BoardMessageList
};

export interface ChatBoardLocationState {
    roomCreator: boolean;
}

export interface PersonalVotedMessage {
    messageId: string;
    personalVotes: number;
}

export interface CreatorOptionsProps {
    socket: SocketIOClient.Socket;
    boardId: string;
    toggleHideVotes: () => void;
}

export interface NewRoomProps{
    search: string;
    roomCreator: boolean;
}

export interface SplashScreenLocationState{
    message: string;
}

export interface SocketQuery{
    EIO?: string;
    transport?: string;
    t?: string;
    board?: string;
}