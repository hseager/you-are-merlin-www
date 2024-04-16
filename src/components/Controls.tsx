import { ChangeEvent, useState } from "react";
import { ActionButtons } from "./ActionButtons";
import IconAccountBox from "~icons/mdi/account-box";

interface ControlProps {
  actions: string;
  sendAction: (value: string) => void;
}

export const Controls = ({ actions, sendAction }: ControlProps) => {
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
      <ReactLogo style={{ fontSize: "3em" }} />
    </form>
  );
};
