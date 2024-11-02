import * as React from "react";
import { NumericFormatProps } from "react-number-format";
type MaskType = "money" | "percent" | "number";
type MaskPropsType = {
    [key in MaskType]: NumericFormatProps;
};
declare const maskProps: MaskPropsType;
type InputNumberType = keyof typeof maskProps;
export type InputNumberProps = Omit<NumericFormatProps, "type"> & {
    type?: InputNumberType;
    noControl?: boolean;
};
declare const InputNumber: React.ForwardRefExoticComponent<Omit<NumericFormatProps, "type"> & {
    type?: InputNumberType;
    noControl?: boolean;
} & React.RefAttributes<HTMLInputElement>>;
export { InputNumber };
