import { useContext, useRef } from "react";
import styled from "styled-components";
import { ConversationContext } from "../../providers/ConversationProvider";
import { TRoom } from "../../stores/rooms";
import { TConversation } from "../../types/message";
import ChatInput from "./components/ChatInput";
import MessageContainer from "./components/MessageContainer";

interface Props {
    roomId: TRoom["id"];
}

const Container = styled.div`
    height: 100%;
`;

const RoomWrapper = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 0 0.8em;
    height: 70px;
    background-color: var(--system-color-purple);
    color: white;
    border-radius: var(--system-rounded);
    margin-bottom: 10px;

    & .room-name {
        font-weight: 700;
        margin-bottom: 8px;
    }

    & .room-id {
        font-size: 0.8rem;
    }
`;

export default function Chatroom({ roomId }: Props) {
    const convoCtx = useContext(ConversationContext);
    const convoRef = useRef<TConversation | undefined>();
    convoRef.current = convoCtx?.getConversation(roomId);

    return (
        <Container>
            {convoRef.current ? (
                <RoomWrapper>
                    <Header>
                        <div>
                            <div className="room-name">
                                {convoRef.current.room.name}
                            </div>
                            <div className="room-id">
                                Room ID : {convoRef.current.room.id}
                            </div>
                        </div>
                    </Header>
                    <MessageContainer messages={convoRef.current.messages} />
                    <ChatInput roomId={convoRef.current.room.id} />
                </RoomWrapper>
            ) : (
                <div>That room doesnt exist</div>
            )}
        </Container>
    );
}
