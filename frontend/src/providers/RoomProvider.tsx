import { createContext, useContext, useEffect, useState } from "react";
import { addToArrayWithEffect, deleteInArrayWithEffect } from "../utils/array";
import { ChatSocketContext } from "./ChatSocketProvider";

type TRoomContext = {
    list: string[];
    set: (room: string | string[]) => void;
    remove: (room: string | string[]) => void;
};

export const RoomContext = createContext<TRoomContext | null>(null);

const RoomProvider: React.FC = ({ children }) => {
    const socket = useContext(ChatSocketContext);
    const [roomList, setRoomList] = useState<string[]>([]);

    function add(room: any | any[]) {
        const list = addToArrayWithEffect(roomList, room, (room) => {
            socket?.join(room);
        });
        setRoomList(list);
    }

    function remove(room: any | any[]) {
        const list = deleteInArrayWithEffect(roomList, room, (room) => {
            socket?.leave(room);
        });
        setRoomList(list);
    }

    return (
        <RoomContext.Provider value={{ list: roomList, set: add, remove }}>
            {children}
        </RoomContext.Provider>
    );
};

export default RoomProvider;
