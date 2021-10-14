import { ErrorMessage } from "@hookform/error-message";
import {
    DeepMap,
    DeepPartial,
    FieldError,
    UseFormRegister,
} from "react-hook-form/dist/types";
import styled from "styled-components";
import { TFormData } from "..";
import ErrorText from "./ErrorText";
import InputTitle from "./InputTitle";

const Container = styled.div`
    width: 100%;
`;

const Label = styled.label`
    /* background-color: violet; */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: min(100%, 300px);
    padding: 1rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: var(--system-rounded-lg);
    border: 1px solid var(--system-color-light-grey);

    &:focus {
        outline: 3px solid var(--system-color-light-purple);
    }
`;

interface Props {
    register: UseFormRegister<TFormData>;
    errors: DeepMap<DeepPartial<TFormData>, FieldError>;
}

export default function UserName({ register, errors }: Props) {
    return (
        <Container>
            <Label>
                <InputTitle>Enter your name</InputTitle>
                <Input
                    type="text"
                    {...register("name", {
                        required: "Your name cannot be empty!",
                        minLength: {
                            value: 3,
                            message: "Name must be more than 3 characters!",
                        },
                        maxLength: {
                            value: 10,
                            message: "Name cannot be more than 10 characters!",
                        },
                    })}
                />
            </Label>
            <ErrorText>
                <ErrorMessage name="name" errors={errors} />
            </ErrorText>
        </Container>
    );
}
