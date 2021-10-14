import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import MaxContainer from "../../components/MaxContainer";
import { RoomContext } from "../../providers/RoomProvider";
import { UserContext } from "../../providers/UserProvider";

import ColorSelector from "./components/ColorSelector";
import RoomSelector from "./components/RoomSelector";
import UserName from "./components/UserName";
import useUserSetup from "./hooks/useUserSetup";

const Container = styled.div`
    height: 100%;
`;

const Form = styled.form`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;

const InputSectionWrapper = styled.div`
    display: flex;
    align-items: center;
    min-height: 200px;
    width: 100%;
`;

const Button = styled.button`
    background-color: var(--system-color-purple);
    margin-top: 20px;
    color: white;
    width: 150px;
    padding: 0.7rem 2rem;
    border-radius: 50px;
    border: none;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 200ms ease-in-out;

    &:hover {
        background-color: var(--system-color-light-purple);
    }
`;

export type TFormData = {
    name: string;
    color: string;
    rooms: string[];
};

export default function Login() {
    const userCtx = useContext(UserContext);
    const roomCtx = useContext(RoomContext);
    const history = useHistory();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TFormData>({
        mode: "onChange",
    });
    const { state, dispatch } = useUserSetup();

    useEffect(() => {
        if (!state.isComplete) return;

        const { name, color, rooms } = state;

        if (name && color && rooms) {
            userCtx?.set({ name, color });
            roomCtx?.init(rooms);
            history.push("/");
        }
    }, [state.isComplete]);

    function handleContinue(data: any) {
        if (state.currentPhase === "name")
            dispatch({ type: "SET_NAME", name: data.name });
        else if (state.currentPhase === "color")
            dispatch({ type: "SET_COLOR", color: data.color });
        else if (state.currentPhase === "room") {
            dispatch({ type: "SET_ROOMS", rooms: data.rooms });
        }
    }

    return (
        <Container>
            <MaxContainer>
                <Form onSubmit={handleSubmit(handleContinue)}>
                    <div>
                        <InputSectionWrapper>
                            {state.currentPhase === "name" ? (
                                <UserName register={register} errors={errors} />
                            ) : state.currentPhase === "color" ? (
                                <ColorSelector
                                    register={register}
                                    errors={errors}
                                />
                            ) : state.currentPhase === "room" ? (
                                <RoomSelector
                                    register={register}
                                    errors={errors}
                                />
                            ) : null}
                        </InputSectionWrapper>

                        <Button type="submit">
                            {state.currentPhase === "room"
                                ? "Start"
                                : "Continue"}
                        </Button>
                    </div>
                </Form>
            </MaxContainer>
        </Container>
    );
}
