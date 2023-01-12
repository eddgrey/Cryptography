import { ChangeEvent, FormEvent, useState } from "react";
import InputText from "../components/InputText";
import RadioButton from "../components/RadioButton";
import CryptoJS from "crypto-js";
import Web3 from "web3";

interface Formulario {
  opcion: string;
  modoOperacion: string;
  llave: string;
  c0: string;
}

const practica3 = () => {
  const [form, setForm] = useState<Formulario>({
    opcion: "Cifrar",
    modoOperacion: "ECB",
    llave: "",
    c0: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState("");
  const [header, setHeader] = useState("");

  const { opcion, modoOperacion, llave, c0 } = form;
  const error =
    llave.length !== 16 || c0.length !== 16
      ? "La llave y c0 deben ser de 16 bytes"
      : null;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id;
    setForm({ ...form, [id]: value });
  };

  const saveFile = (datos: string) => {
    const extencion =
      (opcion === "Cifrar" ? "_e" : "_d") + modoOperacion + ".bmp";
    const filename = file ? file.name.split(".")[0] + extencion : "file";

    let binary = new Array();
    for (let i = 0; i < datos.length / 2; i++) {
      let h = datos.substr(i * 2, 2);
      binary[i] = parseInt(h, 16);
    }

    let byteArray = new Uint8Array(binary);

    const blob = new Blob([byteArray], { type: "image/bmp" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.download = filename;
    link.href = url;
    link.click();
  };

  const getMode = () => {
    switch (modoOperacion) {
      case "ECB":
        return CryptoJS.mode.ECB;
      case "CBC":
        return CryptoJS.mode.CBC;
      case "CFB":
        return CryptoJS.mode.CFB;
      case "OFB":
        return CryptoJS.mode.OFB;
      default:
        break;
    }
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target?.result;
        const wordArray = CryptoJS.lib.WordArray.create(file);
        const str = CryptoJS.enc.Hex.stringify(wordArray);

        setHeader(str.slice(0, 108)); // 54 bytes de cabecera
        setData(str.slice(108));
      };
      reader.readAsArrayBuffer(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mode = getMode();
    const key = CryptoJS.enc.Utf16.parse(Web3.utils.utf8ToHex(llave).slice(2));
    const iv = CryptoJS.enc.Utf16.parse(Web3.utils.utf8ToHex(c0).slice(2));

    const JsonFormatter = {
      stringify: function (cipherParams: CryptoJS.lib.CipherParams) {
        // create json object with ciphertext
        const jsonObj = {
          ciphertext: cipherParams.ciphertext.toString(CryptoJS.enc.Hex),
        };

        // optionally add iv and salt
        if (cipherParams.iv) {
          jsonObj.iv = cipherParams.iv.toString();
        }
        if (cipherParams.salt) {
          jsonObj.s = cipherParams.salt.toString();
        }

        // stringify json object
        return JSON.stringify(jsonObj);
      },

      parse: function (jsonStr) {
        // parse json string
        var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Hex.parse(jsonObj.ct),
        });

        // optionally extract iv and salt
        if (jsonObj.iv) {
          cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        }
        if (jsonObj.s) {
          cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        }

        return cipherParams;
      },
    };

    let datos = "";
    if (opcion === "Cifrar") {
      const cifrado = CryptoJS.AES.encrypt(CryptoJS.enc.Hex.parse(data), key, {
        mode,
        iv,
        format: JsonFormatter,
      });
      datos = JSON.parse(cifrado).ciphertext;
    } else {
      const encObj = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Hex.parse(data),
      });

      const decifrado = CryptoJS.AES.decrypt(encObj, key, {
        mode,
        iv,
      });
      datos = CryptoJS.enc.Hex.stringify(decifrado);
    }
    saveFile(header + datos);
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-neutral-300 text-center">
        Practica 3
      </h1>
      <form
        className="flex flex-col bg-gray-800 py-8 px-12 rounded-md space-y-8 w-2/5 mt-8"
        onSubmit={onSubmit}
      >
        <div className="flex space-x-5">
          <label className="w-1/4 text-lg font-medium pr-4">Opcion: </label>
          <RadioButton
            id="opcion"
            name="Cifrar"
            value={opcion}
            onChange={onChange}
          />
          <RadioButton
            id="opcion"
            name="Decifrar"
            value={opcion}
            onChange={onChange}
          />
        </div>
        <div className="flex space-x-5">
          <label>Modo de operacion: </label>
          <RadioButton
            id="modoOperacion"
            name="ECB"
            value={modoOperacion}
            onChange={onChange}
          />
          <RadioButton
            id="modoOperacion"
            name="CBC"
            value={modoOperacion}
            onChange={onChange}
          />
          <RadioButton
            id="modoOperacion"
            name="CFB"
            value={modoOperacion}
            onChange={onChange}
          />
          <RadioButton
            id="modoOperacion"
            name="OFB"
            value={modoOperacion}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="text-lg font-medium pr-4">Archivo: </label>
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>
        <InputText
          id="llave"
          name="Llave"
          color={llave.length === 16 ? "" : "text-red-300"}
          value={llave}
          onChange={onChange}
        />
        <InputText
          id="c0"
          name="Vector de Inicializacion (C0)"
          color={c0.length === 16 ? "" : "text-red-300"}
          value={c0}
          onChange={onChange}
        />
        <button className={`btn ${Boolean(error) ? "hidden" : "visible"}`}>
          Submit
        </button>
        <p className="text-red-300">{error}</p>
      </form>
    </main>
  );
};

export default practica3;
