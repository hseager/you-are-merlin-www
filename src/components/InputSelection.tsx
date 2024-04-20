import { Dispatch, SetStateAction } from "react";
import { InputType } from "../types";

interface InputSelectionProps {
  inputType: InputType | undefined;
  setInputType: Dispatch<SetStateAction<InputType | undefined>>;
}

<button type="button"></button>;

export const InputSelection = ({
  inputType,
  setInputType,
}: InputSelectionProps) => {
  return (
    <div className="theme-selection">
      <h2>Select input type</h2>
      <div className="button-list">
        <button
          className={`button ${inputType == InputType.Buttons ? "active" : ""}`}
          onClick={() => setInputType(InputType.Buttons)}
          style={{ background: "var(--theme-blue)" }}
        >
          Buttons
        </button>
        <button
          className={`button ${
            inputType == InputType.Keyboard ? "active" : ""
          }`}
          onClick={() => setInputType(InputType.Keyboard)}
          style={{ background: "var(--theme-green)" }}
        >
          Keyboard
        </button>
      </div>
    </div>
  );
};
