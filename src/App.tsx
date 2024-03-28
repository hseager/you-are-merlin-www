import { ChangeEvent, useMemo } from "react";
import "./App.css";
import * as wasmPkg from "./pkg";

function App() {
  const wasm = useMemo(() => wasmPkg.create(), []);

  const handleInput = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = formData.get("input");

    console.log(input);

    // wasm.run();
  };

  return (
    <>
      <h1>You are Merlin</h1>
      <p>A text adventure game built with Rust and WASM.</p>
      <textarea
        className="input"
        cols={20}
        rows={16}
        value={"Some text"}
        readOnly
      />
      <form onSubmit={handleInput}>
        <fieldset>
          <input className="input" name="input" type="text" />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
}

export default App;
