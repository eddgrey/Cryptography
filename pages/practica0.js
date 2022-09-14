import { useState } from "react";
import { saveAs } from "file-saver";
import CryptoJS from "crypto-js";

const practica0 = () => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [option, setOption] = useState("plaintext");

  const handleFile = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);

      const reader = new FileReader();
      reader.onload = (e) => {
        option === "plaintext"
          ? setPlainText(e.target.result)
          : setCipherText(e.target.result);
      };
      reader.readAsText(event.target.files[0]);
    }
  };

  const saveFile = () => {
    if (file.name) {
      const filename = file.name.split(".")[0];
      const extension = option === "plaintext" ? "_C" : "_D";
      const blob = new Blob([plainText], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${filename}${extension}`);
    }
  };

  const encode = () => {
    if (key) {
      setCipherText(CryptoJS.DES.encrypt(plainText, key).toString());
    }
  };

  const decode = () => {
    if (key) {
      setPlainText(
        CryptoJS.DES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8)
      );
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-neutral-300 text-center">
        Practica 0
      </h1>

      <section className="grid grid-cols-2 gap-8">
        <div className="my-10 space-y-6">
          <div className="flex w-full items-center">
            <label className="text-lg font-medium pr-4">Key: </label>
            <input
              type="text"
              className="text-input w-full py-1"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
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
              className="text-input py-1"
              value={option}
              onChange={(e) => setOption(e.target.value)}
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
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Plain Text: </label>
          <textarea
            className="text-input text-lg"
            rows={10}
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Cipher Text: </label>
          <textarea
            className="text-input text-lg"
            rows={10}
            value={cipherText}
            onChange={(e) => setCipherText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default practica0;
