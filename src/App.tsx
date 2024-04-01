import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import "./App.css";
import * as wasmPkg from "./pkg";

function App() {
  const wasm = useMemo(() => new wasmPkg.Game("Zelda"), []);

  const terminalRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(wasm.get_prompt());
  }, []);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = formData.get("input");

    wasm.handle_action(input?.toString() ?? "");

    console.log(wasm.get_prompt());
  };

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WASM.</p>
      <textarea
        ref={terminalRef}
        id="terminal"
        className="input"
        cols={20}
        rows={16}
        readOnly
      />
      <form id="main-form" onSubmit={handleSubmit} autoComplete="off">
        <fieldset>
          <input className="input" name="input" type="text" />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
}

export default App;
