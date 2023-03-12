import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        {/* <script src='/socket.io/socket.io.js'></script>
        <script>var socket = io();</script> */}
        <NextScript />
      </body>
    </Html>
  );
}
