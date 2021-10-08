import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import {
    DeepMap,
    DeepPartial,
    FieldError,
    UseFormRegister,
} from "react-hook-form/dist/types";
import { TFormData } from "..";

interface Props {
    register: UseFormRegister<TFormData>;
    errors: DeepMap<DeepPartial<TFormData>, FieldError>;
}

export default function UserName({ register, errors }: Props) {
    return (
        <div>
            <label>
                <input
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
            </label>
            <ErrorMessage name="name" errors={errors} />
        </div>
    );
}
