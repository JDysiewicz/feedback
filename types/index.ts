// Message that is stored in the BoardMessageList messages property
export interface Message{
    user: string;
    message: string;
    upvotes: number;
    id: string;
};

// The message list of each board created
export interface BoardMessageList{
    creator: string;
    boardId: string;
    messages: Message[];
    hideVotes: boolean;
};

// The object used to store each message board; stored as an object where key = boardId
export interface BoardMessageListObject {
    [key: string]: BoardMessageList
};

// React Router LocationState for the ChatBoard component
export interface ChatBoardLocationState {
    roomCreator: boolean;
    fromRedirect?: boolean;
}

// Used to keep track of which messages an individual has voted for client-side
export interface PersonalVotedMessage {
    messageId: string;
    personalVotes: number;
}

// Props for the CreatorOptions component
export interface CreatorOptionsProps {
    socket: SocketIOClient.Socket;
    boardId: string;
    toggleHideVotes: () => void;
}

// Props for the NewRoom component
export interface NewRoomProps{
    search: string;
    roomCreator: boolean;
}

// React Router locationState for SplashScreen component
export interface SplashScreenLocationState{
    message: string;
}

// The query sent to the backend when registering a new board
export interface SocketQuery{
    EIO?: string;
    transport?: string;
    t?: string;
    board?: string;
}

export interface FeedbackMessageProps {
    message: Message;
    personalVote: number;
    voteMessage: (message: Message, value: number) => void;
    hideVotes: boolean;
}