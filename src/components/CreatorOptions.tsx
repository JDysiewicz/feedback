import React from "react";
import { CreatorOptionsProps } from "../../types";

const CreatorOptions: React.FC<CreatorOptionsProps> = (props: CreatorOptionsProps): JSX.Element => {
    return (
        <div>
            <button onClick={() => props.toggleHideVotes()}>Toggle Vote Visibility</button>
        </div>
    );
};


export default CreatorOptions;