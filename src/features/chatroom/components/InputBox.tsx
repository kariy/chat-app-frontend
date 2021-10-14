import React from "react";
import styled from "styled-components";

const Input = styled.input`
    margin-right: 10px;
    flex: 1;
    border-radius: 100px;
    border: none;
    padding: 0.3em 1.3em;
    font-family: "Inter", sans-serif;
    border: 1px solid var(--system-color-grey);
    transition: outline 200ms ease-in-out;

    &:focus {
        outline: 3px solid var(--system-color-light-purple);
    }
`;

interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputBox = React.forwardRef<HTMLInputElement, InputProps>(
    function ({ onChange }, ref) {
        return (
            <Input
                type="text"
                name="message"
                ref={ref}
                onChange={onChange}
                placeholder="Send a message"
                required
            />
        );
    }
);
