"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { cn } from "../../util/cn";
import { InputBaseClassNames, InputTextBaseClassNames } from "./InputBaseClassNames";
import { format, formatISO, isValid, parse, parseISO } from "date-fns";

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
  noError?: boolean;
};

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, name, type, value, noError, displayType = "input", noControl, ...rest }: InputMaskProps, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    const { returnFormattedValue, ...maskRest } = maskProps[type];
    
    const val = formContext?.watch(name) ?? undefined;
    // console.log({val});
    const val2 = type === "date" && val ? format(parseISO(val), "dd/MM/yyyy") : val;

    const classes = cn(
      InputBaseClassNames,
      displayType === "text" && InputTextBaseClassNames,
      className
    );

    if (!formContext || !formContext.control || noControl) {
      return (
        <PatternFormat
          className={classes}
          {...maskRest}
          getInputRef={ref}
          disabled={displayType === "text"}
          onChange={(e) => e.preventDefault()}
          displayType={displayType}
          id={name}
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
              displayType={displayType}
              id={name}
              {...rest}
              onChange={(e) => e.preventDefault()}
              value={val2}
              onValueChange={(e) => {
                if (isValid(parse(e.formattedValue, "dd/MM/yyyy", new Date()))) {
                  formContext.setValue(name, formatISO(parse(e.formattedValue, "dd/MM/yyyy", new Date())));
                } else {
                  formContext.resetField(name);
                }
              }}
            />
            
            {formContext.formState?.errors?.[name] && (
              <div className="text-red-400" data-testid={`error-${name}`}>
                {!noError && props.fieldState.error?.message}
              </div>
            )}
          </>
        )}
      />
    );
  }
);

InputMask.displayName = "InputMask";

export { InputMask };
