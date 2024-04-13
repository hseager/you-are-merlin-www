import { useState } from "react";
import "./App.css";
import { Game } from "./components/Game";
import { ThemeSelection } from "./components/ThemeSelection";

function App() {
  const [theme, setTheme] = useState("");

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WebAssembly (WASM)</p>
      <br />
      <br />
      {!theme && <ThemeSelection setTheme={setTheme} />}
      {theme && <Game theme={theme} setTheme={setTheme} />}
    </>
  );
}

export default App;
