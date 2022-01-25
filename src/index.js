import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CustomHeaderTable from "./CustomHeaderTable";
import MobxTable from "./MobxTable";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <h1>自定义头部</h1>
    <CustomHeaderTable />
    <h1 style={{ marginTop: "20px" }}>mobx table</h1>
    <MobxTable />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
