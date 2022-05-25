import DataForm, {
  setConfig,
  makeInputField,
  Field,
  Keys,
  DataFormProps,
} from "react-with-native-form";

import {
  TextInput,
  TextInputType,
  PasswordInput,
  PasswordInputType,
  DateInput,
  DateInputType,
  DatetimeInput,
  DatetimeInputType,
  // MapInput,
  // MapInputType,
  NumberInput,
  NumberInputType,
  SelectInput,
  SelectInputType,
  StarsInput,
  StarsInputType,
  PhoneInput,
  PhoneInputType,
  TextAreaInput,
  TextAreaInputType,
  TimeInputType,
  TimeInput,
  ToggleInput,
  ToggleInputType,
  SelectMultipleInput,
  SelectMultipleInputType,
  LabelsInput,
  LabelsInputType,
} from "react-with-native-form-inputs";

const text = { component: TextInput };
const password = { component: PasswordInput };
const date = { component: DateInput };
const datetime = { component: DatetimeInput };
const number = { component: NumberInput };
const select = { component: SelectInput };
const selectMultiple = { component: SelectMultipleInput };
const stars = { component: StarsInput };
const phone = { component: PhoneInput };
const textArea = { component: TextAreaInput };
const time = { component: TimeInput };
const toggle = { component: ToggleInput };
const labels = { component: LabelsInput };
const plugins = {
  text,
  password,
  date,
  datetime,
  number,
  select,
  selectMultiple,
  stars,
  phone,
  textArea,
  time,
  toggle,
  labels,
};

export const makeField = <T extends Keys<Inputs>>(
  type: T,
  config: Omit<Field<Inputs, T>, "type">
) => makeInputField<Inputs, T>(type, config);

export interface Inputs {
  text: TextInputType;
  password: PasswordInputType;
  date: DateInputType;
  datetime: DatetimeInputType;
  number: NumberInputType;
  select: SelectInputType;
  selectMultiple: SelectMultipleInputType;
  stars: StarsInputType;
  phone: PhoneInputType;
  textArea: TextAreaInputType;
  time: TimeInputType;
  toggle: ToggleInputType;
  labels: LabelsInputType;
}

export type InputValues = {
  [key in keyof Inputs]: Inputs[key]["value"];
};

export const Form = <TState extends { [key: string]: any } = any>(
  props: DataFormProps<Inputs, TState>
) =>
  setConfig<Inputs, TState>(DataForm, {
    plugins,
  })(props);
