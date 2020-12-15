import { NewRoomProps } from "types";

const generateNewId = (currentRoomsArray: string[]) => {
    let newRoomId = (Math.random()*1000000).toString().split(".")[0];
    while (currentRoomsArray.indexOf(newRoomId) !== -1){
        newRoomId = (Math.random()*1000000).toString().split(".")[0];
    };
    return newRoomId;
}

export const generateNewRoomProps = (currentRoomsArray: string[]) => {
    const newRoomId = generateNewId(currentRoomsArray);
    const newRoomProps: NewRoomProps = {search: `?board=${newRoomId}`, roomCreator: true };
    return newRoomProps;
};