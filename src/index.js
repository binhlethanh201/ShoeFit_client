import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";

// CSS
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";

// JS Libraries
import "./assets/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
