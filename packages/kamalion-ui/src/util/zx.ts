import { isValid, parseISO } from "date-fns";
import * as zod from "zod";

export function emptyStringAsUndefined(zodStuff: zod.ZodString | zod.ZodOptional<zod.ZodString>) {
  return zod.preprocess((arg) => (arg === "" ? undefined : arg), zodStuff);
}

export const zx = {
  ...zod,
  datetime: (args?: { required?: boolean; message?: string; invalid_message?: string }) => {
    if (!args) {
      args = {
        required: true,
      };
    }

    return zod
      .string()
      .optional()
      .transform((val, ctx) => {
        if (!val && !args.required) return undefined;

        if (!val && args.required) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: args.invalid_message ?? "Required",
          });

          return undefined;
        }

        if (!isValid(parseISO(val!))) {
          ctx.addIssue({
            code: zod.ZodIssueCode.custom,
            message: args.invalid_message ?? "Invalid date",
          });

          return undefined;
        }

        return parseISO(val!);
      });
  },
};
