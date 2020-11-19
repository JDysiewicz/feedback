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


