import React from "react";
import { FeedbackGridProps } from "types";
import FeedbackMessage from "./FeedbackMessage";

const FeedbackGrid: React.FC<FeedbackGridProps> = ({messageList, votedMessages, hideVotes, voteMessage}: FeedbackGridProps): JSX.Element => {

    const renderList = () : JSX.Element[] => {
        return messageList.map((message) => {
            const indexOfVoted = votedMessages.findIndex(msg => msg.messageId === message.id);
            const personalVote = indexOfVoted === -1 ? 0 : votedMessages[indexOfVoted].personalVotes;
            return (
                <FeedbackMessage key={message.id} hideVotes={hideVotes} voteMessage={voteMessage} message={message} personalVote={personalVote} />
            );
        });
    };
    return <>{renderList()}</>;
};

export default FeedbackGrid;