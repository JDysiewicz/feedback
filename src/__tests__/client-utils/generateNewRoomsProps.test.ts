import { generateNewRoomProps } from "src/utils/generateNewRoomsProps";
const boardMatchRegex = /^\?board=[0-9]*$/;

test("Utils: generateNewRoomsProps, empty", async () => {
    let currRooms = [] as string[];
    let newRoomProps = generateNewRoomProps(currRooms);

    expect(newRoomProps.roomCreator).toBe(true);
    expect(boardMatchRegex.test(newRoomProps.search)).toBe(true);
});

test("Utils: generateNewRoomsProps, expected", async () => {
    let currRooms = ["123456", "111111"] as string[];
    let newRoomProps = generateNewRoomProps(currRooms);

    expect(newRoomProps.roomCreator).toBe(true);
    expect(boardMatchRegex.test(newRoomProps.search)).toBe(true);
    expect(newRoomProps.search).not.toBe("123456");
    expect(newRoomProps.search).not.toBe("111111");
});

test("Utils: generateNewRoomsProps, letters", async () => {
    let currRooms = ["AA2321123A", "BZXC$£//ADz"] as string[];
    let newRoomProps = generateNewRoomProps(currRooms);

    expect(newRoomProps.roomCreator).toBe(true);
    expect(boardMatchRegex.test(newRoomProps.search)).toBe(true);
    expect(newRoomProps.search).not.toBe("AA2321123A");
    expect(newRoomProps.search).not.toBe("BZXC$£//ADz");
});