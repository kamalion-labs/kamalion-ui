import { InputRoot } from "./InputRoot";
import { InputLabel } from "./InputLabel";
import { InputText } from "./InputText";
import { InputTextArea } from "./InputTextArea";
import { InputPassword } from "./InputPassword";
import { InputNumber } from "./InputNumber";
import { InputSwitch } from "./InputSwitch";
import { InputCheckbox } from "./InputCheckbox";
import { InputGroup } from "./InputGroup";
import { InputIcon } from "./InputIcon";
import { InputButton } from "./InputButton";
import { InputSelect } from "./InputSelect";
import { InputAutocomplete } from "./InputAutocomplete";
import { InputMask } from "./InputMask";
import { InputFile } from "./InputFile";
import { InputDatePicker } from "./InputDatePicker";
import { InputErrors } from "./InputErrors";

/**
 * Form field controls. Use standalone (`value` / `onValueChange`) or bound to a
 * Form via the `name` prop.
 */
export const Input = Object.assign(InputRoot, {
  Label: InputLabel,
  Text: InputText,
  TextArea: InputTextArea,
  Password: InputPassword,
  Number: InputNumber,
  Switch: InputSwitch,
  Checkbox: InputCheckbox,
  Group: InputGroup,
  Icon: InputIcon,
  Button: InputButton,
  Select: InputSelect,
  Autocomplete: InputAutocomplete,
  Mask: InputMask,
  File: InputFile,
  DatePicker: InputDatePicker,
  Errors: InputErrors,
});

export { useInputField } from "./hooks";
export type { InputProps } from "./InputRoot";
export type { InputTextProps } from "./InputText";
export type { InputSelectProps } from "./InputSelect";
export type { InputAutocompleteProps } from "./InputAutocomplete";
export type { InputFileProps } from "./InputFile";
