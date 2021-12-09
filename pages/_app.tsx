import React from "react";
import { Hydrate } from "react-query/hydration";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import '../styles.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
