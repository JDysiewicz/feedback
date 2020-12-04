// Add as much validation here as needed for messages. Will return null if all checks pass, else returns a string to be displayed as 
// an alert error.

export const messageValidator = (message: string): string | null => {
    if (message.length === 0) return "Message cannot be empty";
    if (message.includes("\n")) return "New line characters are not permitted";
    if (message.length > 150) return "Maximum character limit of 300";
    return null;
};