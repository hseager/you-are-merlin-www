import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import * as wasmPkg from "../pkg";

interface TerminalProps {
    theme: string
}

export const Terminal = ({theme}: TerminalProps) => {
    const wasm = useMemo(() => new wasmPkg.Game(theme), []);
    const terminalRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState("");
    const [data, setData] = useState("");
    
    useEffect(() => {
        setData(wasm.get_initial_prompt());
        setData((data) => {
          return data += '\n\n' + wasm.get_prompt()
        })
    }, []);
  
    useEffect(() => {
      terminalRef.current && scrollTerminalToBottom(terminalRef.current);
    }, [data])
  
    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const input = formData.get("input");
  
      wasm.handle_action(input?.toString() ?? "");
  
      setData((data) => {
        return data += '\n\n' + wasm.get_prompt()
      })
      
      setInput("");
    };
  
    const scrollTerminalToBottom = (terminal: HTMLTextAreaElement) => 
        terminal.scrollTop = terminal?.scrollHeight;

    return (<><textarea
        id="terminal"
        className="input"
        cols={20}
        rows={16}
        value={data}
        ref={terminalRef}
        readOnly
      />
      <form id="main-form" onSubmit={handleSubmit} autoComplete="off">
        <fieldset>
          <input className="input" name="input" type="text" value={input} onChange={(event) => setInput(event.target.value)} />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>)
}