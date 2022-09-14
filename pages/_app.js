import BgImg from "../components/BgImg";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <BgImg>
      <Component {...pageProps} />
    </BgImg>
  );
}

export default MyApp;
