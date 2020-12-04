import React from "react";

import { FeedbackMessageProps } from "types";

const FeedbackMessage:
React.FC<FeedbackMessageProps>
= ({message, personalVote, voteMessage, hideVotes}: FeedbackMessageProps) => {

    const personalVoteBackground = (personalVote: number): string => {
        switch (personalVote){
        case 3:
            return "strong-agree";
        case 2:
            return "agree";
        case 1:
            return "partial-agree";
        case 0:
            return "neutral";
        case -1:
            return "partial-disagree";
        case -2:
            return "disagree";
        case -3:
            return "strong-disagree";
        default:
            return "";
        }
    };

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