import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import InputText from "../components/InputText";
import { euclidesExtend } from "../lib/helpers";

interface Practica2 {
  alpha: string;
  alphaInv: string;
  beta: string;
  n: string;
  error: string | null;
  showResult: boolean;
}

const Practica2 = () => {
  const [state, setState] = useState<Practica2>({
    alpha: "",
    alphaInv: "",
    beta: "",
    n: "",
    error: null,
    showResult: false,
  });

  const { alpha, beta, alphaInv, n, error, showResult } = state;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;

    setState({
      ...state,
      showResult: false,
      [id]: value,
    });
  };

  const affineFunction = () => {
    if (isNaN(parseInt(alpha)) || isNaN(parseInt(beta)) || isNaN(parseInt(n))) {
      toast.error("Valores no validos");
      return;
    }

    const { mcd, inverso } = euclidesExtend(alpha, n);

    if (mcd !== 1) {
      toast.error("Alpha y N no son coprimos");
      return;
    }
    setState({ ...state, showResult: true, alphaInv: inverso.toString() });
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-neutral-300 text-center">
        Practica 2
      </h1>
      <div className="bg-gray-800 py-8 px-12 rounded-md space-y-4 w-2/5 mt-8">
        <InputText id="alpha" name="Alpha" value={alpha} onChange={onChange} />
        <InputText id="beta" name="Beta" value={beta} onChange={onChange} />
        <InputText id="n" name="N" value={n} onChange={onChange} />
        <button className="btn" onClick={affineFunction}>
          Comprobar
        </button>
        {showResult && (
          <div className="pt-2 space-y-2 text-lg">
            <h3 className="text-xl font-medium text-center mb-4">
              Affine Cipher
            </h3>
            <p className="">
              Ek = C = {parseInt(alpha) % parseInt(n)}p +{" "}
              {parseInt(beta) % parseInt(n)} mod {n}
            </p>
            <p className="">
              Dk = p = {alphaInv} (C +{" "}
              {parseInt(n) - (parseInt(beta) % parseInt(n))}) mod{n}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Practica2;
