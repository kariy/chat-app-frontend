import { createContext, useContext, useEffect, useState } from "react";
import { TRoom } from "../stores/rooms";
import { TConversation, TMessage } from "../types/message";
import { RoomContext } from "./RoomProvider";

interface TConversationCtx {
    convoList: TConversation[];
    add: (room: TRoom, messages: TMessage[]) => void;
    addMessage: (roomId: string, message: TMessage) => void;
    init: (rooms: TRoom[]) => void;
    remove: (roomId: string) => void;
}

export const ConversationContext = createContext<TConversationCtx | null>(null);

const ConversationProvider: React.FC = ({ children }) => {
    const roomCtx = useContext(RoomContext);
    const [convoList, setConvoList] = useState<TConversation[]>([]);

    useEffect(() => {
        console.log("convolist", convoList);
    }, [convoList]);

    function init(rooms: TRoom[]) {
        const initConvo: TConversation[] = rooms.map((room) =>
            createConversation(room)
        );

        setConvoList(initConvo);
    }

    function addMessage(roomId: string, message: TMessage) {
        setConvoList((prev) => {
            const newList = [...prev];
            const convoToUpdate = getConversation(roomId);

            if (!convoToUpdate) return prev;

            convoToUpdate.messages.push(message);
            return newList;
        });
    }

    function add(room: TRoom, messages: TMessage[] = []) {
        const newList = [...convoList];
        setConvoList(newList);
        newList.push(createConversation(room, messages));
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

    function getConversation(roomId: string): TConversation | undefined {
        return convoList.find((convo) => convo.room.id === roomId);
    }

    return (
        <ConversationContext.Provider
            value={{
                add,
                addMessage,
                convoList,
                init,
                remove,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};

export default ConversationProvider;
