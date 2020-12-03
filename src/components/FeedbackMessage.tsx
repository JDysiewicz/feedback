import React from "react";

import { FeedbackMessageProps } from "types";

const FeedbackMessage:
React.FC<FeedbackMessageProps>
= ({message, personalVote, voteMessage, hideVotes}: FeedbackMessageProps) => {
    return (
        <div className="FeedbackMessage-main-div">
            <p>{message.message} </p>
            <div className="FeedbackMessage-voting-buttons">
                <button style={{backgroundColor: "green"}} onClick={() => voteMessage(message, 1)}>Upvote</button>
                <button onClick={() => voteMessage(message, -1)}>Downvote</button>
            </div>
            <div className="FeedbackMessage-votes">
                <p>Personal Vote: {personalVote} </p>
                <p> <strong>Total Votes: {!hideVotes ? message.upvotes : <i style={{color: "grey"}}>hidden by room owner</i>} </strong></p>
            </div>
        </div>
    );
};

export default FeedbackMessage;