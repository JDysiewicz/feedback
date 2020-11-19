import React from "react";

interface CreatorOptionsProps {
    socket: SocketIOClient.Socket;
    boardId: string;
    toggleHideVotes: () => void;
}

const CreatorOptions: React.FC<CreatorOptionsProps> = (props: CreatorOptionsProps): JSX.Element => {
    return (
        <div>
            <button onClick={() => props.toggleHideVotes()}>Toggle Vote Visibility</button>
        </div>
    );
};


export default CreatorOptions;