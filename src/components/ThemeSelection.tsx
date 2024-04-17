import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get_theme_display_list } from "../pkg";

interface ThemeSelectionProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeSelection = ({ theme, setTheme }: ThemeSelectionProps) => {
  const [themes, setThemes] = useState<string[]>([]);

  useEffect(() => {
    const themes = get_theme_display_list();
    setThemes(themes.split(","));
  }, []);

  return (
    <div className="theme-selection">
      <h2>Select a theme</h2>
      <div className="button-list">
        {themes.map((t, i) => (
          <button
            className={`button-${i + 1} ${t.trim() == theme ? "active" : ""}`}
            onClick={() => setTheme(t.trim())}
            key={t}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};
