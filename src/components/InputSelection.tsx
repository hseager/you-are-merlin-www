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
          className={`button-1 ${
            inputType == InputType.Buttons ? "active" : ""
          }`}
          onClick={() => setInputType(InputType.Buttons)}
        >
          Buttons
        </button>
        <button
          className={`button-2 ${
            inputType == InputType.Keyboard ? "active" : ""
          }`}
          onClick={() => setInputType(InputType.Keyboard)}
        >
          Keyboard
        </button>
      </div>
    </div>
  );
};
