import { useState } from "react";
import { Game } from "./components/Game";
import { ThemeSelection } from "./components/ThemeSelection";
import { InputType } from "./types";
import { InputSelection } from "./components/InputSelection";

function App() {
  const [theme, setTheme] = useState("");
  const [inputType, setInputType] = useState<InputType>();

  const isGameReady = () => theme && typeof inputType !== "undefined";

  const resetGame = () => {
    setTheme("");
    setInputType(undefined);
  };

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WebAssembly (WASM)</p>
      <br />
      <br />
      {!theme && <ThemeSelection theme={theme} setTheme={setTheme} />}
      {theme && typeof inputType == "undefined" && (
        <InputSelection inputType={inputType} setInputType={setInputType} />
      )}
      {isGameReady() && (
        <Game theme={theme} inputType={inputType} resetGame={resetGame} />
      )}
    </>
  );
}

export default App;
