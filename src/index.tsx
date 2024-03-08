import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./app/pages/home-page/ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
