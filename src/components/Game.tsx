import { useEffect, useMemo, useRef, useState } from "react";
import * as wasmPkg from "../pkg/you_are_merlin";
import { Controls } from "./Controls";
import { InputType } from "../types";

interface GameProps {
  theme: string;
  inputType: InputType | undefined;
  resetGame: () => void;
}

export const Game = ({ theme, inputType, resetGame }: GameProps) => {
  const game = useMemo(() => new wasmPkg.Game(theme), []);
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [data, setData] = useState("");
  const [actions, setActions] = useState(game.get_actions());

  useEffect(() => {
    setData(game.get_intro());
  }, []);

  useEffect(() => {
    terminalRef.current && scrollTerminalToBottom(terminalRef.current);
  }, [data]);

  useEffect(() => {
    setActions(game.get_actions());
  }, [game.get_actions()]);

  useEffect(() => {
    getPrompt();
  }, [game.get_prompt()]);

  const updateTerminal = (value: string, newLine?: boolean) => {
    setData((data) => {
      return (data += `${newLine === false ? "<br/>" : "<br/></br>"}` + value);
    });
  };

  const getPrompt = () => {
    const prompt = game.get_prompt();
    prompt && updateTerminal(prompt);

    if (inputType == InputType.Keyboard) {
      const actions = game.get_actions();
      actions && updateTerminal(actions);
    }
  };

  const handleEventLoop = () => {
    return new Promise<void>((resolve) => {
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

  const sendAction = (action: string) => {
    updateTerminal(
      `<span style="color: var(--grey-300);">> ${action.replace(
        "--theme",
        "--kill"
      )}</span>`,
      true
    );

    const response = game.handle_action(action);
    if (response) updateTerminal(response);

    if (game.has_event_loop()) {
      handleEventLoop();
    }
  };

  return (
    <>
      <article
        className="terminal"
        ref={terminalRef}
        dangerouslySetInnerHTML={{ __html: data }}
      ></article>
      {!game.has_event_loop() && game.is_running() && (
        <Controls
          actions={actions ?? ""}
          sendAction={sendAction}
          inputType={inputType}
        />
      )}
      {!game.is_running() && (
        <button className="button" onClick={resetGame}>
          New Game
        </button>
      )}
    </>
  );
};
