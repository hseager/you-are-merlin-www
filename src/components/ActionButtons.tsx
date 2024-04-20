import { convertColorToBackground } from "../utilities";

interface ActionButtons {
  actions: string[];
  sendAction: (action: string) => void;
}

export const ActionButtons = ({ actions, sendAction }: ActionButtons) => {
  return (
    <div>
      <div className="button-list">
        {actions.map((action, i) => (
          <button
            type="button"
            className={`fake-button`}
            onClick={() => sendAction(action.trim())}
            key={action}
            dangerouslySetInnerHTML={{
              __html: convertColorToBackground(action),
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};
