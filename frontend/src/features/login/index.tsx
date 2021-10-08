import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { RoomContext } from "../../providers/RoomProvider";
import { UserContext } from "../../providers/UserProvider";

import ColorSelector from "./components/ColorSelector";
import RoomSelector from "./components/RoomSelector";
import UserName from "./components/UserName";
import useUserSetup from "./hooks/useUserSetup";

export type TFormData = {
    name: string;
    color: string;
    rooms: string[];
};

export default function Login() {
    const userCtx = useContext(UserContext);
    const roomCtx = useContext(RoomContext);
    const history = useHistory();

    console.log("render");

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<TFormData>({
        mode: "onChange",
    });
    const { state, dispatch } = useUserSetup();

    function finishSetup() {
        const { name, color, rooms } = state;

        if (name && color && rooms) {
            userCtx?.set({ name, color });
            roomCtx?.set(rooms);
            history.push("/");
        }
    }

    function handleContinue(data: any) {
        console.log("data", data);

        if (state.currentPhase === "name")
            dispatch({ type: "SET_NAME", name: data.name });
        else if (state.currentPhase === "color")
            dispatch({ type: "SET_COLOR", color: data.color });
        else if (state.currentPhase === "room") {
            dispatch({ type: "SET_ROOMS", rooms: data.rooms });
            finishSetup();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleContinue)}>
                <div>
                    {state.currentPhase === "name" ? (
                        <UserName register={register} errors={errors} />
                    ) : state.currentPhase === "color" ? (
                        <ColorSelector register={register} errors={errors} />
                    ) : state.currentPhase === "room" ? (
                        <RoomSelector register={register} errors={errors} />
                    ) : null}
                </div>

                <div>
                    <button type="submit">
                        {state.currentPhase === "room" ? "Start" : "Continue"}
                    </button>
                </div>
            </form>
        </div>
    );
}
