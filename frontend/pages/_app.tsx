import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import axios from "axios";
import https from "https";
import { persistor, wrapper } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

axios.defaults.httpsAgent = new https.Agent({
   rejectUnauthorized: false,
});

function App({ Component, ...rest }: AppProps) {
   const { store, props } = wrapper.useWrappedStore(rest);
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
               <Component {...props.pageProps} />
               <ToastContainer />
            </QueryClientProvider>
         </PersistGate>
      </Provider>
   );
}

export default App;
