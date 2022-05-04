import "../globals.css";
import { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { StoreProvider } from "ui";

const progress = new ProgressBar();

//Binding events.
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  //TODO: Remove any

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
