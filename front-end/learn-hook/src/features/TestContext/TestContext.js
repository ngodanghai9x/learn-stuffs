import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import useMyTheme from "../../hooks/useMyTheme";


export default function TestContext() {
  const context = useContext(AppContext);
  const { theme, changeTheme } = context;
  const text = useMyTheme(theme);

  console.log("🚀 TestContext", { context, text })
  return (
    <div className="TestContext">
      <h2>Theme: {theme}</h2>
      <button onClick={() => changeTheme('dark')}> Change theme dark</button>
      <button onClick={() => changeTheme('light')}> Change theme light</button>
      <button onClick={() => changeTheme(null)}> Reset theme</button>
    </div>
  );
}