import RoomProvider from "./RoomProvider";
import ChatSocketProvider from "./ChatSocketProvider";
import UserProvider from "./UserProvider";
import ConversationProvider from "./ConversationContext";

const ContextProvider: React.FC = ({ children }) => {
    return (
        <UserProvider>
            <ChatSocketProvider>
                <ConversationProvider>
                    <RoomProvider>{children}</RoomProvider>
                </ConversationProvider>
            </ChatSocketProvider>
        </UserProvider>
    );
};

export default ContextProvider;
