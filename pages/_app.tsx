import { AppProps } from "next/app";
import { wrapper } from "../store";

import Navbar from "../components/Navbar";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
