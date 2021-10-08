import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { RoomContext } from "./RoomProvider";

interface ISocket {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    isConnected: boolean;
}

export const SocketContext = createContext<ISocket | null>(null);
const socket = io("http://localhost:8000/chat");

const SocketProvider: React.FC = ({ children }) => {
    const room = useContext(RoomContext);
    const [isConnected, setIsConnnected] = useState(false);

    // Initialize socket connection
    useEffect(() => {
        socket.on("connect", () => {
            setIsConnnected(true);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Listen to room context => join room(s)
    useEffect(() => {
        if (room && room.list && socket) {
            room.list.forEach((room) => socket.emit("join", room));
        }
    }, [room]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
