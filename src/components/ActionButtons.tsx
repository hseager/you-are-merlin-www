interface ActionButtons {
  actions: string[];
  sendAction: (action: string) => void;
}

export const ActionButtons = ({ actions, sendAction }: ActionButtons) => {
  return (
    <div className="action-buttons">
      {actions.map((action) => (
        <button
          type="button"
          onClick={() => sendAction(action.trim())}
          key={action}
        >
          {action}
        </button>
      ))}
    </div>
  );
};
