import React, { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { NextPage } from "next";
import Head from "next/head";
import Providers from "../components/Providers";
import { trpc } from "../lib/trpc";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: any;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page: ReactElement) => page);

  return (
    <Providers>
      <Head>
        <title>Protocol Accelerate Template</title>
        <meta
          name="description"
          content="Jumpstart your next web and mobile application"
        />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
};

export default trpc.withTRPC(App);
