import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TRoom } from "../stores/rooms";
import { TConversation, TMessage } from "../types/message";
import { TSocketMessageData } from "../types/socket";
import { ChatSocketContext } from "./ChatSocketProvider";
import _ from "lodash";

interface TConversationCtx {
    list: TConversation[];
    add: (room: TRoom, messages: TMessage[]) => void;
    addMessage: (roomId: string, message: TMessage) => void;
    init: (rooms: TRoom[]) => void;
    remove: (roomId: string) => void;
    showList: () => TConversation[];
    getConversation: (roomId: TRoom["id"]) => TConversation | undefined;
}

export const ConversationContext = createContext<TConversationCtx | null>(null);

const ConversationProvider: React.FC = ({ children }) => {
    const socket = useContext(ChatSocketContext);
    const [convoList, setConvoList] = useState<TConversation[]>([]);
    const convoListRef = useRef<TConversation[] | null>(null);
    convoListRef.current = convoList;

    useEffect(() => {
        socket.on("message", (data: TSocketMessageData) => {
            addMessage(data.roomId, data.message);
        });
    }, [socket]);

    function init(rooms: TRoom[]) {
        const initConvo: TConversation[] = rooms.map((room) =>
            createConversation(room)
        );

        setConvoList(initConvo);
    }

    function addMessage(roomId: string, message: TMessage) {
        setConvoList((prev) => {
            const newList = _.cloneDeep(prev);
            const convoToUpdate = newList.find(
                (room) => room.room.id === roomId
            );

            if (!convoToUpdate) return prev;

            convoToUpdate.messages.push(message);
            return newList;
        });
    }

    function showList() {
        return convoList;
    }

    function add(room: TRoom, messages: TMessage[] = []) {
        const newList = [...convoList];
        newList.push(createConversation(room, messages));
        setConvoList(newList);
    }

    function remove(roomId: string) {
        setConvoList((prev) => {
            const newList = [...prev];
            const idxToDel = newList.findIndex(
                (convo) => convo.room.id === roomId
            );

            if (idxToDel === -1) return newList;

            newList.splice(idxToDel, 1);
            return newList;
        });
    }

    function createConversation(room: TRoom, messages: TMessage[] = []) {
        const convo: TConversation = {
            room: room,
            messages: messages,
        };

        return convo;
    }

    function getConversation(roomId: string) {
        if (convoListRef.current)
            return convoListRef.current.find(
                (convo) => convo.room.id === roomId
            );
    }

    return (
        <ConversationContext.Provider
            value={{
                add,
                addMessage,
                list: convoList,
                init,
                remove,
                showList,
                getConversation,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

export default ConversationProvider;
