import { ChangeEvent, useEffect, useRef } from "react";
import "./App.css";
import * as wasmPkg from "./pkg";

function App() {
  // const wasm = useMemo(() => wasmPkg.start("Zelda"), []);

  const terminalRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    wasmPkg.start("Zelda");

    // let terminal = terminalRef.current;

    // terminal &&
    //   terminal.addEventListener("prompt-update", (event: CustomEventInit) =>
    //     console.log(event.detail)
    //   );
  }, []);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = formData.get("input");

    console.log(input);
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
