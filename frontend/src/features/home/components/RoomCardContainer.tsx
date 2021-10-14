import styled from "styled-components";
import { TRoom } from "../../../stores/rooms";
import RoomCard from "./RoomCard";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;

    @media only screen and (min-width: 800px) {
        flex-direction: column;
    }
`;

interface Props {
    rooms: TRoom[];
    onClickCard: (roomId: TRoom["id"]) => void;
    currentRoom: TRoom["id"] | null;
}

export default function RoomCardContainer({
    rooms,
    onClickCard,
    currentRoom,
}: Props) {
    return (
        <Container>
            {rooms.map((room) => (
                <RoomCard
                    key={`card_${room.id}`}
                    room={room}
                    onClick={onClickCard}
                    current={currentRoom}
                />
            ))}
        </Container>
    );
}
