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
        <Component {...pageProps} />
      </PrivateRoute>
    </ApolloProvider>
  );
}
