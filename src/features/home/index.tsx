import { useContext, useState } from "react";
import styled from "styled-components";
import MaxContainer from "../../components/MaxContainer";
import { RoomContext } from "../../providers/RoomProvider";
import { UserContext } from "../../providers/UserProvider";
import { TRoom } from "../../stores/rooms";
import Chatroom from "../chatroom";
import RoomCardContainer from "./components/RoomCardContainer";
import User from "./components/User";

const Container = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: max-content 1fr;

    @media only screen and (min-width: 800px) {
        grid-template-rows: unset;
        grid-template-columns: 300px 1fr;
        column-gap: 20px;
    }
`;

const Navbar = styled.div`
    margin-top: 1.2rem;
    /* background-color: salmon; */

    @media only screen and (min-width: 800px) {
        margin-bottom: 2.5rem;
    }
`;

const ChatRoomContainer = styled.div`
    margin-top: 1.2rem;
    margin-bottom: 2.5rem;
`;

export default function Home() {
    const userCtx = useContext(UserContext);
    const roomCtx = useContext(RoomContext);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);

    function handleClickRoom(roomId: TRoom["id"]) {
        setCurrentRoom(roomId);
    }

    return (
        <MaxContainer>
            <Container>
                <Navbar>
                    {userCtx?.current ? <User user={userCtx?.current} /> : null}

                    {roomCtx?.list ? (
                        <RoomCardContainer
                            currentRoom={currentRoom}
                            onClickCard={handleClickRoom}
                            rooms={roomCtx.list}
                        />
                    ) : null}
                </Navbar>

                <ChatRoomContainer>
                    {currentRoom ? (
                        <Chatroom roomId={currentRoom} />
                    ) : (
                        <div>show default page </div>
                    )}
                </ChatRoomContainer>
            </Container>
        </MaxContainer>
    );
}
