import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { get_theme_display_list } from "../pkg";
import { convertColorToBackground, stripTags } from "../utilities";

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
        {themes.map((t) => {
          const themeValue = stripTags(t).trim();
          return (
            <button
              className={`fake-button ${themeValue == theme ? "active" : ""}`}
              onClick={() => {
                setTheme(themeValue);
              }}
              key={t}
              dangerouslySetInnerHTML={{ __html: convertColorToBackground(t) }}
            ></button>
          );
        })}
      </div>
    </div>
  );
};
