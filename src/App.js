import React from "react";
import "./App.css";
import Todoapp from "./components/Todoapp";

function App() {
  return (
    <div className="main-container">
      <h1 className="main-title">My Daily Tasks</h1>
      <Todoapp />
    </div>
  );
}

export default App;