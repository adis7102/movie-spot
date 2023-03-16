import React, { useState, useEffect } from 'react';
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { wrapper } from "../store";

import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import Toast from "../components/ToastComponent";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url !== router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <Navbar />
      <ScrollToTop />
      <Toast />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
