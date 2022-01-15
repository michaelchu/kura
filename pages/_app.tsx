import React from "react";
import type { AppProps } from "next/app";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import useStorage from "../hooks/useStorage";
import "../styles.css";

export default function App({ Component, pageProps }: AppProps) {
  const { getItem } = useStorage();

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GQL_ENDPOINT,
      headers: {
        authorization: `Bearer ${getItem("token") || ""}`,
      },
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
