import { createContext, useContext, useState } from "react";
import AVAILABLE_ROOMS, { TRoom } from "../stores/rooms";
import { ChatSocketMethodContext } from "./ChatSocketProvider";
import { ConversationContext } from "./ConversationProvider";

type TRoomContext = {
    list: TRoom[];
    totalRoom: number;
    init: (ids: TRoom["id"][]) => void;
    add: (id: TRoom["id"]) => TRoom | undefined;
    addMany: (ids: TRoom["id"][]) => TRoom[];
    remove: (id: TRoom["id"]) => void;
    removeMany: (ids: TRoom["id"][]) => void;
    get: (id: TRoom["id"]) => TRoom | undefined;
};

export const RoomContext = createContext<TRoomContext | null>(null);

const RoomProvider: React.FC = ({ children }) => {
    // Socket
    const convoCtx = useContext(ConversationContext);
    const chatSocketMethods = useContext(ChatSocketMethodContext);

    // State
    const [roomList, setRoomList] = useState<TRoom[]>([]);

    // useEffect(() => {
    //     console.log("room list ", roomList);
    // }, [roomList]);

    function init(ids: TRoom["id"][]) {
        const roomsAdded = addMany(ids);

        if (roomsAdded.length) convoCtx?.init(roomsAdded);
    }

    function fetchRoomInfo(id: string): TRoom | undefined {
        return AVAILABLE_ROOMS.find((item) => item.id === id);
    }

    function add(id: TRoom["id"]) {
        if (!includes(id)) return;

        const roomsToAdd = fetchRoomInfo(id);

        if (!roomsToAdd) return;

        const newList = [...roomList];
        newList.push(roomsToAdd);

        chatSocketMethods?.join(id);
        setRoomList(newList);

        return roomsToAdd;
    }

    function addMany(ids: TRoom["id"][]) {
        let roomsToAdd: TRoom[] = [];

        ids.forEach((id) => {
            if (includes(id)) return;

            const roomInfo = fetchRoomInfo(id);

            if (!roomInfo) return;

            roomsToAdd.push(roomInfo);
            chatSocketMethods?.join(id);
        });

        const newList = roomList.concat(roomsToAdd);
        setRoomList(newList);

        return roomsToAdd;
    }

    function remove(id: TRoom["id"]) {
        setRoomList((prev) => {
            const idxToDel = findIndexOf(id);

            if (idxToDel === -1) return prev;

            const newList = [...prev];
            newList.splice(idxToDel, 1);
            chatSocketMethods?.leave(id);
            return newList;
        });
    }

    function removeMany(ids: TRoom["id"][]) {
        setRoomList((prev) => {
            const newList = [...prev];

            ids.forEach((id) => {
                const idxToDel = findIndexOf(id);

                if (idxToDel === -1) return;

                newList.splice(idxToDel, 1);
                chatSocketMethods?.leave(id);
            });

            return newList;
        });
    }

    function findIndexOf(id: TRoom["id"]) {
        return roomList.findIndex((room) => room.id === id);
    }

    function includes(id: TRoom["id"]) {
        return findIndexOf(id) !== -1 ? true : false;
    }

    function get(id: TRoom["id"]) {
        return roomList.find((room) => room.id === id);
    }

    return (
        <RoomContext.Provider
            value={{
                init,
                list: roomList,
                totalRoom: roomList.length,
                add,
                remove,
                addMany,
                removeMany,
                get,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};

export default RoomProvider;
