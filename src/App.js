import React from "react";
import "./App.css";
import Todoapp from "./components/Todoapp";

const App = () => {
  return (
    <main className="main-container">
      <h1 className="main-title">My Daily Tasks</h1>
      <Todoapp />
    </main>
  );
};

export default App;