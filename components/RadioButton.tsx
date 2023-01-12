import { ChangeEvent } from "react";

interface Props {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const RadioButton = ({ id, name, value, onChange }: Props) => {
  return (
    <label>
      <input
        id={id}
        type="radio"
        className="mr-1"
        value={name}
        checked={value === name}
        onChange={onChange}
      />
      {name}
    </label>
  );
};

export default RadioButton;
