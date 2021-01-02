import "../public/js/libs/jqvmap/dist/jqvmap.min.css";
import "../assets/css/tabler.min.css";
import "../assets/css/tabler-flags.min.css";
import "../assets/css/tabler-payments.min.css";
import "../assets/css/tabler-vendors.min.css";
import "../assets/css/demo.min.css";
import React from "react";

import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://profital.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
