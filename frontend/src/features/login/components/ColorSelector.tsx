import { ErrorMessage } from "@hookform/error-message";
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

const colors = ["black", "red", "blue"];

export default function ColorSelector({ register, errors }: Props) {
    return (
        <div>
            {colors.map((color) => (
                <label key={`colors_${color}`}>
                    {color}
                    <input
                        type="radio"
                        value={color}
                        {...register("color", {
                            required: "You must choose a color!",
                        })}
                    />
                </label>
            ))}
            <ErrorMessage name="name" errors={errors} />
        </div>
    );
}
