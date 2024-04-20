import { toButton } from "../utilities";

interface ActionButtons {
  actions: string[];
  sendAction: (action: string) => void;
}

export const ActionButtons = ({ actions, sendAction }: ActionButtons) => {
  return (
    <div>
      <div className="button-list">
        {actions.map((action) => (
          <button
            type="button"
            className={`fake-button`}
            onClick={() => sendAction(action.trim())}
            key={action}
            dangerouslySetInnerHTML={{
              __html: toButton(action),
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};
