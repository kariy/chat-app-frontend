import styled from "styled-components";
import { TRoom } from "../../../stores/rooms";

const Container = styled.div<{ active: boolean }>`
    min-height: 50px;
    border: 1px solid black;
    border-radius: 100px;
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.active ? "pink" : "white")};
    color: ${(props) => (props.active ? "white" : "black")};
    transition: background-color 200ms ease-in-out;

    div {
        font-weight: 600;
    }
`;

interface Props {
    room: TRoom;
    onClick: (roomId: TRoom["id"]) => void;
    current: TRoom["id"] | null;
}

export default function RoomCard({ room, onClick, current }: Props) {
    return (
        <Container
            onClick={() => onClick(room.id)}
            active={current === room.id ? true : false}
        >
            <div>{room.name}</div>
        </Container>
    );
}
