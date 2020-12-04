import React from "react";
import { socketEmitVoteVis } from "src/utils/socketFunctions";

import { CreatorOptionsProps } from "types";

const CreatorOptions: React.FC<CreatorOptionsProps> = (props: CreatorOptionsProps): JSX.Element => {
    
    const toggleHideVotes = () => {
        socketEmitVoteVis(props.socket);
    };

    return (
        <div>
            <button onClick={() => toggleHideVotes()}>Toggle Vote Visibility</button>
        </div>
    );
};

export default CreatorOptions;