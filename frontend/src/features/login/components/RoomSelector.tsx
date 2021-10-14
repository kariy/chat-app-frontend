import { ErrorMessage } from "@hookform/error-message";
import {
    DeepMap,
    DeepPartial,
    FieldError,
    UseFormRegister,
} from "react-hook-form/dist/types";
import styled from "styled-components";
import { TFormData } from "..";
import AVAILABLE_ROOMS from "../../../stores/rooms";
import ErrorText from "./ErrorText";
import InputTitle from "./InputTitle";
import LabelCard from "./LabelCard";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CardContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 10px;
`;

const Label = styled(LabelCard)`
    font-weight: 700;

    & > span {
        margin-right: 10px;
    }
`;

interface Props {
    register: UseFormRegister<TFormData>;
    errors: DeepMap<DeepPartial<TFormData>, FieldError>;
}

export default function RoomSelector({ register, errors }: Props) {
    return (
        <Container>
            <InputTitle>Select room(s)</InputTitle>
            <CardContainer>
                {AVAILABLE_ROOMS.map((room) => (
                    <Label key={`rooms_${room.id}`}>
                        <span>{room.name}</span>
                        <input
                            type="checkbox"
                            value={room.id}
                            {...register("rooms", {
                                required: "Please select at least ONE room!",
                            })}
                        />
                    </Label>
                ))}
            </CardContainer>
            <ErrorText>
                <ErrorMessage name="rooms" errors={errors} />
            </ErrorText>
        </Container>
    );
}
