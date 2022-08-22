import React from "react";
import "./App.css";
import { Header } from "./Header";
import { Constants } from "../common/constants";
import { HouseList } from "../house/HouseList";

function App() {
  return (
    <div className="container">
      <Header subtitle={Constants.headerTitle}></Header>
      <HouseList />
    </div>
  );
}

export default App;
