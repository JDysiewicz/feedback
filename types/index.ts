export interface Message{
    user: string;
    message: string;
    upvotes: number;
};
export interface BoardMessageList{
    boardId: string;
    messages: Message[];
};


