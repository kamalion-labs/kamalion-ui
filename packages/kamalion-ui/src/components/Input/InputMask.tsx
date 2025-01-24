import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { cn } from "../../util/cn";

type MaskType = "date" | "tel" | "cel" | "hiddenCel" | "cpf" | "cnpj" | "cep";

type MaskPropsType = {
  [key in MaskType]: PatternFormatProps & { returnFormattedValue?: boolean };
};

const maskProps: MaskPropsType = {
  date: {
    format: "##/##/####",
    mask: "_",
    returnFormattedValue: true,
  },
  tel: {
    format: "(##) ####-####",
    mask: "_",
  },
  cel: {
    format: "(##) #####-####",
    mask: "_",
  },
  hiddenCel: {
    format: "(##) ####*-***#",
    mask: "_",
  },
  cpf: {
    format: "###.###.###-##",
    mask: "_",
  },
  cnpj: {
    format: "##.###.###/####-##",
    mask: "_",
  },
  cep: {
    format: "#####-###",
    mask: "_",
  },
};

type InputMaskType = keyof typeof maskProps;

export type InputMaskProps = Omit<PatternFormatProps, "type" | "format"> & {
  type: InputMaskType;
  noControl?: boolean;
};

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, name, type, displayType = "input", noControl, ...rest }: InputMaskProps, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    const { returnFormattedValue, ...maskRest } = maskProps[type];

    const classes = cn(
      "flex h-8 w-full bg-[--input-background] text-[--input-foreground] px-3 py-1 transition-colors",
      "border rounded-sm border-[--input-border]",
      "placeholder:text-muted-foreground",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "focus-visible:ring-0 focus-visible:border-[--input-ring] focus-visible:outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50",
      displayType === "text" && "border-0 p-0 disabled:cursor-text disabled:opacity-100 h-fit bg-transparent",
      className,
    );

    if (!formContext || !formContext.control || noControl) {
      return (
        <PatternFormat
          className={classes}
          {...maskRest}
          getInputRef={ref}
          disabled={displayType === "text"}
          onChange={(e) => e.preventDefault()}
          {...rest}
        />
      );
    }

    return (
      <Controller
        name={name}
        control={formContext.control}
        render={(props) => (
          <>
            <PatternFormat
              className={classes}
              {...maskRest}
              {...props.field}
              getInputRef={ref}
              disabled={displayType === "text"}
              onChange={(e) => e.preventDefault()}
              onValueChange={(e) =>
                props.field.onChange({
                  target: {
                    value: returnFormattedValue ? e.formattedValue : e.value,
                  },
                })
              }
            />

            <div className="text-red-400">{props.fieldState.error?.message}</div>
          </>
        )}
      />
    );
  },
);

InputMask.displayName = "InputMask";

export { InputMask };
