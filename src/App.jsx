import { BrowserRouter } from "react-router-dom";
import Routes from "../src/routes/routes";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </>
  );
}
