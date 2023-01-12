import { ChangeEvent, useState } from "react";
import { saveAs } from "file-saver";
import CryptoJS from "crypto-js";
import TextArea from "../components/TextArea";
import InputText from "../components/InputText";
import { toast } from "react-hot-toast";

interface IDES {
  key: string;
  plaintext: string;
  ciphertext: string;
  option: string;
}

const Practica1 = () => {
  const [file, setFile] = useState<File | null>(null);

  const [stateDES, setStateDES] = useState<IDES>({
    key: "",
    plaintext: "",
    ciphertext: "",
    option: "plaintext",
  });

  const { key, plaintext, ciphertext, option } = stateDES;

  const onChangeDES = (
    event: ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const id = event.target.id;
    setStateDES({ ...stateDES, [id]: event.target.value });
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result?.toString();
        if (text) {
          option === "plaintext"
            ? setStateDES({ ...stateDES, plaintext: text })
            : setStateDES({ ...stateDES, ciphertext: text });
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  };

  const saveFile = () => {
    // if (file?.name) {
    const filename = file ? file.name.split(".")[0] : "file";
    const extension = option === "plaintext" ? "_D" : "_C";
    const blob = new Blob([option === "plaintext" ? plaintext : ciphertext], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `${filename}${extension}`);
  };

  const encode = () => {
    if (key) {
      const newCiphertext = CryptoJS.DES.encrypt(
        JSON.stringify({ plaintext }),
        key
      ).toString();
      console.log(newCiphertext);
      setStateDES({ ...stateDES, ciphertext: newCiphertext });
    }
  };

  const decode = () => {
    if (key) {
      try {
        const newPlaintext = CryptoJS.DES.decrypt(ciphertext, key).toString(
          CryptoJS.enc.Utf8
        );

        setStateDES({ ...stateDES, plaintext: newPlaintext });
      } catch (error) {
        toast.error("Error in data");
      }
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-neutral-300 text-center">
        Practica 1
      </h1>

      <section className="grid grid-cols-2 gap-8">
        <div className="my-10 space-y-6">
          <InputText id="key" name="Key" value={key} onChange={onChangeDES} />
          <div className="space-x-4">
            <button className="btn" onClick={encode}>
              Encode
            </button>
            <button className="btn" onClick={decode}>
              Decode
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-center font-medium text-xl">Options</h3>
          <div className="mb-2">
            <label className="text-lg font-medium pr-4">Text: </label>
            <select
              id="option"
              className="text-input py-1"
              value={option}
              onChange={onChangeDES}
            >
              <option value="plaintext">Plain Text</option>
              <option value="ciphertext">Cipher Text</option>
            </select>
            <button onClick={saveFile} className="btn ml-8">
              Download
            </button>
          </div>
          <div>
            <label className="text-lg font-medium pr-4">Upload: </label>
            <input type="file" onChange={handleFile} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8 w-full mt-6">
        <TextArea
          name="Plain Text"
          id="plaintext"
          text={plaintext}
          onChange={onChangeDES}
        />
        <TextArea
          name="Cipher Text"
          id="ciphertext"
          text={ciphertext}
          onChange={onChangeDES}
        />
      </div>
    </div>
  );
};

export default Practica1;
