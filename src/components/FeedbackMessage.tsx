import React from "react";
import { personalVoteBackground } from "src/utils/personalVoteBackground";

import { FeedbackMessageProps } from "types";

const FeedbackMessage:
React.FC<FeedbackMessageProps>
= ({message, personalVote, voteMessage, hideVotes}: FeedbackMessageProps) => {
    return (
        <div className="FeedbackMessage-main-div">
            <div className={`FeedbackMessage-personal-vote ${personalVoteBackground(personalVote)}`}>
                <strong>{personalVote}</strong>
            </div>

            <div className="FeedbackMessage-info">
                <div style={{alignSelf: "flex-end"}}>
                    <button className="FeedbackMessage-downvote-button" onClick={() => voteMessage(message, -1)}></button>
                    <button className="FeedbackMessage-upvote-button"  onClick={() => voteMessage(message, 1)}></button>
                </div>
                <p>{message.message} </p>
                <p> <strong>Total Votes: {!hideVotes ? message.upvotes : <i style={{color: "grey"}}>hidden by room owner</i>} </strong></p>
            </div>
        </div>
    );
};

export default FeedbackMessage;