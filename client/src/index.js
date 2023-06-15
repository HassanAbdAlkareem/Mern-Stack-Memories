import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";
import { FunctionAlContext } from "./context/FunctionAlContext";

ReactDOM.render(
  <React.StrictMode>
    <FunctionAlContext>
      <App />
    </FunctionAlContext>
  </React.StrictMode>,
  document.getElementById("root")
);
