import { Dispatch, SetStateAction } from "react";

interface ActionButtons {
  actions: string[];
  setInput: Dispatch<SetStateAction<string>>;
}

export const ActionButtons = ({ actions, setInput }: ActionButtons) => {
  return (
    <div className="action-buttons">
      {actions.map((action) => (
        <button onClick={() => setInput(action.trim())} key={action}>
          {action}
        </button>
      ))}
    </div>
  );
};
