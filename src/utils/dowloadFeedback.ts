interface Message{
    user: string;
    message: string;
    upvotes: number;
}

export const downloadFeedback = (messageList: Message[]): void => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const keys = Object.keys(messageList[0]);
    keys.forEach(key => csvContent += `${key},`);
    csvContent += "\n";
    messageList.forEach(message => {
        keys.forEach(key => {
            csvContent += `${message[key]},`;
        });
        csvContent += "\n";
    });

    const encodedUri = encodeURI(csvContent);
    
    // Need hidden <a> to download as a CSV - perhaps a more React way of doing this
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "feedback.csv");
    link.setAttribute("id", "feedback-download-temp");
    document.body.appendChild(link);

    // Downloads the file and removes the node afterwards
    link.click();
    document.getElementById("feedback-download-temp")?.remove();
    return;

};