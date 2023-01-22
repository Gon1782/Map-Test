import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import reportWebVitals from "./reportWebVitals";
import Router from "./shared/router";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

declare global {
  interface Window {
    kakao: any;
  }
}

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router />
    </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
