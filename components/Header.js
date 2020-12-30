import Head from "next/head";

const Header = () => (
  <Head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title class="next/head">Profital</title>

    <script
      type="text/javascript"
      src="js/libs/bootstrap/dist/js/bootstrap.bundle.min.js"
    ></script>
    <script
      type="text/javascript"
      src="js/libs/jquery/dist/jquery.slim.min.js"
    ></script>
    <script
      type="text/javascript"
      src="js/libs/apexcharts/dist/apexcharts.min.js"
    ></script>
    <script
      type="text/javascript"
      src="js/libs/jqvmap/dist/jquery.vmap.min.js"
    ></script>
    <script
      type="text/javascript"
      src="js/libs/jqvmap/dist/maps/jquery.vmap.world.js"
    ></script>
    <script type="text/javascript" src="js/tabler.min.js"></script>
  </Head>
);

export default Header;
