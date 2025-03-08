import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AboutReactJs from "./AboutReact";
import { SaludarAlProfe } from "./saludos/SaludarAlProfe";
import Counter from "./hook/Counter";
import CounterParaPruebas from "./Pruebas/CounterParaPruebas";

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <AboutReactJs />
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <SaludarAlProfe />

        <Counter />

        <CounterParaPruebas />
      </header>
    </div>
  );
}

export default App;
