import { useState } from "react";
import "./App.css";
import { Terminal } from "./components/Terminal";
import { ThemeSelection } from "./components/ThemeSelection";

function App() {
  const [theme, setTheme] = useState("");

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WASM.</p>
      <br />
      <br />
      {!theme && <ThemeSelection setTheme={setTheme} />}
      {theme && <Terminal theme={theme} />}
    </>
  );
}

export default App;
