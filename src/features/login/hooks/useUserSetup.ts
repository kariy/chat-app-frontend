import { useReducer } from "react";

export type SetupPhase = "name" | "color" | "room" | "complete";

type SetupAction =
    | { type: "SET_NAME"; name: string }
    | { type: "SET_COLOR"; color: string }
    | { type: "SET_ROOMS"; rooms: string[] };

type SetupState = {
    name: string | null;
    color: string | null;
    rooms: string[];
    currentPhase: SetupPhase;
    isComplete: boolean;
};

const initState: SetupState = {
    name: null,
    color: null,
    rooms: [],
    currentPhase: "name",
    isComplete: false,
};

const reducer: React.Reducer<SetupState, SetupAction> = (
    state: SetupState,
    action: SetupAction
) => {
    const { type } = action;

    switch (type) {
        case "SET_NAME":
            return {
                ...state,
                name: action.name,
                currentPhase: "color",
            };
        case "SET_COLOR":
            return {
                ...state,
                color: action.color,
                currentPhase: "room",
            };
        case "SET_ROOMS": {
            const newRooms: string[] = [];

            action.rooms.forEach((room) => newRooms.push(room));

            return {
                ...state,
                rooms: newRooms,
                currentPhase: "complete",
                isComplete: true,
            };
        }
        default:
            return { ...state };
    }
};

export default function useUserSetup() {
    const [state, dispatch] = useReducer(reducer, initState);

    return { state, dispatch };
}
