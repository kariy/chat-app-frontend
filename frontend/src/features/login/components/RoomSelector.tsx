import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import {
    DeepMap,
    DeepPartial,
    FieldError,
    UseFormRegister,
} from "react-hook-form/dist/types";
import { TFormData } from "..";

const rooms = ["room1", "room2", "room3"];

interface Props {
    register: UseFormRegister<TFormData>;
    errors: DeepMap<DeepPartial<TFormData>, FieldError>;
}

export default function RoomSelector({ register, errors }: Props) {
    return (
        <div>
            {rooms.map((room) => (
                <label key={`rooms_${room}`}>
                    {room}
                    <input
                        type="checkbox"
                        value={room}
                        {...register("rooms", {
                            required: "Please select at least ONE room!",
                        })}
                    />
                </label>
            ))}
            <ErrorMessage name="rooms" errors={errors} />
        </div>
    );
}
