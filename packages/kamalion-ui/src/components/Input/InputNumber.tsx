import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { cn } from "../../util/cn";

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
        <NumericFormat
          className={classes}
          {...maskProps[type]}
          getInputRef={ref}
          onChange={(e) => e.preventDefault()}
          disabled={displayType === "text"}
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
              onChange={(e) => e.preventDefault()}
              onValueChange={(e) =>
                props.field.onChange({
                  target: {
                    value: e.value,
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

InputNumber.displayName = "InputNumber";

export { InputNumber };
