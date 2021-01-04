import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" src="js/tabler.min.js" />
          {/*<script*/}
          {/*  type="text/javascript"*/}
          {/*  src="js/libs/apexcharts/dist/apexcharts.min.js"*/}
          {/*></script>*/}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
