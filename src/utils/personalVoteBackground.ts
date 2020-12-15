export const personalVoteBackground = (personalVote: number): string => {
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