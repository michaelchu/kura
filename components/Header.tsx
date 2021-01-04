import Head from "next/head";
import React from "react";

const Header = () => (
  <Head>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <title className="next/head">Profital</title>

    <script
      type="text/javascript"
      src="js/libs/bootstrap/dist/js/bootstrap.bundle.min.js"
    />
    <script
      type="text/javascript"
      src="js/libs/jquery/dist/jquery.slim.min.js"
    />
  </Head>
);

export default Header;
