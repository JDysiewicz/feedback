import { messageValidator } from "src/utils/messageValidator";

test("util: messageValidator, length 0", () => {
    const message = "";
    expect(messageValidator(message)).toBe("Message cannot be empty");
});

test("util: messageValidator, newlines", () => {
    const message = "Hello \n";
    expect(messageValidator(message)).toBe("New line characters are not permitted");
});

test("util: messageValidator, character limit", () => {
    const message = "sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing sorry for the long line it is needed for testing "
    expect(messageValidator(message)).toBe("Maximum character limit of 300");
});

test("util: messageValidator, length 0", () => {
    const message = "This is a valid message?!*&^%$£!-+=][{}//\||\\";
    expect(messageValidator(message)).toBe(null);
});

