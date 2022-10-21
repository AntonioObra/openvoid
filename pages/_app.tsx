import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <Provider store={store}>
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
    // </Provider>
  );
}

export default MyApp;
