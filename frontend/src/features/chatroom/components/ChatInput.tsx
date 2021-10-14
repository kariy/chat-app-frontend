import React, { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { ChatSocketMethodContext } from "../../../providers/ChatSocketProvider";
import { InputBox } from "./InputBox";

const Container = styled.div`
    /* outline: 1px solid purple; */
    padding-top: 1rem;
`;

const Form = styled.form`
    min-height: 35px;
    display: flex;
    flex-direction: row;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 100px;
    height: 40px;
    width: 40px;
    cursor: pointer;
    background-color: var(--system-color-purple);
    transition: background-color 200ms ease-in-out;

    &:hover {
        background-color: var(--system-color-light-purple);
    }
`;

interface Props {
    roomId: string;
}

export default function ChatInput({ roomId }: Props) {
    const chatSocketCtx = useContext(ChatSocketMethodContext);
    const [isTyping, setIsTyping] = useState<boolean | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isTyping === null) return;

        if (isTyping) chatSocketCtx?.isTyping(roomId);
        else chatSocketCtx?.notTyping(roomId);
    }, [isTyping]);

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setIsTyping(() => (e.target.value ? true : false));
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const message = inputRef.current?.value;
        if (message) {
            chatSocketCtx?.sendMessage(roomId, message);
            e.currentTarget.reset();
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputBox onChange={handleOnChange} ref={inputRef} />
                <Button type="submit">
                    <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.4 17.4L18.85 9.91999C19.66 9.56999 19.66 8.42999 18.85 8.07999L1.4 0.599986C0.74 0.309986 0.00999999 0.799987 0.00999999 1.50999L0 6.11999C0 6.61999 0.37 7.04999 0.87 7.10999L15 8.99999L0.87 10.88C0.37 10.95 0 11.38 0 11.88L0.00999999 16.49C0.00999999 17.2 0.74 17.69 1.4 17.4Z"
                            fill="white"
                        />
                    </svg>
                </Button>
            </Form>
        </Container>
    );
}
