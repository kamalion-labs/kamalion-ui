import * as React from "react";
import { PatternFormatProps } from "react-number-format";
type MaskType = "date" | "tel" | "cel" | "hiddenCel" | "cpf" | "cnpj" | "cep";
type MaskPropsType = {
    [key in MaskType]: PatternFormatProps & {
        returnFormattedValue?: boolean;
    };
};
declare const maskProps: MaskPropsType;
type InputMaskType = keyof typeof maskProps;
export type InputMaskProps = Omit<PatternFormatProps, "type" | "format"> & {
    type: InputMaskType;
    noControl?: boolean;
    noError?: boolean;
};
declare const InputMask: React.ForwardRefExoticComponent<Omit<PatternFormatProps, "type" | "format"> & {
    type: InputMaskType;
    noControl?: boolean;
    noError?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
export { InputMask };
