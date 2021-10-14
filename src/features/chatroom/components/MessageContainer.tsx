import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../providers/UserProvider";
import { TMessage } from "../../../types/message";
import MessageBubble from "./MessageBubble";

const Container = styled.div`
    flex: 1;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--system-color-grey);
    border-radius: var(--system-rounded);
`;

const Wrapper = styled.div`
    overflow-y: scroll;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    & > div {
        display: flex;
        flex-direction: column;
        row-gap: 0.7rem;
        padding: 1rem 0.8rem;
    }
`;

interface Props {
    messages: TMessage[];
}

const MessageContainer = React.memo<Props>(function ({ messages }) {
    const userCtx = useContext(UserContext);

    return (
        <Container>
            <Wrapper>
                <div>
                    {messages.map((message) => (
                        <MessageBubble
                            key={`${message.author}_${message.timestamp}`}
                            message={message}
                            originType={
                                userCtx?.current?.name === message.author.name
                                    ? "sender"
                                    : "receiver"
                            }
                        />
                    ))}
                </div>
            </Wrapper>
        </Container>
    );
});

export default MessageContainer;
