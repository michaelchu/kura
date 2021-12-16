import Head from "next/head";
import React from "react";

export default function Header() {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <title className="next/head">Kura - Porfolio Tracker & Planner</title>
    </Head>
  );
}
