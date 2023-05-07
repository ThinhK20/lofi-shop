import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import axios from "axios";
import https from "https";
import { wrapper } from "../redux/store";

const queryClient = new QueryClient();

axios.defaults.httpsAgent = new https.Agent({
   rejectUnauthorized: false,
});

function App({ Component, ...rest }: AppProps) {
   const { store, props } = wrapper.useWrappedStore(rest);
   return (
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <Component {...props.pageProps} />
            <ToastContainer />
         </QueryClientProvider>
      </Provider>
   );
}

export default App;
