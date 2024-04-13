import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import * as wasmPkg from "../pkg/you_are_merlin";
import { ActionButtons } from "./ActionButtons";

interface GameProps {
  theme: string;
}

export const Game = ({ theme }: GameProps) => {
  const game = useMemo(() => new wasmPkg.Game(theme), []);
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState("");

  const [actions, setActions] = useState(game.get_actions());

  useEffect(() => {
    setData(game.get_intro());

    const prompt = game.get_prompt();
    prompt && updateTerminal(prompt);
  }, []);

  useEffect(() => {
    terminalRef.current && scrollTerminalToBottom(terminalRef.current);
  }, [data]);

  useEffect(() => {
    setActions(game.get_actions());
  }, [game.get_actions()]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = formData.get("input");

    sendAction(input?.toString().trim() ?? "");
  };

  const updateTerminal = (value: string, newLine?: boolean) => {
    setData((data) => {
      return (data += `${newLine === false ? "\n" : "\n\n"}` + value);
    });
  };

  const sendAction = (action: string) => {
    const response = game.handle_action(action);
    if (response) updateTerminal(response);

    setInput("");

    if (game.has_event_loop()) {
      handleEventLoop().then(getPrompt);
    } else {
      getPrompt();
    }
  };

  const getPrompt = () => {
    const prompt = game.get_prompt();
    prompt && updateTerminal(prompt);
  };

  const handleEventLoop = () => {
    return new Promise<void>((resolve) => {
      updateTerminal(game.progress_event_loop(), false);
      const eventLoop = setInterval(() => {
        if (game.has_event_loop()) {
          updateTerminal(game.progress_event_loop(), false);
        } else {
          clearInterval(eventLoop);
          resolve();
        }
      }, game.get_event_loop_interval() * 1000);
    });
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
      {!game.has_event_loop() && game.is_running() && (
        <form onSubmit={handleSubmit} autoComplete="off">
          <ActionButtons
            actions={actions ? actions.split(",") : []}
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
      )}
    </>
  );
};
