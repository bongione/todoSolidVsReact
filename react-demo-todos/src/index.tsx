import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FunctionRendersProvider from "./FunctionsRendersProvider";
import DataProvider from "./dataprovider";
import FunctionRendersPanel from "./FunctionsRendersPanel";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);

const logDiv = ReactDOM.createRoot(
  document.getElementById("logging") as HTMLElement
);
logDiv.render(
  <FunctionRendersProvider>
    <FunctionRendersPanel />
  </FunctionRendersProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
