import { ErrorMessage } from "@hookform/error-message";
import {
    DeepMap,
    DeepPartial,
    FieldError,
    UseFormRegister,
} from "react-hook-form/dist/types";
import styled from "styled-components";
import { TFormData } from "..";
import InputTitle from "./InputTitle";
import LabelCard from "./LabelCard";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ColorContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
    align-items: center;
    justify-content: center;
`;

const Label = styled(LabelCard)<{ color: string }>`
    font-weight: 700;
    color: white;
    border: none;
    background-color: ${(props) => props.color};

    & > span {
        margin-right: 10px;
    }
`;

interface Props {
    register: UseFormRegister<TFormData>;
    errors: DeepMap<DeepPartial<TFormData>, FieldError>;
}

const colors = ["#17c3b2", "#227c9d", "#fe6d73", "#ffcb77"];

export default function ColorSelector({ register, errors }: Props) {
    return (
        <Container>
            <InputTitle>Choose your color</InputTitle>
            <ColorContainer>
                {colors.map((color) => (
                    <Label key={`colors_${color}`} color={color}>
                        <span>{color}</span>

                        <input
                            type="radio"
                            value={color}
                            {...register("color", {
                                required: "You must choose a color!",
                            })}
                        />
                    </Label>
                ))}
            </ColorContainer>
        </Container>
    );
}
