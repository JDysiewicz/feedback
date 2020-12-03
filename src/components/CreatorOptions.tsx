import React from "react";

import { CreatorOptionsProps } from "types";

const CreatorOptions: React.FC<CreatorOptionsProps> = (props: CreatorOptionsProps): JSX.Element => {
    const toggleHideVotes = () => {
        props.socket.emit("toggle-votes");
    };
    return (
        <div>
            <button onClick={() => toggleHideVotes()}>Toggle Vote Visibility</button>
        </div>
    );
};

export default CreatorOptions;