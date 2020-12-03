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

// Used to keep track of which messages an individual has voted for client-side
export interface PersonalVotedMessage {
    messageId: string;
    personalVotes: number;
}

// Props for the CreatorOptions component
export interface CreatorOptionsProps {
    socket: SocketIOClient.Socket;
    boardId: string;
}

// Props for the NewRoom component
export interface NewRoomProps{
    search: string;
    roomCreator: boolean;
}

// Props for ChatBoard
export interface ChatBoardProps {
    boardId: string;
    didCreate: boolean
}

// Props passed to FeedbackMessage
export interface FeedbackMessageProps {
    message: Message;
    personalVote: number;
    voteMessage: (message: Message, value: number) => void;
    hideVotes: boolean;
}

// React Router locationState for SplashScreen component
export interface SplashScreenLocationState{
    message: string;
}

// The props passed into RouteValidator via React Router
export interface RouteValidatorLocationState {
    roomCreator: boolean;
    boardId: string;
    fromRedirect?: boolean;
};


// The query sent to the backend when registering a new board
export interface SocketQuery{
    EIO?: string;
    transport?: string;
    t?: string;
    board?: string;
}

