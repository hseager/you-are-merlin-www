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
            className={`button-${i + 1}`}
            onClick={() => sendAction(action.trim())}
            key={action}
          >
            {action}
          </button>
        ))}
      </div>

      <button type="button">
        <i className="mdi mdi-keyboard-outline"></i>
      </button>
    </div>
  );
};
