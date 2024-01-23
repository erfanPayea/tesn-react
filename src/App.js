import logo from './logo.svg';
import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import NavigationBar from "./components/navigationBar";


function App() {
  return (
    <div className="App">
      <header >
        <NavigationBar />

      </header>
    </div>
  );
}

export default App;
