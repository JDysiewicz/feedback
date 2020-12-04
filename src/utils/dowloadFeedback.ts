import { Message } from "../../types";

export const downloadFeedback = (messageList: Message[]): void => {

    // Takes the messageList from the persons client side, iterates over it and assigns each key in the messageList
    // a column. Then iterates over each message and builds the csv file content.

    let csvContent = "data:text/csv;charset=utf-8,"; // Stack overflow
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
    
    // Need hidden <a> to download as a CSV - perhaps a more React way of doing this as making HTML elements this way is kinda bad
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "feedback.csv");
    link.setAttribute("id", "feedback-download-temp");
    document.body.appendChild(link);

    // Downloads the file, and removes the created a tag afterwards.
    link.click();
    document.getElementById("feedback-download-temp")?.remove();
    return;

};