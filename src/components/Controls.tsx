import { ChangeEvent, useState } from "react";
import { ActionButtons } from "./ActionButtons";
import { InputType } from "../types";

interface ControlProps {
  actions: string;
  sendAction: (value: string) => void;
  inputType: InputType | undefined;
}

export const Controls = ({ actions, sendAction, inputType }: ControlProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const input = formData.get("input");
    const action = input ? input?.toString().trim() : "";

    sendAction(action);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {inputType == InputType.Buttons && (
        <ActionButtons
          actions={actions ? actions.split(",") : []}
          sendAction={sendAction}
        />
      )}
      {inputType == InputType.Keyboard && (
        <fieldset>
          <input
            className="input"
            name="input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button className="button">Send</button>
        </fieldset>
      )}
    </form>
  );
};
