import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import * as wasmPkg from "../pkg/you_are_merlin";
import { ActionButtons } from "./ActionButtons";

interface GameProps {
  theme: string;
}

export const Game = ({ theme }: GameProps) => {
  const wasm = useMemo(() => new wasmPkg.Game(theme), []);
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    setData(wasm.get_initial_prompt());
    updateTerminal(wasm.get_prompt());
  }, []);

  useEffect(() => {
    terminalRef.current && scrollTerminalToBottom(terminalRef.current);
  }, [data]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = formData.get("input");

    sendAction(input?.toString().trim() ?? "");
  };

  const updateTerminal = (value: string) => {
    setData((data) => {
      return (data += "\n\n" + value);
    });
  };

  const sendAction = (action: string) => {
    let response = wasm.handle_action(action);
    if (response) updateTerminal(response);

    updateTerminal(wasm.get_prompt());

    setInput("");

    if (wasm.player_is_healing()) {
      setInterval(() => {
        updateTerminal(wasm.heal_player());
        if (!wasm.player_is_healing()) clearInterval(this);
      }, 2000);
    }
  };

  const scrollTerminalToBottom = (terminal: HTMLTextAreaElement) =>
    (terminal.scrollTop = terminal?.scrollHeight);

  return (
    <>
      <textarea
        className="input"
        cols={20}
        rows={16}
        value={data}
        ref={terminalRef}
        readOnly
      />
      <form onSubmit={handleSubmit} autoComplete="off">
        <ActionButtons
          actions={wasm.get_actions_display_list().split(",")}
          sendAction={sendAction}
        />
        <fieldset>
          <input
            className="input"
            name="input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button>Submit</button>
        </fieldset>
      </form>
    </>
  );
};
