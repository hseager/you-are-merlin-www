import { useState } from "react";
import "./App.css";
import { Game } from "./components/Game";
import { ThemeSelection } from "./components/ThemeSelection";
import { InputType } from "./types";
import { InputSelection } from "./components/InputSelection";

function App() {
  const [theme, setTheme] = useState("");
  const [inputType, setInputType] = useState<InputType>();

  const isGameReady = () => theme && typeof inputType !== "undefined";

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WebAssembly (WASM)</p>
      <br />
      <br />
      {!isGameReady() && (
        <>
          <ThemeSelection theme={theme} setTheme={setTheme} />
          <InputSelection inputType={inputType} setInputType={setInputType} />
        </>
      )}
      {}

      {isGameReady() && (
        <Game theme={theme} setTheme={setTheme} inputType={inputType} />
      )}
    </>
  );
}

export default App;
