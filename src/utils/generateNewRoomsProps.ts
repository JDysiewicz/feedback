import { NewRoomProps } from "types";

export const generateNewRoomProps = (currentRoomsArray: string[]) => {
    let newRoomId = (Math.random()*1000000).toString().split(".")[0];
    while (currentRoomsArray.indexOf(newRoomId) !== -1){
        newRoomId = (Math.random()*1000000).toString().split(".")[0];
    }
    const newRoomProps: NewRoomProps = {search: `?board=${newRoomId}`, roomCreator: true };
    return newRoomProps;
};