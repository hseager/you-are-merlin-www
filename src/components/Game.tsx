import { useEffect, useMemo, useRef, useState } from "react";
import * as wasmPkg from "../pkg/you_are_merlin";
import { Controls } from "./Controls";
import { InputType } from "../types";

interface GameProps {
  theme: string;
  inputType: InputType | undefined;
  resetGame: () => void;
}

type Row = {
  id: number;
  value: string;
  newLine: boolean;
};

export const Game = ({ theme, inputType, resetGame }: GameProps) => {
  const game = useMemo(() => new wasmPkg.Game(theme), []);
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [data, setData] = useState<Row[]>([]);
  const [actions, setActions] = useState(game.get_actions());

  useEffect(() => {
    setData([
      { id: new Date().getTime(), value: game.get_intro(), newLine: false },
    ]);
  }, []);

  useEffect(() => {
    terminalRef.current && scrollTerminalToBottom(terminalRef.current);
  }, [data]);

  useEffect(() => {
    getPrompt();
  }, [game.get_prompt()]);

  const updateTerminal = (value: string, newLine?: boolean) => {
    setData((prevData) => [
      ...prevData,
      {
        id: new Date().getTime(),
        value,
        newLine: newLine === false ? false : true,
      },
    ]);
  };

  const getPrompt = () => {
    const prompt = game.get_prompt();
    prompt && updateTerminal(prompt);

    const actions = game.get_actions();
    if (inputType == InputType.Keyboard) {
      actions && updateTerminal(actions.join(", "));
    }
    setActions(actions);
  };

  const handleEventLoop = () => {
    return new Promise<void>((resolve) => {
      const eventLoop = setInterval(() => {
        if (game.has_event_loop()) {
          const response = game.progress_event_loop(BigInt(Date.now()));
          response && updateTerminal(response, false);
        } else {
          clearInterval(eventLoop);
          resolve();
        }
      }, game.get_event_loop_interval());
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
      <article className="terminal" ref={terminalRef}>
        {data.map((item) => (
          <p
            key={item.id}
            className={`fade-in ${item.newLine ? "" : "m-0"}`}
            dangerouslySetInnerHTML={{ __html: item.value }}
          ></p>
        ))}
      </article>
      {!game.has_event_loop() && game.is_running() && (
        <Controls
          actions={actions ?? []}
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
