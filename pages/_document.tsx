import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@tabler/icons@latest/iconfont/tabler-icons.min.css"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/@tabler/core@latest/dist/css/tabler.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Rubik"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>

        <body className="theme-dark">
          <div className="wrapper">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
