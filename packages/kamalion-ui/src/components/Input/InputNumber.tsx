"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { cn } from "../../util/cn";
import { InputBaseClassNames, InputTextBaseClassNames } from "./InputBaseClassNames";

type MaskType = "money" | "percent" | "number";

type MaskPropsType = { [key in MaskType]: NumericFormatProps };

const maskProps: MaskPropsType = {
  money: {
    decimalScale: 2,
    fixedDecimalScale: true,
    thousandSeparator: ".",
    decimalSeparator: ",",
  },
  percent: {
    decimalSeparator: ",",
    decimalScale: 2,
    suffix: "%",
    fixedDecimalScale: true,
  },
  number: {
    thousandSeparator: ".",
    decimalSeparator: ",",
  },
};

type InputNumberType = keyof typeof maskProps;

export type InputNumberProps = Omit<NumericFormatProps, "type"> & {
  type?: InputNumberType;
  noControl?: boolean;
};

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, name, type = "number", displayType = "input", noControl, ...rest }: InputNumberProps, ref) => {
    const formContext = useFormContext();

    if (!name) return null;

    const classes = cn(
      InputBaseClassNames,
      displayType === "text" && InputTextBaseClassNames,
      className
    );

    if (!formContext || !formContext.control || noControl) {
      return (
        <NumericFormat
          className={classes}
          {...maskProps[type]}
          getInputRef={ref}
          onChange={(e) => e.preventDefault()}
          disabled={displayType === "text"}
          displayType={displayType}
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
            <NumericFormat
              className={classes}
              {...maskProps[type]}
              {...props.field}
              getInputRef={ref}
              disabled={displayType === "text"}
              onChange={(e) => {
                e.preventDefault();
              }}
              onValueChange={(e) => {
                props.field.onChange(e.floatValue);
              }}
              displayType={displayType}
              id={name}
            />

            {props.fieldState.error && (
              <div className="text-red-400" data-testid={`error-${name}`}>
                {props.fieldState.error?.message}
              </div>
            )}
          </>
        )}
      />
    );
  }
);

InputNumber.displayName = "InputNumber";

export { InputNumber };
