import { createContext, useEffect, useState } from "react";

interface TRoomContext {
    list: string[];
    set: (room: string | string[]) => void;
    remove: (room: string | string[]) => void;
}

export const RoomContext = createContext<TRoomContext | null>(null);

const RoomProvider: React.FC = ({ children }) => {
    const [roomList, setRoomList] = useState<string[]>([]);

    // useEffect(() => {
    //     console.log("list of connected rooms : ", roomList);
    // }, [roomList]);

    function set(room: string | string[]) {
        const arr = [...roomList];

        if (typeof room === "string") arr.push(room);
        else if (typeof room === "object")
            room.forEach((room) => arr.push(room));

        setRoomList(arr);
    }

    function remove(room: string | string[]) {
        const arr = [...roomList];

        if (typeof room === "string" && isRoomExist(room))
            arr.splice(arr.indexOf(room), 1);
        else if (typeof room === "object")
            room.forEach((item) => {
                if (isRoomExist(item)) arr.splice(arr.indexOf(item), 1);
            });
    }

    function isRoomExist(room: string) {
        return roomList.indexOf(room) > -1 ? true : false;
    }

    return (
        <RoomContext.Provider value={{ list: roomList, set, remove }}>
            {children}
        </RoomContext.Provider>
    );
};

export default RoomProvider;
