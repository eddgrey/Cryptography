import { ChangeEvent } from "react";

interface Props {
  name: string;
  text: string;
  id: string;
  onChange: (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => void;
}

const TextArea = ({ name, text, id, onChange }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold mb-2">{name}</label>
      <textarea
        id={id}
        className="text-input text-lg"
        rows={10}
        value={text}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
