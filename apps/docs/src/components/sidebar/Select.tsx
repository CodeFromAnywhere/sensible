import { ChangeEventHandler } from "react";

export type Option = {
  value: string;
  label: string;
};

const Select = ({
  onChange,
  value,
  options,
}: {
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  options: Option[];
  value: string;
}) => {
  return (
    <div className="flex flex-row ml-4 mr-2 my-4 items-center rounded-md bg-gray-200 hover:bg-gray-100">
      <select
        className="bg-transparent w-full h-full p-4"
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={`select-${option.value}`}
              className={``}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
