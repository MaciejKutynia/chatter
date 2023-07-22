import { createRoot } from "react-dom/client";

import App from "./App";

import { store } from "./store/index";
import { Provider } from "react-redux";

const node = document.getElementById("root")!;
const root = createRoot(node);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
