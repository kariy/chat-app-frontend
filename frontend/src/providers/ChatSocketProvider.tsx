import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { TMessage } from "../types/message";

import { UserContext } from "./UserProvider";

interface IChatMethodCtx {
    join: (room: string) => void;
    leave: (room: string) => void;
    sendMessage: (room: string, message: string) => void;
    isTyping: (room: string) => void;
    notTyping: (room: string) => void;
}

const uri = `${
    process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_SOCKET_URI
        : process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_PROD_SOCKET_URI
        : ""
}`;

const socket = io(uri, {
    autoConnect: false,
    reconnection: true,
});

export const ChatSocketContext = createContext<Socket>(socket);
export const ChatSocketMethodContext = createContext<IChatMethodCtx | null>(
    null
);

const ChatSocketProvider: React.FC = ({ children }) => {
    const userCtx = useContext(UserContext);
    const [hasConnection, setHasConnection] = useState(false);

    /* 
        Initialize socket connection on mount
     */
    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            setHasConnection(true);
        });

        socket.on("disconnect", () => setHasConnection(false));

        return () => {
            socket.disconnect();
        };
    }, []);

    function join(room: string) {
        if (hasConnection) socket.emit("join room", room, userCtx?.current);
    }

    function leave(room: string) {
        if (hasConnection) socket.emit("leave room", room);
    }

    function sendMessage(room: string, message: string) {
        if (hasConnection && userCtx?.current) {
            const newMessage: TMessage = {
                author: userCtx?.current,
                message: message,
                timestamp: new Date(),
            };

            socket.emit("message", { roomId: room, message: newMessage });
        }
    }

    function isTyping(room: string) {
        if (hasConnection) socket.emit("is typing", room, userCtx?.current);
    }

    function notTyping(room: string) {
        if (hasConnection)
            socket.emit("not typing", { room, user: userCtx?.current });
    }

    return (
        <ChatSocketContext.Provider value={socket}>
            <ChatSocketMethodContext.Provider
                value={{
                    join,
                    leave,
                    sendMessage,
                    isTyping,
                    notTyping,
                }}
            >
                {children}
            </ChatSocketMethodContext.Provider>
        </ChatSocketContext.Provider>
    );
};

export default ChatSocketProvider;
