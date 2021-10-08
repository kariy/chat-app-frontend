import RoomProvider from "./RoomProvider";
import SocketProvider from "./SocketProvider";
import UserProvider from "./UserProvider";

const ContextProvider: React.FC = ({ children }) => {
    return (
        <UserProvider>
            <RoomProvider>
                <SocketProvider>{children}</SocketProvider>
            </RoomProvider>
        </UserProvider>
    );
};

export default ContextProvider;
