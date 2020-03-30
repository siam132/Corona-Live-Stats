import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import Charts from "./pages/ChartPage";

function App() {
  return (
    <div className="App container-container">
      <BrowserRouter>
        <Route exact path="/" component={HomePage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
