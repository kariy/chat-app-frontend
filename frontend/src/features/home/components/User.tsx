import styled from "styled-components";
import { TUser } from "../../../types/user";

const Container = styled.div<{ userColor: TUser["color"] }>`
    display: flex;
    align-items: center;
    padding: 0.5em 0.8em;
    border-radius: var(--system-rounded);
    background-color: ${(props) => props.userColor};
    margin-bottom: 10px;
    font-weight: 600;
    color: white;

    @media only screen and (min-width: 800px) {
        height: 70px;
    }
`;

interface Props {
    user: TUser;
}

export default function User({ user }: Props) {
    return (
        <Container userColor={user.color}>
            <span>{user.name}</span>
        </Container>
    );
}
