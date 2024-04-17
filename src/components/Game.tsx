import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as wasmPkg from "../pkg/you_are_merlin";
import { Controls } from "./Controls";
import { InputType } from "../types";

interface GameProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  inputType: InputType | undefined;
}

export const Game = ({ theme, setTheme, inputType }: GameProps) => {
  const game = useMemo(() => new wasmPkg.Game(theme), []);
  const terminalRef = useRef<HTMLTextAreaElement>(null);
  const [data, setData] = useState("");
  const [actions, setActions] = useState(game.get_actions());

  useEffect(() => {
    setData(game.get_intro());

    const prompt = game.get_prompt();
    prompt && updateTerminal(prompt);

    if (inputType == InputType.Keyboard) {
      actions && updateTerminal(actions);
    }
  }, []);

  useEffect(() => {
    terminalRef.current && scrollTerminalToBottom(terminalRef.current);
  }, [data]);

  useEffect(() => {
    setActions(game.get_actions());
  }, [game.get_actions()]);

  const updateTerminal = (value: string, newLine?: boolean) => {
    setData((data) => {
      return (data += `${newLine === false ? "\n" : "\n\n"}` + value);
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

  const sendAction = (action: string) => {
    updateTerminal(`> ${action}`, true);

    const response = game.handle_action(action);
    if (response) updateTerminal(response);

    if (game.has_event_loop()) {
      handleEventLoop().then(getPrompt);
    } else {
      getPrompt();
    }
  };

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
        <Controls
          actions={actions ?? ""}
          sendAction={sendAction}
          inputType={inputType}
        />
      )}
      {!game.is_running() && (
        <button onClick={() => setTheme("")}>New Game</button>
      )}
    </>
  );
};
