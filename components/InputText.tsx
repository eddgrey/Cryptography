import { ChangeEvent } from "react";

interface Props {
  name: string;
  id: string;
  type?: string;
  value: string;
  color?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  name,
  type = "text",
  id,
  value,
  color = "",
  onChange,
}: Props) => {
  return (
    <div className="flex w-full items-center">
      <label className="w-1/4 text-lg font-medium pr-4">{name}</label>
      <input
        type={type}
        id={id}
        className={`text-input w-full py-1 ${color}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputText;
