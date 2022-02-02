import React from "react";
import type { AppProps } from "next/app";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import PrivateRoute from "../components/PrivateRoute";
import useStorage from "../hooks/useStorage";
import "../styles.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  // Add your protected routes here
  const protectedRoutes = ["/dashboard", "/closed-positions", "/transactions"];
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
      <PrivateRoute protectedRoutes={protectedRoutes}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <title>Kura - Portfolio Tracker & Planner</title>
        </Head>
        <Component {...pageProps} />
      </PrivateRoute>
    </ApolloProvider>
  );
}
