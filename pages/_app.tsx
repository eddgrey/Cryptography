import "../styles/globals.css";
import type { AppProps } from "next/app";
import Background from "../components/Background";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

function App({ Component, pageProps }: AppProps) {
  return (
    <Background>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </Background>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
