import React from "react";
import styled from "styled-components";
import { TMessage } from "../../../types/message";

type TMessageOrigin = "receiver" | "sender";
type TStyledProps = { originType: TMessageOrigin; userColor: string };

const Author = styled.div``;

const Text = styled.div``;

const Container = styled.div<TStyledProps>`
    display: flex;
    flex-direction: column;
    align-self: ${(props) =>
        props.originType === "receiver" ? "flex-start" : "flex-end"};
    max-width: 350px;

    ${Author} {
        align-self: ${(props) =>
            props.originType === "receiver" ? "flex-start" : "flex-end"};
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 4px;
        color: ${(props) => props.userColor};
    }

    ${Text} {
        border: ${(props) =>
            props.originType === "receiver"
                ? "1px solid var(--system-color-purple)"
                : "none"};
        color: ${(props) =>
            props.originType === "receiver" ? "black" : "white"};
        background-color: ${(props) =>
            props.originType === "receiver"
                ? "white"
                : "var(--system-color-light-purple)"};
        padding: 0.4em 0.8em;
        font-size: 0.9rem;
        border-radius: 0.9rem;
    }
`;

interface Props {
    message: TMessage;
    originType: TMessageOrigin;
}

const MessageBubble = React.memo<Props>(function ({ message, originType }) {
    return (
        <Container originType={originType} userColor={message.author.color}>
            <Author>{message.author.name}</Author>
            <Text>{message.message}</Text>
        </Container>
    );
});

export default MessageBubble;
